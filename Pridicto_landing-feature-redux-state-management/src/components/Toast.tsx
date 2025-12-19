import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, XCircle, AlertTriangle, Info } from 'lucide-react';
import type { ToastMessage } from '../types';
import { useAppDispatch, useAppSelector } from '../store';
import { removeToast } from '../store/slices/uiSlice';

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
} as const;

// Individual Toast Component
interface ToastItemProps {
  toast: ToastMessage;
  onRemove: (id: string) => void;
}

const ToastItem: React.FC<ToastItemProps> = ({ toast, onRemove }) => {
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
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 300, scale: 0.3 }}
        animate={{
          opacity: isLeaving ? 0 : 1,
          x: isLeaving ? 300 : 0,
          scale: isLeaving ? 0.3 : 1,
        }}
        exit={{ opacity: 0, x: 300, scale: 0.5 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`
          flex items-start p-4 border rounded-lg shadow-lg max-w-sm w-full
          ${config.className}
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
        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-current opacity-30 rounded-b-lg"
          initial={{ width: '100%' }}
          animate={{ width: '0%' }}
          transition={{ duration: (toast.duration || 5000) / 1000, ease: 'linear' }}
        />
      </motion.div>
    </AnimatePresence>
  );
};

// Toast Container Component
interface ToastContainerProps {
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
  maxToasts?: number;
}

const ToastContainer: React.FC<ToastContainerProps> = ({
  position = 'top-right',
  maxToasts = 5,
}) => {
  const dispatch = useAppDispatch();
  const toasts = useAppSelector((state) => state.ui.toasts);

  const handleRemoveToast = (id: string) => {
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
  } as const;

  // Limit number of toasts
  const displayToasts = toasts.slice(-maxToasts);

  return (
    <div className={`fixed z-50 flex flex-col gap-2 ${positionClasses[position]}`}>
      <AnimatePresence mode="popLayout">
        {displayToasts.map((toast) => (
          <ToastItem
            key={toast.id}
            toast={toast}
            onRemove={handleRemoveToast}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

// Hook for creating toasts
interface ToastOptions {
  duration?: number;
  position?: ToastContainerProps['position'];
}

export const useToast = () => {
  const dispatch = useAppDispatch();

  const showToast = (toast: Omit<ToastMessage, 'id' | 'timestamp'>, options?: ToastOptions) => {
    const { duration, position } = options || {};
    
    dispatch(showToast({
      ...toast,
      duration: duration || 5000,
      position: position || 'top-right',
    }));
  };

  const success = (title: string, message?: string, options?: ToastOptions) => {
    showToast({ type: 'success', title, message }, options);
  };

  const error = (title: string, message?: string, options?: ToastOptions) => {
    showToast({ type: 'error', title, message }, options);
  };

  const warning = (title: string, message?: string, options?: ToastOptions) => {
    showToast({ type: 'warning', title, message }, options);
  };

  const info = (title: string, message?: string, options?: ToastOptions) => {
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
interface ToastProviderProps {
  children: React.ReactNode;
  position?: ToastContainerProps['position'];
  maxToasts?: number;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({
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

export default ToastContainer;