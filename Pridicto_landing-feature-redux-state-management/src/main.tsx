import React from 'react';
import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';
import App from './App';

// Initialize theme before React renders
const initializeTheme = () => {
  const savedTheme = localStorage.getItem('predicto_theme');
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  const theme = savedTheme === 'system' || !savedTheme ? systemTheme : savedTheme;
  
  const root = document.documentElement;
  root.classList.remove('light', 'dark');
  root.classList.add(theme);
};

// Performance monitoring setup
const initializePerformanceMonitoring = () => {
  if (typeof window !== 'undefined' && 'performance' in window) {
    // Mark when React starts rendering
    performance.mark('react-render-start');
    
    // Listen for when React finishes rendering
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (entry.name === 'react-render-end') {
          const renderTime = entry.startTime;
          console.log(`🚀 React render completed in ${renderTime.toFixed(2)}ms`);
          
          // Report to analytics if needed
          if (renderTime > 100) {
            console.warn('⚠️ Slow React render detected:', renderTime, 'ms');
          }
        }
      });
    });
    
    observer.observe({ entryTypes: ['measure'] });
  }
};

// Error reporting setup
const initializeErrorReporting = () => {
  if (typeof window !== 'undefined') {
    // Global error handler
    window.addEventListener('error', (event) => {
      console.error('🚨 Global error:', event.error);
      
      // Send to error reporting service in production
      if (process.env.NODE_ENV === 'production') {
        // Example: Sentry, LogRocket, etc.
        // reportError(event.error);
      }
    });
    
    // Unhandled promise rejection handler
    window.addEventListener('unhandledrejection', (event) => {
      console.error('🚨 Unhandled promise rejection:', event.reason);
      
      // Prevent the default browser error handling
      event.preventDefault();
      
      // Send to error reporting service in production
      if (process.env.NODE_ENV === 'production') {
        // Example: Sentry, LogRocket, etc.
        // reportError(event.reason);
      }
    });
  }
};

// Service worker registration (for PWA capabilities)
const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('✅ Service Worker registered:', registration);
      
      // Listen for updates
      registration.addEventListener('updatefound', () => {
        console.log('🆕 Service Worker update found');
      });
    } catch (error) {
      console.warn('⚠️ Service Worker registration failed:', error);
    }
  }
};

// Analytics initialization
const initializeAnalytics = () => {
  if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined') {
    // Initialize analytics (Google Analytics, Mixpanel, etc.)
    // Example: gtag('config', 'GA_MEASUREMENT_ID');
    
    // Track page view
    window.addEventListener('load', () => {
      // gtag('event', 'page_view', {
      //   page_title: document.title,
      //   page_location: window.location.href,
      // });
    });
  }
};

// Development helpers
const initializeDevelopmentHelpers = () => {
  if (process.env.NODE_ENV === 'development') {
    // Add development-only globals
    (window as any).__APP_STATE__ = {
      version: process.env.npm_package_version || '1.0.0',
      buildTime: new Date().toISOString(),
      environment: 'development',
    };
    
    // Enable React DevTools
    if (typeof window !== 'undefined') {
      (window as any).__REACT_DEVTOOLS_GLOBAL_HOOK__ = (window as any).__REACT_DEVTOOLS_GLOBAL_HOOK__ || {};
    }
  }
};

// Main app initialization
const initializeApp = async () => {
  console.log('🚀 Initializing Predicto.ai...');
  
  // Initialize core features
  initializeTheme();
  initializeErrorReporting();
  initializeDevelopmentHelpers();
  
  // Initialize optional features
  await registerServiceWorker();
  initializeAnalytics();
  initializePerformanceMonitoring();
  
  console.log('✅ Predicto.ai initialized successfully');
};

// Render the React app
const renderApp = () => {
  const rootElement = document.getElementById('root');
  
  if (!rootElement) {
    throw new Error('Failed to find the root element');
  }
  
  const root = ReactDOM.createRoot(rootElement);
  
  // Mark when React starts rendering
  if (typeof window !== 'undefined' && 'performance' in window) {
    performance.mark('react-render-start');
  }
  
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
  
  // Mark when React finishes rendering
  if (typeof window !== 'undefined' && 'performance' in window) {
    performance.mark('react-render-end');
    performance.measure('react-render', 'react-render-start', 'react-render-end');
  }
};

// Initialize and render
initializeApp()
  .then(renderApp)
  .catch((error) => {
    console.error('❌ Failed to initialize app:', error);
    
    // Fallback render in case of initialization failure
    const rootElement = document.getElementById('root');
    if (rootElement) {
      rootElement.innerHTML = `
        <div style="
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          background: #f9fafb;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        ">
          <div style="text-align: center; color: #374151;">
            <h1 style="font-size: 24px; margin-bottom: 16px;">Something went wrong</h1>
            <p style="margin-bottom: 24px;">Failed to load the application. Please refresh the page.</p>
            <button 
              onclick="window.location.reload()" 
              style="
                background: #4f46e5;
                color: white;
                border: none;
                padding: 12px 24px;
                border-radius: 8px;
                font-size: 14px;
                cursor: pointer;
              "
            >
              Refresh Page
            </button>
          </div>
        </div>
      `;
    }
  });

// Hot module replacement for development
if (import.meta.hot) {
  (import.meta as any).hot.accept();
}