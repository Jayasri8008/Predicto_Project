import React, { Component } from 'react';
import { AlertTriangle, RefreshCw, Home, Bug } from 'lucide-react';

// Error Boundary Props
// ErrorBoundaryProps = {
//   children: ReactNode,
//   fallback?: ReactNode,
//   onError?: (error, errorInfo) => void,
//   showDetails?: boolean,
//   resetOnPropsChange?: boolean,
// };

// Error Boundary State
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      eventId: null,
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return {
      hasError: true,
      error,
      eventId: Math.random().toString(36).substr(2, 9),
    };
  }

  componentDidCatch(error, errorInfo) {
    // Update state with error details
    this.setState({
      error,
      errorInfo,
    });

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.group('🚨 Error Boundary Caught an Error');
      console.error('Error:', error);
      console.error('Error Info:', errorInfo);
      console.groupEnd();
    }

    // Report error to external service (if configured)
    this.reportError(error, errorInfo);
  }

  componentDidUpdate(prevProps) {
    // Reset error boundary when props change (if enabled)
    if (this.props.resetOnPropsChange && prevProps.children !== this.props.children) {
      this.resetErrorBoundary();
    }
  }

  // Reset the error boundary
  resetErrorBoundary = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      eventId: null,
    });
  };

  // Go to home page
  goHome = () => {
    window.location.href = '/';
  };

  // Report error to external service
  reportError = (error, errorInfo) => {
    // This is where you would send errors to services like Sentry, LogRocket, etc.
    if (typeof window !== 'undefined') {
      try {
        const errorReport = {
          message: error.message,
          stack: error.stack,
          componentStack: errorInfo.componentStack,
          eventId: this.state.eventId,
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
          url: window.location.href,
        };

        // Store in localStorage for debugging
        localStorage.setItem(`error_${Date.now()}`, JSON.stringify(errorReport));
      } catch (reportingError) {
        console.error('Failed to report error:', reportingError);
      }
    }
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Development vs Production error handling
      if (process.env.NODE_ENV === 'development') {
        return (
          <DevErrorDetails
            error={this.state.error}
            errorInfo={this.state.errorInfo}
            onReset={this.resetErrorBoundary}
          />
        );
      }

      // Production error fallback
      return (
        <DefaultErrorFallback
          error={this.state.error}
          errorInfo={this.state.errorInfo}
          onRetry={this.resetErrorBoundary}
          onGoHome={this.goHome}
          showDetails={this.props.showDetails || false}
        />
      );
    }

    return this.props.children;
  }
}

// Default Error Fallback Component
const DefaultErrorFallback = ({ 
  error, 
  errorInfo, 
  onRetry, 
  onGoHome, 
  showDetails 
}) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
        {/* Error Icon */}
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 dark:bg-red-900/20 mb-6">
          <AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-400" />
        </div>

        {/* Error Message */}
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Oops! Something went wrong
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          We encountered an unexpected error. Don't worry, your data is safe.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
          <button
            onClick={onRetry}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </button>
          <button
            onClick={onGoHome}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Home className="w-4 h-4 mr-2" />
            Go Home
          </button>
        </div>

        {/* Error Details (collapsible) */}
        {showDetails && (
          <details className="text-left">
            <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 mb-3">
              Error Details
            </summary>
            <div className="bg-gray-100 dark:bg-gray-700 rounded p-3 text-xs font-mono text-gray-800 dark:text-gray-200 overflow-auto">
              <div className="mb-2">
                <strong>Error:</strong> {error.message}
              </div>
              {error.stack && (
                <div className="mb-2">
                  <strong>Stack Trace:</strong>
                  <pre className="whitespace-pre-wrap mt-1">{error.stack}</pre>
                </div>
              )}
              {errorInfo && errorInfo.componentStack && (
                <div>
                  <strong>Component Stack:</strong>
                  <pre className="whitespace-pre-wrap mt-1">{errorInfo.componentStack}</pre>
                </div>
              )}
            </div>
          </details>
        )}

        {/* Report Issue Link */}
        <div className="text-xs text-gray-500 dark:text-gray-400">
          <span>If this problem persists, please </span>
          <a
            href={`mailto:support@predicto.ai?subject=Error Report&body=Error: ${error.message}%0AEvent ID: ${Math.random().toString(36).substr(2, 9)}`}
            className="text-indigo-600 hover:text-indigo-500 underline"
          >
            contact support
          </a>
          <span> with the error details.</span>
        </div>
      </div>
    </div>
  );
};

// Development Error Details Component
const DevErrorDetails = ({ error, errorInfo, onReset }) => {
  return (
    <div className="min-h-screen bg-red-50 dark:bg-red-900/10 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-red-600 text-white p-4">
            <div className="flex items-center gap-3">
              <Bug className="w-6 h-6" />
              <h1 className="text-xl font-bold">Development Error</h1>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Error Information */}
              <div>
                <h2 className="text-lg font-semibold mb-3">Error Information</h2>
                <div className="space-y-3">
                  <div>
                    <strong className="text-sm text-gray-600 dark:text-gray-400">Message:</strong>
                    <p className="text-red-600 dark:text-red-400 font-mono text-sm">{error.message}</p>
                  </div>
                  
                  {error.name && (
                    <div>
                      <strong className="text-sm text-gray-600 dark:text-gray-400">Name:</strong>
                      <p className="font-mono text-sm">{error.name}</p>
                    </div>
                  )}
                  
                  {error.stack && (
                    <div>
                      <strong className="text-sm text-gray-600 dark:text-gray-400">Stack Trace:</strong>
                      <pre className="bg-gray-100 dark:bg-gray-700 p-3 rounded text-xs font-mono overflow-auto max-h-48">
                        {error.stack}
                      </pre>
                    </div>
                  )}
                </div>
              </div>

              {/* Component Stack */}
              {errorInfo && errorInfo.componentStack && (
                <div>
                  <h2 className="text-lg font-semibold mb-3">Component Stack</h2>
                  <pre className="bg-gray-100 dark:bg-gray-700 p-3 rounded text-xs font-mono overflow-auto max-h-64">
                    {errorInfo.componentStack}
                  </pre>
                </div>
              )}
            </div>

            {/* Reset Button */}
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600">
              <button
                onClick={onReset}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Reset Error Boundary
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// HOC for easy error boundary wrapping
const withErrorBoundary = (Component, errorBoundaryProps = {}) => {
  const WrappedComponent = (props) => (
    <ErrorBoundary {...errorBoundaryProps}>
      <Component {...props} />
    </ErrorBoundary>
  );

  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;

  return WrappedComponent;
};

// Functional component version
const ErrorBoundaryWrapper = (props) => (
  <ErrorBoundary {...props} />
);

export { withErrorBoundary, ErrorBoundaryWrapper };
export default ErrorBoundary;
