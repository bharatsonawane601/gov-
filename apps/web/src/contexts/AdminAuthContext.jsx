
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import pb from '@/lib/pocketbaseClient';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const AdminAuthContext = createContext(null);

export const AdminAuthProvider = ({ children }) => {
  const [adminUser, setAdminUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const TIMEOUT_MS = 30 * 60 * 1000; // 30 minutes

  const logout = useCallback(() => {
    localStorage.removeItem('offlineAdminUser');
    setAdminUser(null);
    localStorage.removeItem('adminLastActivity');
    navigate('/admin/login');
    toast.info('Logged out successfully');
  }, [navigate]);

  const checkTimeout = useCallback(() => {
    const savedUser = localStorage.getItem('offlineAdminUser');
    if (!savedUser) return;
    
    const lastActivity = localStorage.getItem('adminLastActivity');
    if (lastActivity && Date.now() - parseInt(lastActivity, 10) > TIMEOUT_MS) {
      toast.error('Session expired due to inactivity');
      logout();
    } else {
      localStorage.setItem('adminLastActivity', Date.now().toString());
    }
  }, [logout]);

  useEffect(() => {
    const savedUser = localStorage.getItem('offlineAdminUser');
    if (savedUser) {
      setAdminUser(JSON.parse(savedUser));
    } else {
      setAdminUser(null);
    }
    setLoading(false);

    const activityEvents = ['mousedown', 'keydown', 'scroll', 'touchstart'];
    const updateActivity = () => {
      if (localStorage.getItem('offlineAdminUser')) {
        localStorage.setItem('adminLastActivity', Date.now().toString());
      }
    };

    activityEvents.forEach(event => window.addEventListener(event, updateActivity));
    const interval = setInterval(checkTimeout, 60000); // Check every minute

    return () => {
      activityEvents.forEach(event => window.removeEventListener(event, updateActivity));
      clearInterval(interval);
    };
  }, [checkTimeout]);

  const login = async (email, password, rememberMe) => {
    // Hardcoded Offline Authentication
    if (email === "admin@government.com" && password === "SecureAdmin123!") {
      const mockUser = {
        id: "offline-admin",
        email: email,
        name: "Government Admin",
        role: "admin",
      };
      localStorage.setItem('offlineAdminUser', JSON.stringify(mockUser));
      setAdminUser(mockUser);
      localStorage.setItem('adminLastActivity', Date.now().toString());
      return { record: mockUser };
    } else {
      throw new Error("Invalid credentials");
    }
  };

  return (
    <AdminAuthContext.Provider value={{ adminUser, login, logout, loading }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => useContext(AdminAuthContext);
