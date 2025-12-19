// src/services/websocket.js
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

let stompClient = null;
let userId = null;

export const connectWebSocket = (userIdParam, onMetricsUpdate, onProjectsUpdate, onActivityUpdate, onTeamUpdate, onNotificationsUpdate) => {
  userId = userIdParam;
  const socket = new SockJS('http://localhost:8080/ws/dashboard');
  stompClient = Stomp.over(socket);

  stompClient.connect({}, () => {
    console.log('WebSocket connected');

    // Subscribe to user-specific topics
    if (onMetricsUpdate) {
      stompClient.subscribe(`/topic/metrics/${userId}`, (msg) => {
        onMetricsUpdate(JSON.parse(msg.body));
      });
    }

    if (onProjectsUpdate) {
      stompClient.subscribe(`/topic/projects/${userId}`, (msg) => {
        onProjectsUpdate(JSON.parse(msg.body));
      });
    }

    if (onActivityUpdate) {
      stompClient.subscribe(`/topic/activity/${userId}`, (msg) => {
        onActivityUpdate(JSON.parse(msg.body));
      });
    }

    if (onTeamUpdate) {
      stompClient.subscribe(`/topic/team/${userId}`, (msg) => {
        onTeamUpdate(JSON.parse(msg.body));
      });
    }

    if (onNotificationsUpdate) {
      stompClient.subscribe(`/topic/notifications/${userId}`, (msg) => {
        onNotificationsUpdate(JSON.parse(msg.body));
      });
    }
  }, (err) => {
    console.error('WebSocket connection error:', err);
  });
};

export const disconnectWebSocket = () => {
  if (stompClient && stompClient.connected) {
    stompClient.disconnect(() => {
      console.log('WebSocket disconnected');
    });
  }
};

export const isWebSocketConnected = () => {
  return stompClient && stompClient.connected;
};

export default {
  connectWebSocket,
  disconnectWebSocket,
  isWebSocketConnected,
};
