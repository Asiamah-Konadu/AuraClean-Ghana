import React from 'react';
import { Sparkles, MapPin, Phone, Mail, Clock, ShieldCheck, Heart, ArrowUp, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DISPLAY_PHONE, DISPLAY_PHONE_INTL, COMPANY_EMAIL, COMPANY_LOCATION, getWhatsAppLink } from '../utils/formatters';

export function Footer({ onOpenBooking, onOpenTracking }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{
      background: 'var(--bg-dark-card)',
      color: '#f8fafc',
      padding: '5rem 0 2rem 0',
      borderTop: '1px solid rgba(255, 255, 255, 0.08)',
      position: 'relative'
    }}>
      <div className="container">
        
        {/* Main Footer Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '3rem',
          marginBottom: '4rem'
        }}>
          
          {/* Brand Col */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <img
                src="/favicon.svg"
                alt="AuraClean Ghana Logo"
                style={{
                  width: '42px',
                  height: '42px',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 4px 12px rgba(63, 169, 220, 0.45))'
                }}
              />
              <span style={{ fontSize: '1.4rem', fontWeight: '800', letterSpacing: '-0.02em', color: '#ffffff' }}>
                Aura<span style={{ color: '#34d399' }}>Clean</span> <span style={{ fontSize: '0.8rem', color: '#f59e0b' }}>GHANA</span>
              </span>
            </div>

            <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Ghana's premier luxury residential and commercial hygiene service. Setting five-star cleaning standards across Greater Accra, Kumasi, and Takoradi.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#34d399', fontSize: '0.85rem', fontWeight: '600' }}>
              <ShieldCheck size={16} />
              <span>CID Vetted • 100% Guaranteed</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: '1.05rem', fontWeight: '700', color: '#ffffff', marginBottom: '1.25rem' }}>
              Quick Navigation
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem', color: '#94a3b8' }}>
              <li><Link to="/services" style={{ color: '#cbd5e1' }}>Full Services Catalog</Link></li>
              <li><Link to="/calculator" style={{ color: '#cbd5e1' }}>Instant Price Calculator</Link></li>
              <li><Link to="/transformations" style={{ color: '#cbd5e1' }}>Before & After Gallery</Link></li>
              <li><Link to="/locations" style={{ color: '#cbd5e1' }}>Ghana Hubs & Coverage</Link></li>
              <li><Link to="/about" style={{ color: '#cbd5e1' }}>About AuraClean Standards</Link></li>
              <li><Link to="/contact" style={{ color: '#cbd5e1' }}>Contact & Hotline</Link></li>
            </ul>
          </div>

          {/* Hubs */}
          <div>
            <h4 style={{ fontSize: '1.05rem', fontWeight: '700', color: '#ffffff', marginBottom: '1.25rem' }}>
              Service Hubs
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem', color: '#94a3b8' }}>
              <li>📍 East Legon & Cantonments</li>
              <li>📍 Airport Residential & Osu</li>
              <li>📍 Spintex & Tema Community 1-25</li>
              <li>📍 Kumasi Ahodwo & Nhyiaeso</li>
              <li>📍 Takoradi Beach Road Hub</li>
              <li>
                <button
                  onClick={onOpenTracking}
                  style={{ color: '#34d399', fontWeight: '700', fontSize: '0.85rem', marginTop: '0.25rem', textDecoration: 'underline' }}
                >
                  Track Existing Booking →
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 style={{ fontSize: '1.05rem', fontWeight: '700', color: '#ffffff', marginBottom: '1.25rem' }}>
              Direct Contact
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.9rem', color: '#94a3b8' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <Phone size={16} color="#34d399" />
                <a href={`tel:${DISPLAY_PHONE.replace(/\s/g, '')}`} style={{ color: '#f8fafc', fontWeight: '700' }}>
                  {DISPLAY_PHONE}
                </a>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <Mail size={16} color="#34d399" />
                <a href={`mailto:${COMPANY_EMAIL}`} style={{ color: '#cbd5e1' }}>
                  {COMPANY_EMAIL}
                </a>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                <MapPin size={16} color="#34d399" style={{ marginTop: '3px', flexShrink: 0 }} />
                <span>{COMPANY_LOCATION}</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <Clock size={16} color="#34d399" />
                <span>Mon - Sun: 7:00 AM - 7:00 PM</span>
              </div>
            </div>

            <div style={{ marginTop: '1.25rem' }}>
              <button
                onClick={() => onOpenBooking()}
                className="btn btn-primary"
                style={{ width: '100%', padding: '0.65rem' }}
              >
                <span>Book a Cleaning</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Strip */}
        <div style={{
          paddingTop: '2rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.82rem',
          color: '#64748b'
        }}>
          <div>
            © {new Date().getFullYear()} AuraClean Ghana. All rights reserved. Registered in Ghana.
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Link to="/admin" style={{ color: '#64748b', display: 'flex', alignItems: 'center', gap: '0.3rem' }} title="Staff Operations Portal">
              <Lock size={12} />
              <span>Staff Portal</span>
            </Link>
            <span>•</span>
            <span>Privacy Policy</span>
            <span>•</span>
            <span>Terms of Service</span>
            <span>•</span>
            <button
              onClick={scrollToTop}
              style={{
                color: '#34d399',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
                fontWeight: '600'
              }}
            >
              <span>Back to Top</span>
              <ArrowUp size={14} />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
