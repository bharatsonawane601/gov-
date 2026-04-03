import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Youtube } from 'lucide-react';
const Footer = () => {
  const footerLinks = [{
    name: 'Home',
    path: '/'
  }, {
    name: 'About',
    path: '/about'
  }, {
    name: 'News',
    path: '/news'
  }, {
    name: 'Gallery',
    path: '/gallery'
  }, {
    name: 'Contact',
    path: '/contact'
  }, {
    name: 'Privacy Policy',
    path: '/privacy'
  }, {
    name: 'Terms of Service',
    path: '/terms'
  }];
  const socialLinks = [{
    icon: Facebook,
    href: '#',
    label: 'Facebook'
  }, {
    icon: Twitter,
    href: '#',
    label: 'Twitter'
  }, {
    icon: Youtube,
    href: '#',
    label: 'YouTube'
  }];
  return <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="mb-6">
              <img src="https://horizons-cdn.hostinger.com/6b96f1df-e64c-4f6c-b75d-1c7ff03fb2fb/ed9e93412bd98f41926b88277e201668.png" alt="Government Logo" className="h-10 w-auto object-contain bg-white p-1.5 rounded-md shadow-sm" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Rushikesh Jaiswal</h2>
            <p className="text-sm font-medium tracking-wide uppercase opacity-90 mb-4">Official Website</p>
            <p className="text-sm opacity-90 leading-relaxed max-w-sm">
              Serving the nation with transparency, efficiency, and dedication to public welfare.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Quick links</h3>
            <nav className="grid grid-cols-2 gap-3">
              {footerLinks.map(link => <Link key={link.path} to={link.path} className="text-sm opacity-90 hover:opacity-100 hover:text-[hsl(var(--primary-dark))] transition-colors duration-200">
                  {link.name}
                </Link>)}
            </nav>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Contact information</h3>
            <div className="space-y-4 text-sm opacity-90">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span className="leading-relaxed">Government Building, Parliament Street, New Delhi - 110001</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <span>+91 11 2301 2345</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 flex-shrink-0" />
                <span>info@govportal.gov.in</span>
              </div>
            </div>

            <div className="flex items-center gap-4 mt-8">
              {socialLinks.map(social => <a key={social.label} href={social.href} aria-label={social.label} className="w-10 h-10 rounded-full bg-primary-foreground/10 hover:bg-[hsl(var(--primary-dark))] flex items-center justify-center transition-all duration-200">
                  <social.icon className="w-5 h-5" />
                </a>)}
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 text-center text-sm opacity-90">
          <p>&copy; {new Date().getFullYear()} Government Portal. All rights reserved.</p>
        </div>
      </div>
    </footer>;
};
export default Footer;