import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

// Import API and slices
import { api } from '../services/api';
import authSlice from './slices/authSlice';
import uiSlice from './slices/uiSlice';
import suggestionsSlice from './slices/suggestionsSlice';
import contentSlice from './slices/contentSlice';

// Configure store with modern patterns
export const store = configureStore({
  reducer: {
    // RTK Query API
    [api.reducerPath]: api.reducer,
    
    // Traditional slices for client-side state
    auth: authSlice,
    ui: uiSlice,
    suggestions: suggestionsSlice,
    content: contentSlice,
  },
  
  // Middleware configuration
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: [
          'persist/PERSIST',
          'persist/REHYDRATE',
          'persist/REGISTER',
          'persist/PAUSE',
          'persist/PURGE',
          'persist/FLUSH',
        ],
        // Ignore these paths in the state
        ignoredPaths: ['api.middleware', 'auth.token', 'ui.modals'],
      },
    }).concat(api.middleware),
  
  // Development tools configuration
  devTools: process.env.NODE_ENV !== 'production' ? {
    name: 'Predicto.ai Store',
    maxAge: 50,
  } : false,
  
  // Preloaded state (for SSR hydration)
  preloadedState: undefined,
});

// Setup listeners for automatic refetching
setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Export the store as the default export
export default store;

// Export individual selectors for better performance
export const selectAuth = (state: RootState) => state.auth;
export const selectUI = (state: RootState) => state.ui;
export const selectSuggestions = (state: RootState) => state.suggestions;
export const selectContent = (state: RootState) => state.content;

// Memoized selectors for complex state
export const selectIsAuthenticated = (state: RootState) => 
  selectAuth(state).isAuthenticated && !!selectAuth(state).token;

export const selectCurrentUser = (state: RootState) => selectAuth(state).user;

export const selectTheme = (state: RootState) => selectUI(state).theme;

export const selectToasts = (state: RootState) => selectUI(state).toasts;

export const selectGlobalLoading = (state: RootState) => 
  selectUI(state).loading.global || selectAuth(state).loading;