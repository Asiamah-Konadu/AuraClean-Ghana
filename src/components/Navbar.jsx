import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, Phone, MessageSquare, Search, Sun, Moon, Menu, X, 
  ChevronDown, ChevronRight, MapPin, Calculator, ShieldCheck, 
  Home, Building2, Layers, Bug, ArrowRight, CheckCircle2, Clock, PhoneCall
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { DISPLAY_PHONE, DISPLAY_PHONE_INTL, getWhatsAppLink } from '../utils/formatters';

export function Navbar({ onOpenBooking, onOpenTracking, darkMode, setDarkMode }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer and dropdown on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
  }, [location.pathname]);

  // Handle outside click to close services dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setServicesDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const serviceItems = [
    {
      id: 'deep-clean',
      name: 'Luxury Deep Clean',
      desc: 'Intensive top-to-bottom scrub & sanitization',
      price: 'From GH₵ 480',
      icon: ShieldCheck,
      badge: 'Popular',
      badgeColor: '#10b981'
    },
    {
      id: 'standard-clean',
      name: 'Standard Home Clean',
      desc: 'Regular maintenance for busy homes',
      price: 'From GH₵ 250',
      icon: Sparkles,
      badge: 'Flexible',
      badgeColor: '#0284c7'
    },
    {
      id: 'post-construction',
      name: 'Post-Construction & Move-In',
      desc: 'Heavy dust, paint splatter & plaster scraping',
      price: 'From GH₵ 750',
      icon: Building2,
      badge: 'Heavy Duty',
      badgeColor: '#f59e0b'
    },
    {
      id: 'commercial-office',
      name: 'Commercial & Office Cleaning',
      desc: 'Nightly & weekend corporate facility care',
      price: 'Custom Quote',
      icon: Building2,
      badge: 'B2B',
      badgeColor: '#8b5cf6'
    },
    {
      id: 'sofa-carpet',
      name: 'Sofa & Carpet Extraction',
      desc: 'Deep steam injection & stain extraction',
      price: 'From GH₵ 350',
      icon: Layers,
      badge: 'Steam Clean',
      badgeColor: '#059669'
    },
    {
      id: 'fumigation-pest',
      name: 'Fumigation & Pest Control',
      desc: 'EPA-certified pest & insect eradication',
      price: 'From GH₵ 400',
      icon: Bug,
      badge: 'Certified',
      badgeColor: '#dc2626'
    }
  ];

  const mainNavLinks = [
    { name: 'Home', path: '/' },
    { 
      name: 'Services', 
      path: '/services', 
      hasDropdown: true 
    },
    { 
      name: 'Price Calculator', 
      path: '/calculator', 
      badge: 'Instant',
      badgeClass: 'badge-pulse'
    },
    { name: 'Transformations', path: '/transformations' },
    { name: 'Ghana Hubs', path: '/locations' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <>
      {/* Top Utility & Status Ticker */}
      <div style={{
        background: 'linear-gradient(90deg, #064e3b 0%, #059669 45%, #047857 70%, #d97706 100%)',
        color: '#ffffff',
        fontSize: '0.82rem',
        padding: '0.45rem 1rem',
        textAlign: 'center',
        fontWeight: '500',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        zIndex: 101,
        borderBottom: '1px solid rgba(255,255,255,0.1)'
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: '0 0.5rem' }}>
          
          {/* Left: Location & Slots */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(0,0,0,0.2)', padding: '0.2rem 0.65rem', borderRadius: '999px', fontSize: '0.78rem' }}>
              <span className="pulse-dot" style={{ backgroundColor: '#34d399', width: '7px', height: '7px' }}></span>
              <span><strong>Hubs Active:</strong> Accra • Tema • Kumasi • Takoradi</span>
            </div>
            <span className="hide-tablet" style={{ opacity: 0.75, fontSize: '0.78rem' }}>
              ⚡ Same-Day & Weekend Slots Available
            </span>
          </div>

          {/* Right: Quick Direct Contact & Payment Notice */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span className="hide-mobile" style={{ fontSize: '0.78rem', opacity: 0.9, display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
              <span>🇬🇭</span> MTN MoMo & Telecel Cash Accepted
            </span>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <a 
                href={`tel:${DISPLAY_PHONE.replace(/\s+/g, '')}`}
                style={{ 
                  color: '#ffffff', 
                  textDecoration: 'none', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.35rem', 
                  fontWeight: '600',
                  fontSize: '0.8rem',
                  padding: '0.15rem 0.5rem',
                  borderRadius: '6px',
                  background: 'rgba(255,255,255,0.15)',
                  transition: 'background 0.2s ease'
                }}
              >
                <PhoneCall size={12} />
                <span>{DISPLAY_PHONE}</span>
              </a>

              <a 
                href={getWhatsAppLink('Hello AuraClean, I would like to book a cleaning slot in Ghana.')}
                target="_blank" 
                rel="noopener noreferrer"
                style={{ 
                  textDecoration: 'none', 
                  fontWeight: '700', 
                  color: '#fef08a', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.35rem',
                  fontSize: '0.8rem'
                }}
                className="hide-mobile"
              >
                <MessageSquare size={13} />
                <span>WhatsApp Instant</span>
              </a>
            </div>

          </div>
        </div>
      </div>

      {/* Main Glass Navbar */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        background: scrolled ? 'var(--bg-glass-strong)' : 'var(--bg-glass)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: `1px solid ${scrolled ? 'var(--border-subtle)' : 'rgba(226, 232, 240, 0.4)'}`,
        boxShadow: scrolled ? '0 10px 30px rgba(0,0,0,0.06)' : 'none'
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '4.85rem' }}>
          
          {/* Brand Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', textDecoration: 'none' }}>
            <div style={{
              width: '46px',
              height: '46px',
              borderRadius: '14px',
              background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              boxShadow: '0 4px 18px rgba(16, 185, 129, 0.45)',
              transition: 'transform 0.25s ease',
              position: 'relative'
            }} className="logo-badge">
              <Sparkles size={24} className="animate-sparkle" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <span style={{ fontSize: '1.5rem', fontWeight: '800', letterSpacing: '-0.03em', color: 'var(--text-primary)' }}>
                  Aura<span style={{ color: 'var(--primary-light)' }}>Clean</span>
                </span>
                <span style={{
                  fontSize: '0.62rem',
                  fontWeight: '800',
                  padding: '0.15rem 0.5rem',
                  background: 'var(--accent-gold-subtle)',
                  color: 'var(--accent-gold-dark)',
                  borderRadius: '5px',
                  border: '1px solid rgba(245, 158, 11, 0.35)',
                  letterSpacing: '0.05em'
                }}>GHANA</span>
              </div>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block', marginTop: '-2px', fontWeight: '500' }}>
                Luxury Residential & Commercial Care
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav style={{ display: 'none', alignItems: 'center', gap: '0.5rem' }} className="desktop-nav">
            {mainNavLinks.map((link) => {
              const isActive = location.pathname === link.path;

              if (link.hasDropdown) {
                return (
                  <div 
                    key={link.name} 
                    ref={dropdownRef}
                    style={{ position: 'relative' }}
                    onMouseEnter={() => setServicesDropdownOpen(true)}
                    onMouseLeave={() => setServicesDropdownOpen(false)}
                  >
                    <Link
                      to={link.path}
                      className={`nav-link-pill ${isActive ? 'active' : ''}`}
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
                      onClick={() => setServicesDropdownOpen(false)}
                    >
                      <span>{link.name}</span>
                      <ChevronDown 
                        size={14} 
                        style={{ 
                          transform: servicesDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                          transition: 'transform 0.2s ease'
                        }} 
                      />
                    </Link>

                    {/* Services Dropdown Mega Menu */}
                    {servicesDropdownOpen && (
                      <div 
                        className="services-dropdown-panel"
                        style={{
                          position: 'absolute',
                          top: '100%',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          width: '560px',
                          background: 'var(--bg-surface)',
                          borderRadius: '16px',
                          boxShadow: '0 20px 45px rgba(0,0,0,0.15), 0 0 0 1px var(--border-subtle)',
                          padding: '1.25rem',
                          display: 'grid',
                          gridTemplateColumns: 'repeat(2, 1fr)',
                          gap: '0.75rem',
                          zIndex: 150,
                          animation: 'dropdownFadeIn 0.2s ease'
                        }}
                      >
                        {serviceItems.map((svc) => {
                          const IconComponent = svc.icon;
                          return (
                            <Link
                              key={svc.id}
                              to={`/services#${svc.id}`}
                              onClick={() => setServicesDropdownOpen(false)}
                              style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: '0.75rem',
                                padding: '0.75rem',
                                borderRadius: '12px',
                                textDecoration: 'none',
                                transition: 'all 0.2s ease',
                                background: 'var(--bg-surface-elevated)',
                                border: '1px solid var(--border-subtle)'
                              }}
                              className="dropdown-item-hover"
                            >
                              <div style={{
                                width: '38px',
                                height: '38px',
                                borderRadius: '10px',
                                background: 'var(--primary-subtle)',
                                color: 'var(--primary)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0
                              }}>
                                <IconComponent size={18} />
                              </div>
                              <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.4rem', marginBottom: '0.15rem' }}>
                                  <span style={{ fontSize: '0.88rem', fontWeight: '700', color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    {svc.name}
                                  </span>
                                </div>
                                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.3 }}>
                                  {svc.desc}
                                </p>
                                <span style={{ fontSize: '0.72rem', fontWeight: '700', color: 'var(--primary-light)', marginTop: '0.25rem', display: 'inline-block' }}>
                                  {svc.price}
                                </span>
                              </div>
                            </Link>
                          );
                        })}

                        {/* Dropdown Bottom Banner */}
                        <div style={{
                          gridColumn: 'span 2',
                          background: 'linear-gradient(90deg, var(--primary-subtle), var(--accent-gold-subtle))',
                          borderRadius: '10px',
                          padding: '0.75rem 1rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          border: '1px solid var(--border-primary)'
                        }}>
                          <span style={{ fontSize: '0.82rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                            Need custom recurring schedule or facility audit?
                          </span>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              setServicesDropdownOpen(false);
                              onOpenBooking();
                            }}
                            className="btn btn-primary"
                            style={{ padding: '0.4rem 0.9rem', fontSize: '0.8rem' }}
                          >
                            <span>Book Consultation</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`nav-link-pill ${isActive ? 'active' : ''}`}
                >
                  <span>{link.name}</span>
                  {link.badge && (
                    <span style={{
                      fontSize: '0.65rem',
                      fontWeight: '700',
                      padding: '0.12rem 0.45rem',
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            
            {/* Quick Dial Hotline Button */}
            <a
              href={`tel:${DISPLAY_PHONE.replace(/\s+/g, '')}`}
              className="btn-dial-quick hide-tablet"
              title="Call AuraClean Ghana Direct Hotline"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.55rem 0.9rem',
                borderRadius: '11px',
                background: 'var(--bg-surface-elevated)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-secondary)',
                fontSize: '0.84rem',
                fontWeight: '600',
                textDecoration: 'none',
                transition: 'all 0.2s ease'
              }}
            >
              <Phone size={15} color="var(--primary-light)" />
              <span>Call Us</span>
            </a>

            {/* Dark Mode Switch */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className="btn-theme-toggle"
              aria-label="Toggle Theme Mode"
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--bg-surface-elevated)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-secondary)',
                transition: 'all 0.2s ease',
                boxShadow: 'var(--shadow-sm)',
                cursor: 'pointer'
              }}
            >
              {darkMode ? <Sun size={18} color="#f59e0b" className="animate-spin-slow" /> : <Moon size={18} />}
            </button>

            {/* Track Booking Button */}
            <button
              onClick={onOpenTracking}
              className="btn-secondary btn"
              style={{ padding: '0.6rem 0.95rem', fontSize: '0.85rem' }}
              title="Track Existing Booking or Payment Status"
            >
              <Search size={15} />
              <span className="hide-mobile">Track Clean</span>
            </button>

            {/* Instant Booking Button */}
            <button
              onClick={() => onOpenBooking()}
              className="btn btn-primary shimmer-btn"
              style={{ padding: '0.65rem 1.35rem', gap: '0.45rem' }}
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
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--bg-surface-elevated)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-primary)',
                cursor: 'pointer'
              }}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Fullscreen Glass Drawer Menu */}
        {mobileMenuOpen && (
          <div 
            className="mobile-drawer-overlay"
            style={{
              position: 'fixed',
              inset: 0,
              top: '4.85rem',
              background: 'rgba(0, 0, 0, 0.65)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              zIndex: 999,
              animation: 'drawerOverlayFade 0.25s ease'
            }}
            onClick={() => setMobileMenuOpen(false)}
          >
            <div 
              className="mobile-drawer-content"
              style={{
                background: 'var(--bg-surface)',
                width: '100%',
                maxHeight: 'calc(100vh - 4.85rem)',
                overflowY: 'auto',
                borderBottom: '1px solid var(--border-subtle)',
                padding: '1.25rem 1.5rem 2.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem',
                boxShadow: '0 25px 50px rgba(0,0,0,0.3)',
                animation: 'drawerSlideDown 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Quick Contact & Dial Bar */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '0.75rem'
              }}>
                <a
                  href={`tel:${DISPLAY_PHONE.replace(/\s+/g, '')}`}
                  className="btn btn-secondary"
                  style={{ justifyContent: 'center', padding: '0.65rem', fontSize: '0.85rem' }}
                >
                  <PhoneCall size={16} color="var(--primary-light)" />
                  <span>Call {DISPLAY_PHONE}</span>
                </a>

                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp"
                  style={{ justifyContent: 'center', padding: '0.65rem', fontSize: '0.85rem' }}
                >
                  <MessageSquare size={16} />
                  <span>WhatsApp Chat</span>
                </a>
              </div>

              {/* Mobile Nav Links List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', fontWeight: '700', paddingLeft: '0.5rem' }}>
                  Navigation
                </span>

                {mainNavLinks.map((link) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <Link
                      key={link.name}
                      to={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      style={{
                        fontSize: '1.05rem',
                        fontWeight: '700',
                        color: isActive ? 'var(--primary-light)' : 'var(--text-primary)',
                        padding: '0.75rem 0.85rem',
                        borderRadius: 'var(--radius-md)',
                        background: isActive ? 'var(--primary-subtle)' : 'var(--bg-surface-elevated)',
                        border: `1px solid ${isActive ? 'var(--border-primary)' : 'var(--border-subtle)'}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        textDecoration: 'none'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        <span>{link.name}</span>
                        {link.badge && (
                          <span style={{ fontSize: '0.7rem', padding: '0.15rem 0.5rem', borderRadius: '999px', background: 'var(--accent-gold-subtle)', color: 'var(--accent-gold-dark)' }}>
                            {link.badge}
                          </span>
                        )}
                      </div>
                      <ChevronRight size={18} style={{ opacity: 0.5 }} />
                    </Link>
                  );
                })}
              </div>

              {/* Service Quick Links Grid */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', fontWeight: '700', paddingLeft: '0.5rem' }}>
                  Popular Services in Accra & Kumasi
                </span>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
                  {serviceItems.slice(0, 4).map((svc) => (
                    <Link
                      key={svc.id}
                      to={`/services#${svc.id}`}
                      onClick={() => setMobileMenuOpen(false)}
                      style={{
                        padding: '0.65rem 0.75rem',
                        borderRadius: '10px',
                        background: 'var(--bg-surface-elevated)',
                        border: '1px solid var(--border-subtle)',
                        textDecoration: 'none',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.2rem'
                      }}
                    >
                      <span style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-primary)' }}>{svc.name}</span>
                      <span style={{ fontSize: '0.72rem', color: 'var(--primary-light)', fontWeight: '600' }}>{svc.price}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Mobile Ghana Hubs Indicator */}
              <div style={{
                padding: '0.85rem',
                borderRadius: '12px',
                background: 'var(--bg-surface-elevated)',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                <MapPin size={20} color="var(--primary-light)" style={{ flexShrink: 0 }} />
                <div>
                  <span style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-primary)', display: 'block' }}>
                    Coverage Areas Across Ghana
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                    East Legon, Airport, Cantonments, Tema, Kumasi & Takoradi
                  </span>
                </div>
              </div>

              {/* Mobile Drawer Bottom Action CTAs */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenTracking();
                  }}
                  className="btn btn-secondary"
                  style={{ width: '100%', justifyContent: 'center', padding: '0.8rem' }}
                >
                  <Search size={17} />
                  <span>Track Existing Booking</span>
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenBooking();
                  }}
                  className="btn btn-primary shimmer-btn"
                  style={{ width: '100%', justifyContent: 'center', padding: '0.85rem' }}
                >
                  <Sparkles size={18} />
                  <span>Book Instant Cleaning Now</span>
                </button>
              </div>

            </div>
          </div>
        )}
      </header>

      {/* Responsive Inline CSS for Navbar */}
      <style>{`
        .nav-link-pill {
          position: relative;
          font-size: 0.92rem;
          font-weight: 600;
          color: var(--text-secondary);
          padding: 0.55rem 0.95rem;
          border-radius: var(--radius-full);
          transition: all var(--transition-fast);
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
        }

        .nav-link-pill:hover {
          color: var(--primary-light);
          background: var(--primary-subtle);
        }

        .nav-link-pill.active {
          color: var(--primary-light);
          background: var(--primary-subtle);
          font-weight: 700;
        }

        .dropdown-item-hover:hover {
          background: var(--primary-subtle) !important;
          border-color: var(--border-primary) !important;
          transform: translateY(-2px);
        }

        .btn-dial-quick:hover {
          border-color: var(--border-primary) !important;
          background: var(--primary-subtle) !important;
          color: var(--primary-light) !important;
        }

        .btn-theme-toggle:hover {
          transform: rotate(20deg);
          border-color: var(--border-primary) !important;
        }

        .logo-badge:hover {
          transform: scale(1.05) rotate(-3deg);
        }

        @keyframes dropdownFadeIn {
          from {
            opacity: 0;
            transform: translate(-50%, 8px);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }

        @keyframes drawerOverlayFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes drawerSlideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (min-width: 1100px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-hamburger {
            display: none !important;
          }
        }
        @media (max-width: 1099px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-hamburger {
            display: flex !important;
          }
        }
        @media (max-width: 820px) {
          .hide-tablet {
            display: none !important;
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

