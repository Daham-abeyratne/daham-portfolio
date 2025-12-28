"use client";
import React, { useState, useEffect, createContext, useContext } from 'react';
import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-react';

type NotificationType = 'success' | 'error' | 'info';

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  duration?: number;
}

interface NotificationContextType {
  showNotification: (type: NotificationType, title: string, message: string, duration?: number) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within NotificationProvider');
  }
  return context;
};

interface NotificationItemProps {
  notification: Notification;
  onClose: (id: string) => void;
  darkMode: boolean;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ notification, onClose, darkMode }) => {
  const [isExiting, setIsExiting] = useState(false);
  const [progress, setProgress] = useState(100);

  const duration = notification.duration || 5000;

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev - (100 / (duration / 50));
        return newProgress <= 0 ? 0 : newProgress;
      });
    }, 50);

    const timer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, [duration]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose(notification.id);
    }, 400);
  };

  const getIcon = () => {
    switch (notification.type) {
      case 'success':
        return <CheckCircle className="w-6 h-6" />;
      case 'error':
        return <XCircle className="w-6 h-6" />;
      case 'info':
        return <AlertCircle className="w-6 h-6" />;
    }
  };

  const getColors = () => {
    if (darkMode) {
      switch (notification.type) {
        case 'success':
          return {
            bg: 'bg-gray-800 border-green-500/30',
            icon: 'text-green-400',
            progress: 'bg-green-500',
            glow: 'shadow-green-500/20',
          };
        case 'error':
          return {
            bg: 'bg-gray-800 border-red-500/30',
            icon: 'text-red-400',
            progress: 'bg-red-500',
            glow: 'shadow-red-500/20',
          };
        case 'info':
          return {
            bg: 'bg-gray-800 border-blue-500/30',
            icon: 'text-blue-400',
            progress: 'bg-blue-500',
            glow: 'shadow-blue-500/20',
          };
      }
    } else {
      switch (notification.type) {
        case 'success':
          return {
            bg: 'bg-white border-green-200',
            icon: 'text-green-600',
            progress: 'bg-green-500',
            glow: 'shadow-green-200/50',
          };
        case 'error':
          return {
            bg: 'bg-white border-red-200',
            icon: 'text-red-600',
            progress: 'bg-red-500',
            glow: 'shadow-red-200/50',
          };
        case 'info':
          return {
            bg: 'bg-white border-blue-200',
            icon: 'text-blue-600',
            progress: 'bg-blue-500',
            glow: 'shadow-blue-200/50',
          };
      }
    }
  };

  const colors = getColors();

  return (
    <div
      className={`
        notification-item
        ${isExiting ? 'notification-exit' : 'notification-enter'}
        ${colors.bg} ${colors.glow}
        border-l-4 rounded-lg shadow-2xl
        overflow-hidden backdrop-blur-sm
        w-full max-w-md
        transition-all duration-300
      `}
      role="alert"
      aria-live="polite"
    >
      <div className="flex items-start gap-1.5 p-2 pb-5 h-[80px]">
        <div className={`flex-shrink-0 ${colors.icon} mt-0`}>
          {getIcon()}
        </div>
        <div className="flex-1 min-w-0 mt-0">
          <h4 className={`font-bold text-m mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {notification.title}
          </h4>
          <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {notification.message}
          </p>
        </div>
        <button
          onClick={handleClose}
          className={`
            flex-shrink-0 p-1.5 rounded-lg transition-all duration-200
            ${darkMode 
              ? 'hover:bg-gray-700 text-gray-400 hover:text-white' 
              : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
            }
          `}
          aria-label="Close notification"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      <div className="h-[0.5] bg-gray-200 dark:bg-gray-700 overflow-hidden">
        <div
          className={`h-[100%] ${colors.progress} transition-all duration-100 ease-linear`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

interface NotificationProviderProps {
  children: React.ReactNode;
  darkMode: boolean;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children, darkMode }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const showNotification = (
    type: NotificationType,
    title: string,
    message: string,
    duration: number = 1000
  ) => {
    const id = Date.now().toString() + Math.random().toString(36);
    const newNotification: Notification = { id, type, title, message, duration };
    setNotifications((prev) => [...prev, newNotification]);
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      <div className="fixed top-5 left-0 z-[9999] flex flex-col gap-3 pointer-events-none max-w-md w-full px-4">
        <style jsx global>{`
          @keyframes slideInLeft {
            from {
              opacity: 0;
              transform: translateX(-100%) scale(0.55);
            }
            to {
              opacity: 1;
              transform: translateX(0) scale(1);
            }
          }

          @keyframes slideOutLeft {
            from {
              opacity: 1;
              transform: translateX(0) scale(1);
            }
            to {
              opacity: 0;
              transform: translateX(-100%) scale(0.55);
            }
          }

          .notification-enter {
            pointer-events: auto;
            animation: slideInLeft 0.4s cubic-bezier(0.16, -10, 0, 1);
          }

          .notification-exit {
            animation: slideOutLeft 0.3s cubic-bezier(0.4, 0, 1, 1);
          }
        `}</style>
        {notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            onClose={removeNotification}
            darkMode={darkMode}
          />
        ))}
      </div>
    </NotificationContext.Provider>
  );
};