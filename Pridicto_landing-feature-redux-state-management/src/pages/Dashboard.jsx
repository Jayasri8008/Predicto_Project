import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

import {
  connectWebSocket,
  disconnectWebSocket,
  isWebSocketConnected,
} from "../services/websocket";

export default function Dashboard() {
  // ================= STATE =================
  const [dark, setDark] = useState(false);
  const [estimate, setEstimate] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [realtimeMetrics, setRealtimeMetrics] = useState([]);
  const [activityFeed, setActivityFeed] = useState([]);
  const [notifications, setNotifications] = useState([]);

  // ================= REDUX + ROUTER =================
  const { user } = useSelector((state) => state.auth);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // ================= GOOGLE OAUTH TOKEN =================
  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      localStorage.setItem("predicto_token", token);
      navigate("/dashboard", { replace: true });
    }
  }, [searchParams, navigate]);

  // ================= DASHBOARD INIT =================
  useEffect(() => {
    const savedTheme = localStorage.getItem("predicto_theme");
    if (savedTheme) setDark(savedTheme === "dark");

    setEstimate({
      cost: 50000,
      time: 12,
      resources: 5,
    });

    if (user?.id) {
      connectWebSocket(
        user.id,
        (metrics) =>
          setRealtimeMetrics((prev) => [...prev.slice(-9), metrics]),
        () => {},
        (activity) =>
          setActivityFeed((prev) => [activity, ...prev.slice(0, 9)]),
        () => {},
        (notification) =>
          setNotifications((prev) => [notification, ...prev.slice(0, 4)])
      );
    }

    const checkConnection = () => {
      setIsConnected(isWebSocketConnected());
    };

    checkConnection();
    const interval = setInterval(checkConnection, 5000);

    return () => {
      disconnectWebSocket();
      clearInterval(interval);
    };
  }, [user?.id]);

  // ================= UI =================
  return (
    <Layout>
      <div className="min-h-screen p-8">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>

        {isConnected ? (
          <p className="text-green-600">Realtime Connected</p>
        ) : (
          <p className="text-red-600">Connection Lost</p>
        )}

        {estimate && (
          <div className="mt-6 space-y-2">
            <p>💰 Cost: ${estimate.cost}</p>
            <p>⏱ Time: {estimate.time} weeks</p>
            <p>👥 Resources: {estimate.resources}</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
