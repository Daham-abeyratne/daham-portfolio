"use client";
import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { NotificationProvider} from '../components/Notificationsystem';

interface NotificationWrapperProps {
  children: React.ReactNode;
}

const NotificationWrapper: React.FC<NotificationWrapperProps> = ({ children }) => {
  const { darkMode } = useTheme();
  
  return (
    <NotificationProvider darkMode={darkMode}>
      {children}
    </NotificationProvider>
  );
};

export default NotificationWrapper;