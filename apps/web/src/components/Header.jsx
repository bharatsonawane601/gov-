import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Search, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SearchBar from './SearchBar.jsx';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const { t, i18n } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.about'), path: '/about' },
    { name: t('nav.news'), path: '/news' },
    { name: t('nav.gallery'), path: '/gallery' },
    { name: t('nav.contact'), path: '/contact' }
  ];

  const isActive = (path) => location.pathname === path;

  const handleSearch = (query) => {
    if (query.trim()) {
      navigate(`/news?search=${encodeURIComponent(query)}`);
      setSearchOpen(false);
    }
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'hi' : 'en';
    i18n.changeLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  return (
    <header className="bg-background text-foreground shadow-sm sticky top-0 z-50 border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-4">
            <img 
              src="https://horizons-cdn.hostinger.com/6b96f1df-e64c-4f6c-b75d-1c7ff03fb2fb/ed9e93412bd98f41926b88277e201668.png" 
              alt="Government Logo" 
              className="h-10 md:h-12 w-auto object-contain"
            />
            <div className="hidden sm:block">
              <h1 className="text-lg md:text-xl font-bold leading-tight text-foreground">Rushikesh Jaiswal</h1>
              <p className="text-xs text-secondary font-medium tracking-wide uppercase">Official Website</p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-md transition-all duration-200 font-medium ${
                  isActive(link.path)
                    ? 'text-primary bg-muted'
                    : 'text-foreground hover:text-[hsl(var(--primary-dark))] hover:bg-muted/50'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="text-foreground hover:text-primary font-bold"
            >
              <Globe className="w-4 h-4 mr-2" />
              {i18n.language === 'en' ? 'HI' : 'EN'}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSearchOpen(!searchOpen)}
              className="text-foreground hover:text-primary hover:bg-muted"
            >
              <Search className="w-5 h-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-foreground hover:text-primary hover:bg-muted"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {searchOpen && (
          <div className="pb-4 animate-in slide-in-from-top-2">
            <SearchBar 
              onSearch={handleSearch}
              placeholder={t('common.search')}
            />
          </div>
        )}

        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border animate-in slide-in-from-top-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-md transition-all duration-200 font-medium mb-1 ${
                  isActive(link.path)
                    ? 'text-primary bg-muted'
                    : 'text-foreground hover:text-[hsl(var(--primary-dark))] hover:bg-muted/50'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;