import React, { useState, useEffect } from 'react';
import { Sparkles, Phone, MessageSquare, Search, Sun, Moon, Menu, X, ArrowRight, ShieldCheck, MapPin, Calculator } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { DISPLAY_PHONE, getWhatsAppLink } from '../utils/formatters';

export function Navbar({ onOpenBooking, onOpenTracking, darkMode, setDarkMode }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Price Calculator', path: '/calculator', badge: 'Instant' },
    { name: 'Transformations', path: '/transformations' },
    { name: 'Ghana Hubs', path: '/locations' },
    { name: 'Why AuraClean', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <>
      {/* Top Notification Bar for Ghana */}
      <div style={{
        background: 'linear-gradient(90deg, #064e3b 0%, #059669 45%, #d97706 100%)',
        color: '#ffffff',
        fontSize: '0.82rem',
        padding: '0.45rem 1rem',
        textAlign: 'center',
        fontWeight: '500',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.75rem',
        flexWrap: 'wrap',
        position: 'relative',
        zIndex: 101
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <span className="pulse-dot" style={{ backgroundColor: '#34d399' }}></span>
          <span><strong>Now Serving:</strong> Accra, Tema, Kumasi & Takoradi</span>
        </div>
        <span style={{ opacity: 0.6 }} className="hide-mobile">•</span>
        <span className="hide-mobile">⚡ Same-Day & Weekend Slots Available</span>
        <span style={{ opacity: 0.6 }} className="hide-mobile">•</span>
        <a 
          href={getWhatsAppLink('Hello AuraClean, I would like to book a cleaning slot in Ghana.')}
          target="_blank" 
          rel="noopener noreferrer"
          style={{ textDecoration: 'none', fontWeight: '700', color: '#fef08a', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
        >
          <MessageSquare size={13} />
          <span>WhatsApp: {DISPLAY_PHONE}</span>
        </a>
      </div>

      {/* Main Glass Navbar */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        background: scrolled ? 'var(--bg-glass-strong)' : 'var(--bg-glass)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        borderBottom: `1px solid ${scrolled ? 'var(--border-subtle)' : 'transparent'}`,
        boxShadow: scrolled ? 'var(--shadow-md)' : 'none'
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '4.75rem' }}>
          
          {/* Brand Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '13px',
              background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              boxShadow: '0 4px 16px rgba(16, 185, 129, 0.4)',
              transition: 'transform 0.2s ease'
            }}>
              <Sparkles size={23} className="animate-sparkle" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <span style={{ fontSize: '1.45rem', fontWeight: '800', letterSpacing: '-0.03em', color: 'var(--text-primary)' }}>
                  Aura<span style={{ color: 'var(--primary-light)' }}>Clean</span>
                </span>
                <span style={{
                  fontSize: '0.65rem',
                  fontWeight: '800',
                  padding: '0.15rem 0.5rem',
                  background: 'var(--accent-gold-subtle)',
                  color: 'var(--accent-gold-dark)',
                  borderRadius: '4px',
                  border: '1px solid rgba(245, 158, 11, 0.3)'
                }}>GHANA</span>
              </div>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block', marginTop: '-2px', fontWeight: '500' }}>
                Luxury Residential & Office Care
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav style={{ display: 'none', alignItems: 'center', gap: '1.5rem' }} className="desktop-nav">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`nav-link-item ${isActive ? 'active' : ''}`}
                >
                  <span>{link.name}</span>
                  {link.badge && (
                    <span style={{
                      fontSize: '0.65rem',
                      fontWeight: '700',
                      padding: '0.1rem 0.4rem',
                      borderRadius: 'var(--radius-full)',
                      background: 'var(--primary-subtle)',
                      color: 'var(--primary-light)',
                      border: '1px solid var(--border-primary)'
                    }}>
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            
            {/* Dark Mode Switch */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '11px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--bg-surface-elevated)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-secondary)',
                transition: 'all 0.2s ease',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              {darkMode ? <Sun size={18} color="#f59e0b" /> : <Moon size={18} />}
            </button>

            {/* Track Booking Button */}
            <button
              onClick={onOpenTracking}
              className="btn-secondary btn"
              style={{ padding: '0.55rem 0.95rem', fontSize: '0.85rem' }}
            >
              <Search size={15} />
              <span className="hide-mobile">Track Status</span>
            </button>

            {/* Instant Booking Button */}
            <button
              onClick={() => onOpenBooking()}
              className="btn btn-primary shimmer-btn"
              style={{ padding: '0.65rem 1.4rem' }}
            >
              <Sparkles size={16} />
              <span>Book Clean</span>
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-hamburger"
              aria-label="Toggle Navigation Menu"
              style={{
                display: 'none',
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--bg-surface-elevated)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-primary)'
              }}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div style={{
            background: 'var(--bg-surface)',
            borderBottom: '1px solid var(--border-subtle)',
            padding: '1.25rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            animation: 'fadeIn 0.25s ease'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    style={{
                      fontSize: '1rem',
                      fontWeight: '700',
                      color: isActive ? 'var(--primary-light)' : 'var(--text-primary)',
                      padding: '0.65rem 0.75rem',
                      borderRadius: 'var(--radius-md)',
                      background: isActive ? 'var(--primary-subtle)' : 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <span>{link.name}</span>
                    {link.badge && (
                      <span style={{ fontSize: '0.7rem', padding: '0.15rem 0.5rem', borderRadius: '999px', background: 'var(--accent-gold-subtle)', color: 'var(--accent-gold-dark)' }}>
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>

            <hr style={{ borderColor: 'var(--border-subtle)', margin: '0.5rem 0' }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenTracking();
                }}
                className="btn btn-secondary"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <Search size={16} />
                <span>Track Existing Booking</span>
              </button>

              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <MessageSquare size={16} />
                <span>WhatsApp ({DISPLAY_PHONE})</span>
              </a>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="btn btn-primary"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <Sparkles size={16} />
                <span>Book Instant Clean</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Responsive Inline CSS for Navbar */}
      <style>{`
        @media (min-width: 1024px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-hamburger {
            display: none !important;
          }
        }
        @media (max-width: 1023px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-hamburger {
            display: flex !important;
          }
        }
        @media (max-width: 640px) {
          .hide-mobile {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
