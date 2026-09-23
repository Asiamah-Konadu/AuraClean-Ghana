import React from 'react';
import { Sparkles, MapPin, Phone, Mail, Clock, ShieldCheck, Heart, ArrowUp } from 'lucide-react';
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.25rem' }}>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff'
              }}>
                <Sparkles size={20} />
              </div>
              <span style={{ fontSize: '1.4rem', fontWeight: '800', letterSpacing: '-0.02em', color: '#ffffff' }}>
                Aura<span style={{ color: '#34d399' }}>Clean</span> <span style={{ fontSize: '0.8rem', color: '#f59e0b' }}>GHANA</span>
              </span>
            </div>

            <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Ghana's leading luxury residential and commercial cleaning service. Setting five-star hygiene standards across Greater Accra, Kumasi, and Takoradi.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#34d399', fontSize: '0.85rem', fontWeight: '600' }}>
              <ShieldCheck size={16} />
              <span>CID Vetted • 100% Guaranteed</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: '1.05rem', fontWeight: '700', color: '#ffffff', marginBottom: '1.25rem' }}>
              Cleaning Services
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem', color: '#94a3b8' }}>
              <li><a href="#services" style={{ transition: 'color 0.2s' }}>Standard Home Cleaning</a></li>
              <li><a href="#services" style={{ transition: 'color 0.2s' }}>Luxury Deep Cleaning</a></li>
              <li><a href="#services" style={{ transition: 'color 0.2s' }}>Post-Construction Clean</a></li>
              <li><a href="#services" style={{ transition: 'color 0.2s' }}>Commercial & Office Care</a></li>
              <li><a href="#services" style={{ transition: 'color 0.2s' }}>Carpet & Steam Extraction</a></li>
              <li><a href="#services" style={{ transition: 'color 0.2s' }}>Fumigation & Pest Control</a></li>
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
