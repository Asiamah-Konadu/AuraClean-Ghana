import React, { useState } from 'react';
import { Sparkles, ShieldCheck, Building2, Briefcase, Armchair, Bug, Check, ArrowRight, Clock, Calendar, CheckCircle2 } from 'lucide-react';
import { SERVICES_DATA } from '../data/servicesData';
import { formatGHS } from '../utils/formatters';

const iconMap = {
  Sparkles: Sparkles,
  ShieldCheck: ShieldCheck,
  Building2: Building2,
  Briefcase: Briefcase,
  Armchair: Armchair,
  Bug: Bug
};

export function ServicesSection({ onSelectService }) {
  const [activeTab, setActiveTab] = useState('all');

  const filteredServices = activeTab === 'all' 
    ? SERVICES_DATA 
    : activeTab === 'residential' 
      ? SERVICES_DATA.filter(s => ['standard-clean', 'deep-clean', 'upholstery-carpet'].includes(s.id))
      : SERVICES_DATA.filter(s => ['post-construction', 'commercial-office', 'fumigation-pest'].includes(s.id));

  return (
    <section id="services" style={{ padding: '6rem 0', background: 'var(--bg-primary)', position: 'relative' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3.5rem auto' }}>
          <div className="badge-emerald" style={{ marginBottom: '0.85rem' }}>
            <Sparkles size={14} /> Comprehensive Hygiene Solutions
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', fontWeight: '800', letterSpacing: '-0.02em', marginBottom: '1rem' }}>
            Tailored Cleaning Services <br />
            <span style={{ color: 'var(--primary-light)' }}>For Homes, Estates & Corporate Spaces</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.6 }}>
            Every clean is executed with hospital-grade, eco-friendly supplies, professional extraction gear, and supervised Ghanaian cleaning crews.
          </p>

          {/* Category Tabs */}
          <div style={{
            display: 'inline-flex',
            background: 'var(--bg-surface-elevated)',
            padding: '0.35rem',
            borderRadius: 'var(--radius-full)',
            border: '1px solid var(--border-subtle)',
            marginTop: '2rem',
            gap: '0.35rem'
          }}>
            {[
              { id: 'all', label: 'All Services' },
              { id: 'residential', label: 'Residential & Upholstery' },
              { id: 'specialized', label: 'Commercial & Specialized' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '0.55rem 1.4rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.88rem',
                  fontWeight: '600',
                  background: activeTab === tab.id ? 'var(--primary)' : 'transparent',
                  color: activeTab === tab.id ? '#ffffff' : 'var(--text-secondary)',
                  transition: 'all 0.2s ease'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Services Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: '2rem'
        }}>
          {filteredServices.map((service) => {
            const IconComponent = iconMap[service.iconName] || Sparkles;
            return (
              <div
                key={service.id}
                className="glass-panel"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  border: service.popular ? '2px solid var(--primary-light)' : '1px solid var(--border-glass)',
                  position: 'relative',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  background: 'var(--bg-surface)'
                }}
              >
                {/* Popular Ribbon */}
                {service.popular && (
                  <div style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                    color: '#ffffff',
                    fontSize: '0.72rem',
                    fontWeight: '800',
                    padding: '0.3rem 0.8rem',
                    borderRadius: 'var(--radius-full)',
                    boxShadow: '0 4px 12px rgba(245, 158, 11, 0.4)',
                    zIndex: 2
                  }}>
                    ★ {service.badge}
                  </div>
                )}

                {/* Card Header & Image */}
                <div style={{ position: 'relative', height: '190px', overflow: 'hidden' }}>
                  <img
                    src={service.heroImage}
                    alt={service.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                    onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                  />
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(15, 23, 42, 0.85) 0%, rgba(15, 23, 42, 0.1) 60%)'
                  }}></div>
                  
                  {/* Floating Icon */}
                  <div style={{
                    position: 'absolute',
                    bottom: '1rem',
                    left: '1.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem'
                  }}>
                    <div style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '12px',
                      background: 'rgba(255, 255, 255, 0.95)',
                      color: 'var(--primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 14px rgba(0,0,0,0.2)'
                    }}>
                      <IconComponent size={22} />
                    </div>
                    <div>
                      <div style={{ color: '#ffffff', fontSize: '1.15rem', fontWeight: '800', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                        {service.name}
                      </div>
                      <div style={{ color: '#cbd5e1', fontSize: '0.78rem' }}>
                        {service.tagline}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  
                  {/* Price Bar */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    justifyContent: 'space-between',
                    paddingBottom: '1rem',
                    marginBottom: '1rem',
                    borderBottom: '1px solid var(--border-subtle)'
                  }}>
                    <div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>From</span>
                      <div style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--primary-light)', lineHeight: 1 }}>
                        {formatGHS(service.basePrice)}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{service.priceUnit}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        <Clock size={12} /> {service.duration}
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1.25rem', lineHeight: 1.5 }}>
                    {service.description}
                  </p>

                  {/* Checklist of What's Included */}
                  <div style={{ marginBottom: '1.5rem', flexGrow: 1 }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.65rem' }}>
                      What's Included:
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                      {service.features.map((feat, idx) => (
                        <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                          <Check size={15} color="var(--primary-light)" style={{ flexShrink: 0, marginTop: '2px' }} />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Booking CTA Button */}
                  <button
                    onClick={() => onSelectService(service.id)}
                    className={service.popular ? "btn btn-primary" : "btn btn-secondary"}
                    style={{ width: '100%', padding: '0.8rem' }}
                  >
                    <span>Book {service.name.split(' ')[0]}</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
