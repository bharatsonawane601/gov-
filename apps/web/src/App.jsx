
import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop.jsx';
import HomePage from './pages/HomePage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import NewsPage from './pages/NewsPage.jsx';
import NewsDetailPage from './pages/NewsDetailPage.jsx';
import GalleryPage from './pages/GalleryPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import { Toaster } from '@/components/ui/sonner';

// Admin Imports
import { AdminAuthProvider } from './contexts/AdminAuthContext.jsx';
import ProtectedAdminRoute from './components/ProtectedAdminRoute.jsx';
import AdminLayout from './components/AdminLayout.jsx';
import AdminLoginPage from './pages/admin/AdminLoginPage.jsx';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import NewsManagementPage from './pages/admin/NewsManagementPage.jsx';
import GalleryManagementPage from './pages/admin/GalleryManagementPage.jsx';
import HomepageEditorPage from './pages/admin/HomepageEditorPage.jsx';
import MessagesManagementPage from './pages/admin/MessagesManagementPage.jsx';
import AdminUsersManagementPage from './pages/admin/AdminUsersManagementPage.jsx';
import AdminSettingsPage from './pages/admin/AdminSettingsPage.jsx';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AdminAuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/news/:id" element={<NewsDetailPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* Admin Auth Route */}
          <Route path="/admin/login" element={<AdminLoginPage />} />

          {/* Protected Admin Routes */}
          <Route path="/admin/*" element={
            <ProtectedAdminRoute>
              <AdminLayout>
                <Routes>
                  <Route path="dashboard" element={<AdminDashboard />} />
                  <Route path="news" element={<NewsManagementPage />} />
                  <Route path="gallery" element={<GalleryManagementPage />} />
                  <Route path="homepage" element={<HomepageEditorPage />} />
                  <Route path="messages" element={<MessagesManagementPage />} />
                  <Route path="users" element={<AdminUsersManagementPage />} />
                  <Route path="settings" element={<AdminSettingsPage />} />
                  <Route path="*" element={<AdminDashboard />} />
                </Routes>
              </AdminLayout>
            </ProtectedAdminRoute>
          } />
        </Routes>
      </AdminAuthProvider>
      <Toaster />
    </Router>
  );
}

export default App;
