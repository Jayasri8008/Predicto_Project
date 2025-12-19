import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  theme: 'light',
  sidebarOpen: false,
  modal: {
    isOpen: false,
    type: null,
    data: null,
  },
  notifications: [],
  loadingStates: {
    global: false,
    auth: false,
    content: false,
  },
  search: {
    query: '',
    filters: {},
    results: [],
  },
  breadcrumbs: [],
  toasts: [],
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', state.theme);
      document.documentElement.classList.toggle('dark', state.theme === 'dark');
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
      localStorage.setItem('theme', state.theme);
      document.documentElement.classList.toggle('dark', state.theme === 'dark');
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action) => {
      state.sidebarOpen = action.payload;
    },
    openModal: (state, action) => {
      state.modal = {
        isOpen: true,
        type: action.payload.type,
        data: action.payload.data || null,
      };
    },
    closeModal: (state) => {
      state.modal = {
        isOpen: false,
        type: null,
        data: null,
      };
    },
    addNotification: (state, action) => {
      state.notifications.push({
        id: Date.now(),
        ...action.payload,
        timestamp: new Date().toISOString(),
      });
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload
      );
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
    setLoadingState: (state, action) => {
      const { key, loading } = action.payload;
      state.loadingStates[key] = loading;
    },
    setGlobalLoading: (state, action) => {
      state.loadingStates.global = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.search.query = action.payload;
    },
    setSearchFilters: (state, action) => {
      state.search.filters = { ...state.search.filters, ...action.payload };
    },
    setSearchResults: (state, action) => {
      state.search.results = action.payload;
    },
    clearSearch: (state) => {
      state.search = {
        query: '',
        filters: {},
        results: [],
      };
    },
    setBreadcrumbs: (state, action) => {
      state.breadcrumbs = action.payload;
    },
    addBreadcrumb: (state, action) => {
      state.breadcrumbs.push(action.payload);
    },
    removeBreadcrumb: (state) => {
      state.breadcrumbs.pop();
    },
    showToast: (state, action) => {
      const toast = {
        id: `toast_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        title: action.payload.title || '',
        message: action.payload.message || '',
        type: action.payload.type || 'info',
        timestamp: Date.now(),
      };
      state.toasts.push(toast);
    },
    hideToast: (state) => {
      // Hide the first toast (for backward compatibility)
      if (state.toasts.length > 0) {
        state.toasts.shift();
      }
    },
    removeToast: (state, action) => {
      state.toasts = state.toasts.filter(toast => toast.id !== action.payload);
    },
  },
});

export const {
  toggleTheme,
  setTheme,
  toggleSidebar,
  setSidebarOpen,
  openModal,
  closeModal,
  addNotification,
  removeNotification,
  clearNotifications,
  setLoadingState,
  setGlobalLoading,
  setSearchQuery,
  setSearchFilters,
  setSearchResults,
  clearSearch,
  setBreadcrumbs,
  addBreadcrumb,
  removeBreadcrumb,
  showToast,
  hideToast,
  removeToast,
} = uiSlice.actions;

// Toast action creators
export const createSuccessToast = (title, message) => showToast({ message: `${title}: ${message}`, type: 'success' });
export const createErrorToast = (title, message) => showToast({ message: `${title}: ${message}`, type: 'error' });
export const createWarningToast = (title, message) => showToast({ message: `${title}: ${message}`, type: 'warning' });
export const createInfoToast = (title, message) => showToast({ message: `${title}: ${message}`, type: 'info' });

export default uiSlice.reducer;
