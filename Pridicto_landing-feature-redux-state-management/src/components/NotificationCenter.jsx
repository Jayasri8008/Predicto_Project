import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, CheckCircle, AlertCircle, Info, Zap } from 'lucide-react';

export default function NotificationCenter() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'success',
      title: 'Project Created Successfully',
      message: 'Mobile App Development project is now live',
      timestamp: new Date(Date.now() - 120000),
      read: false,
    },
    {
      id: 2,
      type: 'warning',
      title: 'Budget Alert',
      message: 'E-commerce project is at 90% of allocated budget',
      timestamp: new Date(Date.now() - 600000),
      read: false,
    },
  ]);

  const [isOpen, setIsOpen] = useState(false);

  // Simulate incoming notifications
  useEffect(() => {
    const interval = setInterval(() => {
      const types = ['success', 'warning', 'info'];
      const titles = ['Project Updated', 'Team Member Joined', 'Milestone Reached', 'Comment Added'];
      const messages = [
        'New updates available',
        'Alice joined your team',
        'Phase 1 completed successfully',
        'Sarah commented on your project',
      ];

      const newNotification = {
        id: Math.random(),
        type: types[Math.floor(Math.random() * types.length)],
        title: titles[Math.floor(Math.random() * titles.length)],
        message: messages[Math.floor(Math.random() * messages.length)],
        timestamp: new Date(),
        read: false,
      };

      setNotifications(prev => [newNotification, ...prev.slice(0, 9)]);
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success':
        return { icon: CheckCircle, color: 'text-green-600', bgColor: 'bg-green-100 bg-green-900/30' };
      case 'warning':
        return { icon: AlertCircle, color: 'text-orange-600', bgColor: 'bg-orange-100 bg-orange-900/30' };
      case 'info':
        return { icon: Info, color: 'text-blue-600', bgColor: 'bg-blue-100 bg-blue-900/30' };
      default:
        return { icon: Zap, color: 'text-purple-600', bgColor: 'bg-purple-100 bg-purple-900/30' };
    }
  };

  const formatTime = (date) => {
    const seconds = Math.floor((Date.now() - date) / 1000);
    if (seconds < 60) return 'just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  return (
    <div className="relative">
      {/* Notification Bell */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg bg-gray-100 bg-gray-700 hover:bg-gray-200 hover:bg-gray-600 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Bell className="w-5 h-5 text-gray-700 text-gray-300" />
        
        {/* Badge */}
        <AnimatePresence>
          {unreadCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center"
            >
              {unreadCount > 9 ? '9+' : unreadCount}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Notification Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-96 max-w-sm bg-white bg-gray-800 rounded-lg shadow-xl border-2 border-gray-200 border-gray-700 z-50 max-h-96 overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 flex items-center justify-between p-4 border-b border-gray-200 border-gray-700 bg-white bg-gray-800">
              <h3 className="font-bold text-gray-900 text-white">Notifications</h3>
              <motion.button
                onClick={() => setIsOpen(false)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-5 h-5 text-gray-500 text-gray-400" />
              </motion.button>
            </div>

            {/* Notifications List */}
            {notifications.length > 0 ? (
              <div className="divide-y divide-gray-200 divide-gray-700">
                {notifications.map((notification) => {
                  const { icon: Icon, color, bgColor } = getNotificationIcon(notification.type);

                  return (
                    <motion.div
                      key={notification.id}
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      onClick={() => markAsRead(notification.id)}
                      className={`p-4 cursor-pointer hover:bg-gray-50 hover:bg-gray-700/50 transition-colors ${
                        !notification.read ? 'bg-gradient-to-r from-brand-50 to-accent-50 from-brand-900/20 to-accent-900/20' : ''
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg ${bgColor}`}>
                          <Icon className={`w-5 h-5 ${color}`} />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <p className="font-semibold text-gray-900 text-white text-sm">
                              {notification.title}
                            </p>
                            {!notification.read && (
                              <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="w-2 h-2 bg-brand-600 bg-accent-400 rounded-full flex-shrink-0"
                              />
                            )}
                          </div>
                          <p className="text-xs text-gray-600 text-gray-400 mt-1">
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-500 text-gray-500 mt-2">
                            {formatTime(notification.timestamp)}
                          </p>
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            removeNotification(notification.id);
                          }}
                          className="text-gray-400 text-gray-500 hover:text-gray-600 hover:text-gray-400"
                        >
                          <X className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <div className="p-8 text-center">
                <Bell className="w-8 h-8 text-gray-300 text-gray-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600 text-gray-400">
                  No notifications yet
                </p>
              </div>
            )}

            {/* Footer */}
            {notifications.length > 0 && (
              <div className="p-3 text-center border-t border-gray-200 border-gray-700 bg-gray-50 bg-gray-700/50">
                <button className="text-sm font-semibold text-brand-600 text-accent-400 hover:underline">
                  View all notifications
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
