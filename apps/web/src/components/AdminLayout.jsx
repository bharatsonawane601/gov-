
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAdminAuth } from '@/contexts/AdminAuthContext.jsx';
import { 
  LayoutDashboard, FileText, Image as ImageIcon, 
  Home, MessageSquare, Users, Settings, LogOut, Menu, X 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const AdminLayout = ({ children }) => {
  const { adminUser, logout } = useAdminAuth();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'News', path: '/admin/news', icon: FileText },
    { name: 'Gallery', path: '/admin/gallery', icon: ImageIcon },
    { name: 'Homepage', path: '/admin/homepage', icon: Home },
    { name: 'Messages', path: '/admin/messages', icon: MessageSquare },
    { name: 'Users', path: '/admin/users', icon: Users },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  const isActive = (path) => location.pathname === path;

  const SidebarContent = () => (
    <>
      <div className="p-6">
        <div className="flex items-center gap-4 mb-10 bg-primary p-3 rounded-xl shadow-sm">
          <img 
            src="https://horizons-cdn.hostinger.com/6b96f1df-e64c-4f6c-b75d-1c7ff03fb2fb/ed9e93412bd98f41926b88277e201668.png" 
            alt="Government Logo" 
            className="h-10 w-auto object-contain bg-white p-1 rounded" 
          />
          <div>
            <h2 className="font-bold text-primary-foreground leading-tight">Admin Portal</h2>
          </div>
        </div>
        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 font-medium ${
                isActive(item.path)
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-primary'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
      <div className="mt-auto p-6 border-t border-sidebar-border">
        <Button 
          variant="ghost" 
          className="w-full justify-start gap-3 text-sidebar-foreground/80 hover:bg-destructive/10 hover:text-destructive font-medium"
          onClick={() => {
            if (window.confirm('Are you sure you want to log out?')) {
              logout();
            }
          }}
        >
          <LogOut className="w-5 h-5" />
          Logout
        </Button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-muted flex">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-72 bg-[hsl(var(--sidebar-background))] border-r border-sidebar-border fixed inset-y-0 z-20 shadow-sm">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
      )}

      {/* Mobile Sidebar */}
      <aside className={`fixed inset-y-0 left-0 w-72 bg-[hsl(var(--sidebar-background))] border-r border-sidebar-border z-50 transform transition-transform duration-300 md:hidden flex flex-col shadow-xl ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <SidebarContent />
      </aside>

      {/* Main Content */}
      <div className="flex-1 md:ml-72 flex flex-col min-h-screen">
        <header className="h-20 bg-card border-b border-border flex items-center justify-between px-4 sm:px-6 lg:px-8 sticky top-0 z-10 shadow-sm">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden hover:text-primary hover:bg-muted"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </Button>
          
          <div className="ml-auto flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold leading-none text-foreground">{adminUser?.name}</p>
              <p className="text-xs text-secondary mt-1.5 capitalize font-medium">{adminUser?.role}</p>
            </div>
            <Avatar className="h-10 w-10 border-2 border-primary/20">
              <AvatarFallback className="bg-muted text-primary font-bold">
                {adminUser?.name?.charAt(0) || 'A'}
              </AvatarFallback>
            </Avatar>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
