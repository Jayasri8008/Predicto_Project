import React, { useEffect, useState } from 'react';
import { X, CheckCircle, XCircle, AlertTriangle, Info } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { removeToast, showToast } from '../store/slices/uiSlice';

// Toast configuration
const toastConfig = {
  success: {
    icon: CheckCircle,
    className: 'bg-green-50 border-green-200 text-green-800',
    iconColor: 'text-green-500',
    closeColor: 'text-green-400 hover:text-green-600',
  },
  error: {
    icon: XCircle,
    className: 'bg-red-50 border-red-200 text-red-800',
    iconColor: 'text-red-500',
    closeColor: 'text-red-400 hover:text-red-600',
  },
  warning: {
    icon: AlertTriangle,
    className: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    iconColor: 'text-yellow-500',
    closeColor: 'text-yellow-400 hover:text-yellow-600',
  },
  info: {
    icon: Info,
    className: 'bg-blue-50 border-blue-200 text-blue-800',
    iconColor: 'text-blue-500',
    closeColor: 'text-blue-400 hover:text-blue-600',
  },
};

// Individual Toast Component
const ToastItem = ({ toast, onRemove }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isLeaving, setIsLeaving] = useState(false);

  const config = toastConfig[toast.type];
  const IconComponent = config.icon;

  // Auto-remove toast after duration
  useEffect(() => {
    const duration = toast.duration || 5000;
    const timer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [toast.duration]);

  // Handle manual close
  const handleClose = () => {
    setIsLeaving(true);
    setTimeout(() => {
      setIsVisible(false);
      onRemove(toast.id);
    }, 300); // Match animation duration
  };

  // Pause auto-remove on hover
  const handleMouseEnter = () => {
    // Could implement pause functionality here
  };

  if (!isVisible) return null;

  return (
    <div
      className={`
        flex items-start p-4 border rounded-lg shadow-lg max-w-sm w-full
        ${config.className}
        transition-all duration-300 ease-in-out
        ${isLeaving ? 'opacity-0 transform translate-x-full' : 'opacity-100 translate-x-0'}
      `}
      onMouseEnter={handleMouseEnter}
    >
      {/* Icon */}
      <div className="flex-shrink-0 mr-3">
        <IconComponent className={`w-5 h-5 ${config.iconColor}`} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-sm">
          {toast.title}
        </h4>
        {toast.message && (
          <p className="mt-1 text-sm opacity-90">
            {toast.message}
          </p>
        )}
        <p className="mt-1 text-xs opacity-60">
          {new Date(toast.timestamp).toLocaleTimeString()}
        </p>
      </div>

      {/* Close Button */}
      <button
        onClick={handleClose}
        className={`flex-shrink-0 ml-3 p-1 rounded-full hover:bg-black/5 ${config.closeColor}`}
        aria-label="Close notification"
      >
        <X className="w-4 h-4" />
      </button>

      {/* Progress Bar */}
      <div
        className="absolute bottom-0 left-0 h-1 bg-current opacity-30 rounded-b-lg"
        style={{
          width: '100%',
          animation: `shrink ${toast.duration || 5000}ms linear forwards`,
        }}
      />
      
      {/* CSS for animation */}
      <style jsx>{`
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
};

// Toast Container Component
const ToastContainer = ({
  position = 'top-right',
  maxToasts = 5,
}) => {
  const dispatch = useDispatch();
  const toasts = useSelector((state) => state.ui?.toasts || []);

  const handleRemoveToast = (id) => {
    dispatch(removeToast(id));
  };

  // Position classes
  const positionClasses = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-center': 'top-4 left-1/2 transform -translate-x-1/2',
    'bottom-center': 'bottom-4 left-1/2 transform -translate-x-1/2',
  };

  // Limit number of toasts
  const displayToasts = toasts.slice(-maxToasts);

  return (
    <div className={`fixed z-50 flex flex-col gap-2 ${positionClasses[position]}`}>
      {displayToasts.map((toast) => (
        <ToastItem
          key={toast.id}
          toast={toast}
          onRemove={handleRemoveToast}
        />
      ))}
    </div>
  );
};

// Hook for creating toasts
const useToast = () => {
  const dispatch = useDispatch();

  const showToast = (toast, options = {}) => {
    const { duration, position } = options;
    
    dispatch(showToast({
      ...toast,
      duration: duration || 5000,
      position: position || 'top-right',
    }));
  };

  const success = (title, message, options) => {
    showToast({ type: 'success', title, message }, options);
  };

  const error = (title, message, options) => {
    showToast({ type: 'error', title, message }, options);
  };

  const warning = (title, message, options) => {
    showToast({ type: 'warning', title, message }, options);
  };

  const info = (title, message, options) => {
    showToast({ type: 'info', title, message }, options);
  };

  return {
    showToast,
    success,
    error,
    warning,
    info,
  };
};

// Toast Provider Component
const ToastProvider = ({
  children,
  position = 'top-right',
  maxToasts = 5,
}) => {
  return (
    <>
      {children}
      <ToastContainer position={position} maxToasts={maxToasts} />
    </>
  );
};

export { ToastProvider, useToast };
export default ToastContainer;
