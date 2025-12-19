import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { UIState, ToastMessage } from '../../types';

// Initial state with better defaults
const initialState: UIState = {
  theme: (localStorage.getItem('predicto_theme') as UIState['theme']) || 'system',
  sidebarOpen: false,
  toasts: [],
  loading: {
    global: false,
    components: {},
  },
  modals: {
    isOpen: false,
    type: null,
    data: undefined,
  },
};

// Create UI slice
const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    // Theme management
    setTheme: (state, action: PayloadAction<UIState['theme']>) => {
      state.theme = action.payload;
      // Persist theme preference
      localStorage.setItem('predicto_theme', action.payload);
      
      // Apply theme to document
      const root = window.document.documentElement;
      root.classList.remove('light', 'dark');
      
      if (action.payload === 'system') {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        root.classList.add(systemTheme);
      } else {
        root.classList.add(action.payload);
      }
    },

    toggleTheme: (state) => {
      const themeCycle: UIState['theme'][] = ['light', 'dark', 'system'];
      const currentIndex = themeCycle.indexOf(state.theme);
      const nextIndex = (currentIndex + 1) % themeCycle.length;
      
      state.theme = themeCycle[nextIndex];
      localStorage.setItem('predicto_theme', state.theme);
      
      // Apply theme to document
      const root = window.document.documentElement;
      root.classList.remove('light', 'dark');
      
      if (state.theme === 'system') {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        root.classList.add(systemTheme);
      } else {
        root.classList.add(state.theme);
      }
    },

    // Sidebar management
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },

    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },

    closeSidebar: (state) => {
      state.sidebarOpen = false;
    },

    // Toast notifications
    showToast: (state, action: PayloadAction<Omit<ToastMessage, 'id' | 'timestamp'>>) => {
      const toast: ToastMessage = {
        ...action.payload,
        id: `toast_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        timestamp: Date.now(),
      };
      
      state.toasts.push(toast);
    },

    removeToast: (state, action: PayloadAction<string>) => {
      state.toasts = state.toasts.filter(toast => toast.id !== action.payload);
    },

    clearAllToasts: (state) => {
      state.toasts = [];
    },

    // Loading states
    setGlobalLoading: (state, action: PayloadAction<boolean>) => {
      state.loading.global = action.payload;
    },

    setComponentLoading: (state, action: PayloadAction<{ componentId: string; loading: boolean }>) => {
      const { componentId, loading } = action.payload;
      if (loading) {
        state.loading.components[componentId] = true;
      } else {
        delete state.loading.components[componentId];
      }
    },

    clearAllLoading: (state) => {
      state.loading.global = false;
      state.loading.components = {};
    },

    // Modal management
    openModal: (state, action: PayloadAction<{ type: string; data?: any }>) => {
      state.modals.isOpen = true;
      state.modals.type = action.payload.type;
      state.modals.data = action.payload.data;
    },

    closeModal: (state) => {
      state.modals.isOpen = false;
      state.modals.type = null;
      state.modals.data = undefined;
    },

    updateModalData: (state, action: PayloadAction<any>) => {
      state.modals.data = action.payload;
    },

    // Utility actions
    resetUIState: (state) => {
      // Reset to initial state but preserve theme
      const currentTheme = state.theme;
      Object.assign(state, initialState);
      state.theme = currentTheme;
    },

    // Responsive utilities
    setMobileView: (state, action: PayloadAction<boolean>) => {
      // Could be used for mobile-specific UI adjustments
      // Currently handled via CSS media queries
    },

    // Breadcrumb management (if used in UI state)
    setBreadcrumbs: (state, action: PayloadAction<Array<{ label: string; path?: string }>>) => {
      state.breadcrumbs = action.payload;
    },

    // Page transition management
    setPageTransition: (state, action: PayloadAction<{ from: string; to: string; type: string }>) => {
      state.pageTransition = action.payload;
    },
  },
});

// Export actions
export const {
  setTheme,
  toggleTheme,
  setSidebarOpen,
  toggleSidebar,
  closeSidebar,
  showToast,
  removeToast,
  clearAllToasts,
  setGlobalLoading,
  setComponentLoading,
  clearAllLoading,
  openModal,
  closeModal,
  updateModalData,
  resetUIState,
  setMobileView,
  setBreadcrumbs,
  setPageTransition,
} = uiSlice.actions;

// Export reducer
export default uiSlice.reducer;

// Selectors
export const selectTheme = (state: { ui: UIState }) => state.ui.theme;
export const selectSidebarOpen = (state: { ui: UIState }) => state.ui.sidebarOpen;
export const selectToasts = (state: { ui: UIState }) => state.ui.toasts;
export const selectGlobalLoading = (state: { ui: UIState }) => state.ui.loading.global;
export const selectComponentLoading = (componentId: string) => (state: { ui: UIState }) => 
  state.ui.loading.components[componentId] || false;
export const selectModalState = (state: { ui: UIState }) => state.ui.modals;

// Toast utility functions
export const createSuccessToast = (title: string, message?: string) =>
  showToast({ type: 'success', title, message });

export const createErrorToast = (title: string, message?: string) =>
  showToast({ type: 'error', title, message });

export const createWarningToast = (title: string, message?: string) =>
  showToast({ type: 'warning', title, message });

export const createInfoToast = (title: string, message?: string) =>
  showToast({ type: 'info', title, message });

// Theme utilities
export const applySystemTheme = () => {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const root = document.documentElement;
  
  const applyTheme = (theme: 'dark' | 'light') => {
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  };

  // Apply immediately
  applyTheme(mediaQuery.matches ? 'dark' : 'light');

  // Listen for changes
  mediaQuery.addEventListener('change', (e) => {
    const currentTheme = localStorage.getItem('predicto_theme');
    if (currentTheme === 'system') {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });
};

// Initialize theme on module load
if (typeof window !== 'undefined') {
  applySystemTheme();
}