
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import pb from '@/lib/pocketbaseClient';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const AdminAuthContext = createContext(null);

export const AdminAuthProvider = ({ children }) => {
  const [adminUser, setAdminUser] = useState(pb.authStore.model);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const TIMEOUT_MS = 30 * 60 * 1000; // 30 minutes

  const logout = useCallback(() => {
    pb.authStore.clear();
    setAdminUser(null);
    localStorage.removeItem('adminLastActivity');
    navigate('/admin/login');
    toast.info('Logged out successfully');
  }, [navigate]);

  const checkTimeout = useCallback(() => {
    if (!pb.authStore.isValid || !pb.authStore.model) return;
    
    const lastActivity = localStorage.getItem('adminLastActivity');
    if (lastActivity && Date.now() - parseInt(lastActivity, 10) > TIMEOUT_MS) {
      toast.error('Session expired due to inactivity');
      logout();
    } else {
      localStorage.setItem('adminLastActivity', Date.now().toString());
    }
  }, [logout]);

  useEffect(() => {
    setAdminUser(pb.authStore.model);
    setLoading(false);

    const unsubscribe = pb.authStore.onChange((token, model) => {
      setAdminUser(model);
    });

    const activityEvents = ['mousedown', 'keydown', 'scroll', 'touchstart'];
    const updateActivity = () => {
      if (pb.authStore.isValid) {
        localStorage.setItem('adminLastActivity', Date.now().toString());
      }
    };

    activityEvents.forEach(event => window.addEventListener(event, updateActivity));
    const interval = setInterval(checkTimeout, 60000); // Check every minute

    return () => {
      unsubscribe();
      activityEvents.forEach(event => window.removeEventListener(event, updateActivity));
      clearInterval(interval);
    };
  }, [checkTimeout]);

  const login = async (email, password, rememberMe) => {
    try {
      const authData = await pb.collection('admin_users').authWithPassword(email, password, { $autoCancel: false });
      setAdminUser(authData.record);
      localStorage.setItem('adminLastActivity', Date.now().toString());
      
      // Update last login
      await pb.collection('admin_users').update(authData.record.id, {
        last_login: new Date().toISOString()
      }, { $autoCancel: false });

      return authData;
    } catch (error) {
      throw error;
    }
  };

  return (
    <AdminAuthContext.Provider value={{ adminUser, login, logout, loading }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => useContext(AdminAuthContext);
