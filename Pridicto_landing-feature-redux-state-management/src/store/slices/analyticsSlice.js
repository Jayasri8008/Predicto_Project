import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunks for analytics
export const trackEvent = createAsyncThunk(
  'analytics/trackEvent',
  async (eventData, { rejectWithValue }) => {
    try {
      // Send to backend analytics endpoint
      const response = await fetch('/api/analytics/track', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...eventData,
          timestamp: new Date().toISOString(),
          sessionId: localStorage.getItem('sessionId') || generateSessionId(),
        }),
      });

      if (!response.ok) throw new Error('Failed to track event');
      return await response.json();
    } catch (error) {
      // Fallback: store locally if backend fails
      storeEventLocally(eventData);
      return rejectWithValue(error.message);
    }
  }
);

export const fetchAnalytics = createAsyncThunk(
  'analytics/fetchAnalytics',
  async (params = {}, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('authToken');
      const queryString = new URLSearchParams(params).toString();
      const response = await fetch(`/api/analytics/dashboard?${queryString}`, {
        headers: {
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
      });
      if (!response.ok) throw new Error('Failed to fetch analytics');
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Helper functions
const generateSessionId = () => {
  const sessionId = Math.random().toString(36).substring(2) + Date.now().toString(36);
  localStorage.setItem('sessionId', sessionId);
  return sessionId;
};

const storeEventLocally = (eventData) => {
  const events = JSON.parse(localStorage.getItem('pendingEvents') || '[]');
  events.push({
    ...eventData,
    timestamp: new Date().toISOString(),
    sessionId: localStorage.getItem('sessionId') || generateSessionId(),
  });
  localStorage.setItem('pendingEvents', JSON.stringify(events));
};

const initialState = {
  events: [],
  dashboard: {
    pageViews: 0,
    uniqueVisitors: 0,
    bounceRate: 0,
    avgSessionDuration: 0,
    topPages: [],
    userFlow: [],
    conversionRate: 0,
  },
  userBehavior: {
    currentPage: window.location.pathname,
    timeOnPage: 0,
    scrollDepth: 0,
    interactions: [],
  },
  loading: false,
  error: null,
  sessionId: localStorage.getItem('sessionId') || generateSessionId(),
};

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {
    startPageView: (state, action) => {
      state.userBehavior.currentPage = action.payload;
      state.userBehavior.timeOnPage = 0;
      state.userBehavior.scrollDepth = 0;
      state.userBehavior.interactions = [];
    },
    updateTimeOnPage: (state) => {
      state.userBehavior.timeOnPage += 1;
    },
    updateScrollDepth: (state, action) => {
      state.userBehavior.scrollDepth = Math.max(state.userBehavior.scrollDepth, action.payload);
    },
    trackInteraction: (state, action) => {
      state.userBehavior.interactions.push({
        type: action.payload.type,
        element: action.payload.element,
        timestamp: new Date().toISOString(),
      });
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(trackEvent.pending, (state) => {
        state.loading = true;
      })
      .addCase(trackEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.events.push(action.payload);
      })
      .addCase(trackEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAnalytics.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAnalytics.fulfilled, (state, action) => {
        state.loading = false;
        state.dashboard = { ...state.dashboard, ...action.payload };
      })
      .addCase(fetchAnalytics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  startPageView,
  updateTimeOnPage,
  updateScrollDepth,
  trackInteraction,
  setUserId,
  clearError,
} = analyticsSlice.actions;

export default analyticsSlice.reducer;
