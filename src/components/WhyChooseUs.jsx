import React from 'react';
import { ShieldCheck, UserCheck, Sparkles, Clock, HeartHandshake, Zap, Award, CheckCircle2 } from 'lucide-react';

export function WhyChooseUs({ onOpenBooking }) {
  const reasons = [
    {
      icon: UserCheck,
      title: 'CID-Vetted & Insured Staff',
      description: 'Every cleaner passes background checks with the Ghana Police Service Criminal Investigation Department (CID), identity verification, and multi-week intensive training.'
    },
    {
      icon: Sparkles,
      title: 'Hospital-Grade Eco Disinfectants',
      description: 'We bring 100% of our own industrial gear—HEPA filter vacuums, steam extractors, microfiber cloths, and non-toxic, pet-safe antimicrobial solutions.'
    },
    {
      icon: HeartHandshake,
      title: '100% Satisfaction Re-Clean Guarantee',
      description: 'If any spot does not meet our five-star standard, notify our customer support team within 24 hours and we will return to re-clean it completely free of charge.'
    },
    {
      icon: Zap,
      title: 'Punctual Dispatch Across Ghana',
      description: 'Dedicated teams stationed across Greater Accra hubs (East Legon, Cantonments, Spintex) and Kumasi ensure prompt, reliable arrivals on your selected time slot.'
    },
    {
      icon: Clock,
      title: 'Flexible Booking & MoMo Payments',
      description: 'Book in 60 seconds with no upfront credit cards. Pay comfortably via MTN Mobile Money, Telecel Cash, Bank Card, or upon satisfactory on-site inspection.'
    },
    {
      icon: Award,
      title: 'Dedicated Quality Supervisor',
      description: 'Every residential deep clean and commercial project is overseen by an experienced team lead who performs a 45-point quality checklist before final handover.'
    }
  ];

  return (
    <section id="why-us" style={{ padding: '6rem 0', background: 'var(--bg-surface)', position: 'relative' }}>
      <div className="container">
        
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3.5rem auto' }}>
          <span className="badge-emerald" style={{ marginBottom: '0.75rem' }}>
            <ShieldCheck size={14} /> The Gold Standard in Ghana
          </span>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', fontWeight: '800', letterSpacing: '-0.02em', marginBottom: '1rem' }}>
            Why Ghana's Top Homes & Offices <br />
            <span style={{ color: 'var(--primary-light)' }}>Choose AuraClean</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
            We combine world-class hygiene standards with deep Ghanaian hospitality, reliability, and security.
          </p>
        </div>

        {/* 6 Grid Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '1.75rem'
        }}>
          {reasons.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="glass-panel"
                style={{
                  padding: '2rem',
                  borderRadius: 'var(--radius-lg)',
                  background: 'var(--bg-primary)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  transition: 'transform 0.3s ease, border-color 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.borderColor = 'var(--primary-light)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'var(--border-subtle)';
                }}
              >
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '14px',
                  background: 'var(--primary-subtle)',
                  color: 'var(--primary-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px var(--primary-glow)'
                }}>
                  <Icon size={24} />
                </div>

                <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--text-primary)' }}>
                  {item.title}
                </h3>

                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Callout Strip */}
        <div style={{
          marginTop: '3.5rem',
          background: 'linear-gradient(135deg, #065f46 0%, #059669 60%, #047857 100%)',
          borderRadius: 'var(--radius-lg)',
          padding: '2.5rem',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1.5rem',
          boxShadow: 'var(--shadow-glow)'
        }}>
          <div>
            <h3 style={{ fontSize: '1.6rem', fontWeight: '800', color: '#ffffff', marginBottom: '0.4rem' }}>
              Ready to experience Ghana's cleanest homes?
            </h3>
            <p style={{ color: '#d1fae5', fontSize: '0.95rem' }}>
              Reserve your slot in 60 seconds or message our customer care team on WhatsApp.
            </p>
          </div>

          <button
            onClick={() => onOpenBooking()}
            className="btn btn-gold"
            style={{ padding: '0.9rem 1.8rem', fontSize: '1rem' }}
          >
            <Sparkles size={16} />
            <span>Book Your Cleaning</span>
          </button>
        </div>

      </div>
    </section>
  );
}
