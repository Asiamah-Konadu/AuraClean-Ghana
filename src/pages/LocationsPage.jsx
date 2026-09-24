import React from 'react';
import { CoverageAreas } from '../components/CoverageAreas';
import { Sparkles, MapPin, Clock, ShieldCheck, Truck, Phone, MessageSquare } from 'lucide-react';
import { DISPLAY_PHONE, getWhatsAppLink } from '../utils/formatters';

export function LocationsPage({ onOpenBooking }) {
  return (
    <div className="animate-fade-in" style={{ padding: '3.5rem 0 6rem 0', background: 'var(--bg-primary)' }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 3.5rem auto' }}>
          <div className="badge-emerald" style={{ marginBottom: '0.85rem' }}>
            <MapPin size={14} /> Nationwide Coverage
          </div>
          <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontWeight: '800', letterSpacing: '-0.03em', marginBottom: '1rem' }}>
            Ghana Dispatch Hubs & Service Areas
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.6 }}>
            With permanent dispatch stations in Greater Accra, Tema, Kumasi, and Takoradi, our rapid response cleaning squads reach you on time with zero logistical hassles.
          </p>
        </div>

        {/* Coverage Areas Component */}
        <CoverageAreas onSelectLocation={onOpenBooking} />

        {/* Dispatch Times & Logistics SLA */}
        <div style={{
          marginTop: '4rem',
          background: 'var(--bg-surface)',
          borderRadius: 'var(--radius-lg)',
          padding: '3rem 2.5rem',
          border: '1px solid var(--border-subtle)'
        }}>
          <h2 style={{ fontSize: '1.6rem', fontWeight: '800', marginBottom: '2rem', textAlign: 'center' }}>
            Our Ghana Logistics & Dispatch Guarantees
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem' }}>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                background: 'var(--primary-subtle)',
                color: 'var(--primary-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <Clock size={22} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: '700', marginBottom: '0.35rem' }}>
                  Same-Day Dispatch
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  Book before 12:00 PM for same-day priority dispatch across Accra East, Airport, and Cantonments.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                background: 'var(--accent-gold-subtle)',
                color: 'var(--accent-gold-dark)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <Truck size={22} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: '700', marginBottom: '0.35rem' }}>
                  Free Transport Included
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  No surprise fuel or transport surcharges within all standard Greater Accra, Tema, and Kumasi municipal borders.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                background: 'var(--primary-subtle)',
                color: 'var(--primary-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <ShieldCheck size={22} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: '700', marginBottom: '0.35rem' }}>
                  Supervised Squads
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  Every dispatch squad is accompanied by an experienced Team Lead to supervise quality and safety protocols.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
