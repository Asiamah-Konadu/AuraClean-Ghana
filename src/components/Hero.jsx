import React, { useState } from 'react';
import { Sparkles, ShieldCheck, Star, Clock, CheckCircle2, ArrowRight, MessageSquare, PhoneCall, MapPin } from 'lucide-react';
import { SERVICES_DATA } from '../data/servicesData';
import { formatGHS, DISPLAY_PHONE, getWhatsAppLink } from '../utils/formatters';

export function Hero({ onOpenBooking }) {
  const [selectedService, setSelectedService] = useState('deep-clean');
  const [bedrooms, setBedrooms] = useState(2);
  const [frequency, setFrequency] = useState('one-time');

  // Fast estimate calculation
  const currentServiceObj = SERVICES_DATA.find(s => s.id === selectedService) || SERVICES_DATA[0];
  const base = currentServiceObj.basePrice;
  const extraBedrooms = Math.max(0, bedrooms - 1);
  const roomCost = extraBedrooms * 60;
  const subtotal = base + roomCost;
  const discount = frequency === 'weekly' ? 0.2 : frequency === 'bi-weekly' ? 0.15 : 0;
  const estimatedPrice = Math.round(subtotal * (1 - discount));

  return (
    <section style={{
      position: 'relative',
      padding: '4rem 0 5rem 0',
      overflow: 'hidden',
      background: 'radial-gradient(ellipse at 50% -20%, rgba(16, 185, 129, 0.15) 0%, rgba(248, 250, 252, 0) 70%)'
    }}>
      {/* Background glow effects */}
      <div className="hero-glow-1"></div>
      <div className="hero-glow-2"></div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '3.5rem',
          alignItems: 'center'
        }} className="hero-grid">
          
          {/* Left Column: Value Proposition */}
          <div>
            {/* Top Ghana Badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
              <span className="badge-emerald">
                <Sparkles size={14} /> #1 Rated Cleaning Service in Ghana
              </span>
              <span className="badge-gold">
                <Star size={14} fill="#f59e0b" color="#f59e0b" /> 4.98 Google Rating (Accra & Kumasi)
              </span>
            </div>

            {/* Main Headline */}
            <h1 style={{
              fontSize: 'clamp(2.4rem, 4.8vw, 3.8rem)',
              fontWeight: '800',
              letterSpacing: '-0.03em',
              lineHeight: 1.15,
              marginBottom: '1.5rem',
              color: 'var(--text-primary)'
            }}>
              Spotless Luxury Living, <br />
              <span style={{
                background: 'linear-gradient(135deg, #059669 0%, #10b981 50%, #f59e0b 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Crafted for Ghana.
              </span>
            </h1>

            {/* Subheading */}
            <p style={{
              fontSize: '1.15rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
              marginBottom: '2rem',
              maxWidth: '560px'
            }}>
              From luxury apartments in <strong>East Legon & Cantonments</strong> to commercial headquarters in <strong>Ridge & Kumasi</strong>. Experience vetted 5-star cleaning teams, hospital-grade eco-sanitizers, and seamless booking.
            </p>

            {/* Value Checkpoints */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '0.85rem',
              marginBottom: '2.5rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
                <CheckCircle2 size={18} color="var(--primary-light)" />
                <span>100% Background-Vetted Pros</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
                <CheckCircle2 size={18} color="var(--primary-light)" />
                <span>Pay with MTN MoMo / Telecel</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
                <CheckCircle2 size={18} color="var(--primary-light)" />
                <span>Full Re-Clean Guarantee</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
                <CheckCircle2 size={18} color="var(--primary-light)" />
                <span>Eco-Safe Hospital Disinfectants</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => onOpenBooking(selectedService)}
                className="btn btn-primary"
                style={{ padding: '0.95rem 2rem', fontSize: '1.05rem' }}
              >
                <Sparkles size={18} />
                <span>Book Instant Clean</span>
                <ArrowRight size={18} />
              </button>

              <a
                href={getWhatsAppLink('Hello AuraClean Ghana! I would like to get a quote.')}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
                style={{ padding: '0.95rem 1.75rem', fontSize: '1.02rem' }}
              >
                <MessageSquare size={18} />
                <span>WhatsApp ({DISPLAY_PHONE})</span>
              </a>
            </div>

            {/* Trust Bar */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.5rem',
              marginTop: '2.5rem',
              paddingTop: '1.5rem',
              borderTop: '1px solid var(--border-subtle)',
              flexWrap: 'wrap'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ display: 'flex', color: '#f59e0b' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} fill="#f59e0b" />
                  ))}
                </div>
                <span style={{ fontSize: '0.88rem', fontWeight: '700', color: 'var(--text-primary)' }}>4.98 / 5.0</span>
              </div>
              <span style={{ color: 'var(--text-muted)' }}>•</span>
              <span style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                Over <strong>1,850+</strong> Satisfied Ghanaian Homes & Offices
              </span>
            </div>
          </div>

          {/* Right Column: Interactive Quick Quote & Calculator Card */}
          <div>
            <div className="glass-panel" style={{
              padding: '2rem',
              boxShadow: 'var(--shadow-lg)',
              border: '1px solid var(--border-primary)',
              position: 'relative'
            }}>
              {/* Header Badge */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <div>
                  <span className="badge-emerald" style={{ marginBottom: '0.35rem' }}>Instant Ghana Price Estimator</span>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: '800' }}>Get Your Clean Quote</h3>
                </div>
                <div style={{
                  background: 'var(--accent-gold-subtle)',
                  color: 'var(--accent-gold-dark)',
                  padding: '0.4rem 0.75rem',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.75rem',
                  fontWeight: '700',
                  textAlign: 'right'
                }}>
                  Zero Obligation
                </div>
              </div>

              {/* Service Selection Chips */}
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                  1. Choose Service Type:
                </label>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '0.5rem'
                }}>
                  {SERVICES_DATA.slice(0, 4).map((svc) => {
                    const isSelected = selectedService === svc.id;
                    return (
                      <button
                        key={svc.id}
                        type="button"
                        onClick={() => setSelectedService(svc.id)}
                        style={{
                          padding: '0.65rem 0.75rem',
                          borderRadius: 'var(--radius-md)',
                          border: `1.5px solid ${isSelected ? 'var(--primary-light)' : 'var(--border-subtle)'}`,
                          background: isSelected ? 'var(--primary-subtle)' : 'var(--bg-surface-elevated)',
                          color: isSelected ? 'var(--primary-light)' : 'var(--text-primary)',
                          fontWeight: isSelected ? '700' : '500',
                          fontSize: '0.82rem',
                          textAlign: 'left',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{svc.name.split(' ')[0]} {svc.name.split(' ')[1]}</span>
                        {isSelected && <CheckCircle2 size={14} color="var(--primary-light)" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Bedrooms Slider */}
              <div style={{ marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-secondary)' }}>
                    2. Bedrooms / Area Size:
                  </label>
                  <span style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--primary-light)' }}>
                    {bedrooms === 1 ? '1 Bedroom / Studio' : `${bedrooms} Bedrooms`}
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="6"
                  value={bedrooms}
                  onChange={(e) => setBedrooms(Number(e.target.value))}
                  style={{
                    width: '100%',
                    accentColor: 'var(--primary-light)',
                    cursor: 'pointer'
                  }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                  <span>1 Bed</span>
                  <span>2 Beds</span>
                  <span>3 Beds</span>
                  <span>4 Beds</span>
                  <span>5+ Beds (Villa)</span>
                </div>
              </div>

              {/* Frequency Selector */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                  3. Cleaning Frequency:
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.4rem' }}>
                  {[
                    { id: 'one-time', label: 'One-Time', tag: 'Standard' },
                    { id: 'bi-weekly', label: 'Bi-Weekly', tag: 'Save 15%' },
                    { id: 'weekly', label: 'Weekly', tag: 'Save 20%' }
                  ].map((freq) => (
                    <button
                      key={freq.id}
                      type="button"
                      onClick={() => setFrequency(freq.id)}
                      style={{
                        padding: '0.5rem',
                        borderRadius: 'var(--radius-sm)',
                        border: `1px solid ${frequency === freq.id ? 'var(--accent-gold)' : 'var(--border-subtle)'}`,
                        background: frequency === freq.id ? 'var(--accent-gold-subtle)' : 'var(--bg-surface-elevated)',
                        color: frequency === freq.id ? 'var(--accent-gold-dark)' : 'var(--text-secondary)',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        textAlign: 'center'
                      }}
                    >
                      <div>{freq.label}</div>
                      <span style={{ fontSize: '0.65rem', opacity: 0.85 }}>{freq.tag}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Instant Price Output Box */}
              <div style={{
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(245, 158, 11, 0.12) 100%)',
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem',
                border: '1px solid var(--border-primary)',
                marginBottom: '1.25rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                  <div>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Estimated Total:
                    </span>
                    <div style={{ fontSize: '1.85rem', fontWeight: '800', color: 'var(--primary-light)', lineHeight: 1.1 }}>
                      {formatGHS(estimatedPrice)}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span className="badge-emerald" style={{ fontSize: '0.7rem' }}>
                      <Clock size={12} /> {currentServiceObj.duration}
                    </span>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                      All supplies & transport included
                    </div>
                  </div>
                </div>
              </div>

              {/* Book Button */}
              <button
                onClick={() => onOpenBooking(selectedService, bedrooms, frequency)}
                className="btn btn-primary"
                style={{ width: '100%', padding: '0.9rem', fontSize: '1rem' }}
              >
                <span>Proceed to Reserve Slot</span>
                <ArrowRight size={16} />
              </button>

              <div style={{ textAlign: 'center', marginTop: '0.75rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                🔒 No advance credit card needed • Pay with MoMo or after inspection
              </div>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @media (min-width: 992px) {
          .hero-grid {
            grid-template-columns: 1.15fr 0.85fr !important;
          }
        }
      `}</style>
    </section>
  );
}
