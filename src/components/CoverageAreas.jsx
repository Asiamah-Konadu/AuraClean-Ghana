import React, { useState } from 'react';
import { MapPin, Navigation, Clock, Users, CheckCircle, ShieldCheck } from 'lucide-react';
import { GHANA_LOCATIONS } from '../data/locationsData';

export function CoverageAreas({ onSelectLocation }) {
  const [activeRegionIndex, setActiveRegionIndex] = useState(0);
  const currentRegion = GHANA_LOCATIONS[activeRegionIndex];

  return (
    <section id="coverage" style={{ padding: '6rem 0', background: 'var(--bg-primary)', position: 'relative' }}>
      <div className="container">
        
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3.5rem auto' }}>
          <span className="badge-emerald" style={{ marginBottom: '0.75rem' }}>
            <MapPin size={14} /> Nationwide Service Hubs
          </span>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', fontWeight: '800', letterSpacing: '-0.02em', marginBottom: '1rem' }}>
            Service Coverage Across Ghana
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
            Our mobile cleaning vans are strategically stationed across prime neighborhoods for fast, guaranteed on-time dispatch.
          </p>

          {/* Region Tabs */}
          <div style={{
            display: 'inline-flex',
            background: 'var(--bg-surface-elevated)',
            padding: '0.35rem',
            borderRadius: 'var(--radius-full)',
            border: '1px solid var(--border-subtle)',
            marginTop: '1.75rem',
            gap: '0.35rem',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}>
            {GHANA_LOCATIONS.map((regionObj, idx) => (
              <button
                key={regionObj.region}
                onClick={() => setActiveRegionIndex(idx)}
                style={{
                  padding: '0.6rem 1.4rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.88rem',
                  fontWeight: '600',
                  background: activeRegionIndex === idx ? 'var(--primary)' : 'transparent',
                  color: activeRegionIndex === idx ? '#ffffff' : 'var(--text-secondary)',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem'
                }}
              >
                <MapPin size={14} />
                <span>{regionObj.region}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Region Content */}
        <div className="glass-panel" style={{
          padding: '2.5rem',
          borderRadius: 'var(--radius-lg)',
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-glass)'
        }}>
          {/* Hub Status Banner */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            paddingBottom: '1.75rem',
            marginBottom: '1.75rem',
            borderBottom: '1px solid var(--border-subtle)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: 'var(--primary-subtle)',
                color: 'var(--primary-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Navigation size={20} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: 'var(--text-primary)' }}>
                  {currentRegion.region} Coverage Hubs
                </h3>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  Live mobile squads active and ready for dispatch
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                <span className="pulse-dot"></span>
                <span>Active Crews on Duty: <strong>8 Vans</strong></span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                <Clock size={14} color="var(--primary-light)" />
                <span>Avg Arrival Time: <strong>35 - 50 Mins</strong></span>
              </div>
            </div>
          </div>

          {/* Grid of Neighborhoods / Cities */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1.25rem'
          }}>
            {currentRegion.cities.map((city, idx) => (
              <div
                key={idx}
                style={{
                  padding: '1.25rem',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-primary)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'transform 0.2s ease, border-color 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--primary-light)'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border-subtle)'}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.65rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '1.05rem', fontWeight: '800' }}>
                      <MapPin size={16} color="var(--primary-light)" />
                      <span>{city.name}</span>
                    </div>
                    <span style={{
                      fontSize: '0.7rem',
                      fontWeight: '700',
                      padding: '0.2rem 0.5rem',
                      borderRadius: '4px',
                      background: 'var(--primary-subtle)',
                      color: 'var(--primary-light)'
                    }}>
                      {city.tag}
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1rem' }}>
                    {city.zones.map((z, zIdx) => (
                      <span
                        key={zIdx}
                        style={{
                          fontSize: '0.72rem',
                          padding: '0.15rem 0.5rem',
                          borderRadius: 'var(--radius-full)',
                          background: 'var(--bg-surface-elevated)',
                          border: '1px solid var(--border-subtle)',
                          color: 'var(--text-secondary)'
                        }}
                      >
                        {z}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '0.75rem',
                  borderTop: '1px dashed var(--border-subtle)',
                  fontSize: '0.78rem'
                }}>
                  <span style={{ color: '#16a34a', fontWeight: '600' }}>✓ Daily Route Active</span>
                  <span style={{ color: 'var(--text-muted)' }}>GPS Verified</span>
                </div>
              </div>
            ))}
          </div>

          <div style={{
            marginTop: '2rem',
            padding: '1rem 1.5rem',
            borderRadius: 'var(--radius-md)',
            background: 'var(--accent-gold-subtle)',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div style={{ fontSize: '0.88rem', color: 'var(--text-primary)' }}>
              <strong>Don't see your specific estate or location?</strong> We cover up to 50km from all major city centres.
            </div>
            <a
              href="https://wa.me/233548877173?text=Hello%20AuraClean,%20do%20you%20service%20my%20area?"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold btn"
              style={{ padding: '0.5rem 1rem', fontSize: '0.82rem' }}
            >
              Inquire Coverage on WhatsApp
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
