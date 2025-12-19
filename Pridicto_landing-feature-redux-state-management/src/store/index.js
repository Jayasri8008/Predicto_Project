import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from '@reduxjs/toolkit';

// Import slices
import authReducer from './slices/authSlice';
import uiReducer from './slices/uiSlice';
import contentReducer from './slices/contentSlice';
import analyticsReducer from './slices/analyticsSlice';
import dashboardReducer from './slices/dashboardSlice';
import featuresReducer from './slices/featuresSlice';
import suggestionReducer from './slices/suggestionSlice';

// Persist configuration
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'ui'], // Only persist auth and ui state
  version: 1, // Increment version to force migration
  migrate: (state) => {
    // Migration logic: ensure toasts is an array and ui state exists
    if (state) {
      if (!state.ui) {
        state.ui = {
          theme: 'light',
          sidebarOpen: false,
          toasts: [],
          loading: { global: false, components: {} },
          modals: { isOpen: false, type: null, data: undefined },
        };
      } else {
        // Ensure toasts array exists
        if (!state.ui.toasts) {
          state.ui.toasts = [];
        }
        // Remove old toast property if it exists
        if (state.ui.toast) {
          delete state.ui.toast;
        }
        // Ensure other required properties exist
        if (!state.ui.loading) {
          state.ui.loading = { global: false, components: {} };
        }
        if (!state.ui.modals) {
          state.ui.modals = { isOpen: false, type: null, data: undefined };
        }
      }
    }
    return Promise.resolve(state);
  },
};

// Combine reducers
const rootReducer = combineReducers({
  auth: authReducer,
  ui: uiReducer,
  content: contentReducer,
  analytics: analyticsReducer,
  dashboard: dashboardReducer,
  features: featuresReducer,
  suggestions: suggestionReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);
// Type exports for TypeScript (if using TS)
export const RootState = store.getState;
export const AppDispatch = store.dispatch;
