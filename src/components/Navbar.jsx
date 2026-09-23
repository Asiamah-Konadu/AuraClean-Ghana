import React, { useState, useEffect } from 'react';
import { Sparkles, Phone, MessageSquare, Search, Shield, Sun, Moon, Menu, X, CheckCircle2 } from 'lucide-react';
import { DISPLAY_PHONE, WHATSAPP_NUMBER, getWhatsAppLink } from '../utils/formatters';

export function Navbar({ onOpenBooking, onOpenTracking, onToggleAdmin, isAdminMode, darkMode, setDarkMode }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Instant Calculator', href: '#calculator' },
    { name: 'Before & After', href: '#transformations' },
    { name: 'Ghana Hubs', href: '#coverage' },
    { name: 'Why Us', href: '#why-us' },
    { name: 'Reviews', href: '#reviews' }
  ];

  return (
    <>
      {/* Top Notification Bar for Ghana */}
      <div style={{
        background: 'linear-gradient(90deg, #065f46 0%, #059669 50%, #d97706 100%)',
        color: '#ffffff',
        fontSize: '0.82rem',
        padding: '0.45rem 1rem',
        textAlign: 'center',
        fontWeight: '500',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.75rem',
        flexWrap: 'wrap'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <span className="pulse-dot" style={{ backgroundColor: '#34d399' }}></span>
          <span><strong>Now Serving:</strong> Accra, Tema, Kumasi & Takoradi</span>
        </div>
        <span style={{ opacity: 0.7 }}>•</span>
        <span>⚡ Same-Day & Weekend Slots Available</span>
        <span style={{ opacity: 0.7 }}>•</span>
        <a 
          href={getWhatsAppLink('Hello AuraClean, I would like to book a cleaning slot.')}
          target="_blank" 
          rel="noopener noreferrer"
          style={{ textDecoration: 'underline', fontWeight: '700', color: '#fef08a' }}
        >
          WhatsApp: {DISPLAY_PHONE}
        </a>
      </div>

      {/* Main Sticky Navbar */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        transition: 'all 0.3s ease',
        background: scrolled ? 'var(--bg-glass-strong)' : 'var(--bg-glass)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: `1px solid ${scrolled ? 'var(--border-subtle)' : 'transparent'}`,
        boxShadow: scrolled ? 'var(--shadow-sm)' : 'none'
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '4.5rem' }}>
          
          {/* Logo */}
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              boxShadow: '0 4px 14px rgba(16, 185, 129, 0.4)'
            }}>
              <Sparkles size={22} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span style={{ fontSize: '1.4rem', fontWeight: '800', letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
                  Aura<span style={{ color: 'var(--primary-light)' }}>Clean</span>
                </span>
                <span style={{
                  fontSize: '0.65rem',
                  fontWeight: '700',
                  padding: '0.15rem 0.45rem',
                  background: 'var(--accent-gold-subtle)',
                  color: 'var(--accent-gold-dark)',
                  borderRadius: '4px',
                  border: '1px solid rgba(245, 158, 11, 0.3)'
                }}>GHANA</span>
              </div>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block', marginTop: '-3px' }}>
                Luxury Residential & Office Care
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav style={{ display: 'none', alignItems: 'center', gap: '1.75rem' }} className="desktop-nav">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                style={{
                  fontSize: '0.92rem',
                  fontWeight: '600',
                  color: 'var(--text-secondary)',
                  transition: 'color 0.2s ease',
                  padding: '0.4rem 0'
                }}
                onMouseEnter={(e) => e.target.style.color = 'var(--primary-light)'}
                onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            
            {/* Dark Mode Switch */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--bg-surface-elevated)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-secondary)',
                transition: 'all 0.2s ease'
              }}
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Track Booking Button */}
            <button
              onClick={onOpenTracking}
              className="btn-secondary btn"
              style={{ padding: '0.55rem 1rem', fontSize: '0.85rem' }}
            >
              <Search size={15} />
              <span className="hide-mobile">Track Status</span>
            </button>

            {/* Admin Toggle */}
            <button
              onClick={onToggleAdmin}
              title="Toggle Back-Office Dashboard"
              style={{
                padding: '0.55rem 0.9rem',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.82rem',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                background: isAdminMode ? 'var(--accent-gold)' : 'var(--bg-surface-elevated)',
                color: isAdminMode ? '#000000' : 'var(--text-secondary)',
                border: '1px solid var(--border-subtle)',
                transition: 'all 0.2s ease'
              }}
            >
              <Shield size={14} />
              <span className="hide-mobile">{isAdminMode ? 'Exit Admin' : 'Admin Portal'}</span>
            </button>

            {/* Instant Booking Button */}
            <button
              onClick={() => onOpenBooking()}
              className="btn btn-primary"
              style={{ padding: '0.65rem 1.35rem' }}
            >
              <Sparkles size={16} />
              <span>Book Service</span>
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-hamburger"
              style={{
                display: 'none',
                width: '38px',
                height: '38px',
                borderRadius: '8px',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--bg-surface-elevated)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-primary)'
              }}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
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
            gap: '1rem'
          }}>
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  fontSize: '1rem',
                  fontWeight: '600',
                  color: 'var(--text-primary)',
                  padding: '0.5rem 0'
                }}
              >
                {link.name}
              </a>
            ))}
            <hr style={{ borderColor: 'var(--border-subtle)', margin: '0.5rem 0' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
                style={{ width: '100%' }}
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
                style={{ width: '100%' }}
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
        @media (min-width: 992px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-hamburger {
            display: none !important;
          }
        }
        @media (max-width: 991px) {
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
