import React, { useState } from 'react';
import { Sparkles, ShieldCheck, Building2, Briefcase, Armchair, Bug, Check, ArrowRight, Clock, Award, CheckCircle2, ChevronRight } from 'lucide-react';
import { SERVICES_DATA } from '../data/servicesData';
import { formatGHS } from '../utils/formatters';
import { Link } from 'react-router-dom';

const iconMap = {
  Sparkles: Sparkles,
  ShieldCheck: ShieldCheck,
  Building2: Building2,
  Briefcase: Briefcase,
  Armchair: Armchair,
  Bug: Bug
};

export function ServicesPage({ onSelectService }) {
  const [activeTab, setActiveTab] = useState('all');

  const filteredServices = activeTab === 'all' 
    ? SERVICES_DATA 
    : activeTab === 'residential' 
      ? SERVICES_DATA.filter(s => ['standard-clean', 'deep-clean', 'upholstery-carpet'].includes(s.id))
      : SERVICES_DATA.filter(s => ['post-construction', 'commercial-office', 'fumigation-pest'].includes(s.id));

  return (
    <div className="animate-fade-in" style={{ padding: '3.5rem 0 6rem 0', background: 'var(--bg-primary)' }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 3.5rem auto' }}>
          <div className="badge-emerald" style={{ marginBottom: '0.85rem' }}>
            <Sparkles size={14} /> Full Spectrum Hygiene Services
          </div>
          <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontWeight: '800', letterSpacing: '-0.03em', marginBottom: '1rem' }}>
            Luxury Cleaning Services Across Ghana
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.6 }}>
            Engineered for high-end Ghanaian residences, embassies, corporate headquarters, and commercial facilities. We bring German extraction technology, eco-friendly hospital sanitizers, and CID-vetted professionals to every job.
          </p>

          {/* Filter Tabs */}
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
              { id: 'all', label: 'All Services (6)' },
              { id: 'residential', label: 'Residential & Upholstery' },
              { id: 'specialized', label: 'Commercial & Specialized' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '0.6rem 1.4rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.88rem',
                  fontWeight: '700',
                  background: activeTab === tab.id ? 'var(--primary)' : 'transparent',
                  color: activeTab === tab.id ? '#ffffff' : 'var(--text-secondary)',
                  transition: 'all 0.2s ease',
                  boxShadow: activeTab === tab.id ? '0 4px 12px var(--primary-glow)' : 'none'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: '2.5rem',
          marginBottom: '5rem'
        }}>
          {filteredServices.map((service) => {
            const IconComponent = iconMap[service.iconName] || Sparkles;
            return (
              <div
                key={service.id}
                className="glass-panel hover-lift"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  border: service.popular ? '2px solid var(--primary-light)' : '1px solid var(--border-glass)',
                  position: 'relative',
                  background: 'var(--bg-surface)'
                }}
              >
                {/* Popular Badge */}
                {service.popular && (
                  <div style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                    color: '#ffffff',
                    fontSize: '0.72rem',
                    fontWeight: '800',
                    padding: '0.35rem 0.85rem',
                    borderRadius: 'var(--radius-full)',
                    boxShadow: '0 4px 14px rgba(245, 158, 11, 0.4)',
                    zIndex: 2
                  }}>
                    ★ {service.badge}
                  </div>
                )}

                {/* Image Header */}
                <div style={{ position: 'relative', height: '210px', overflow: 'hidden' }}>
                  <img
                    src={service.heroImage}
                    alt={service.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(15, 23, 42, 0.9) 0%, rgba(15, 23, 42, 0.15) 60%)'
                  }}></div>
                  
                  <div style={{
                    position: 'absolute',
                    bottom: '1.25rem',
                    left: '1.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem'
                  }}>
                    <div style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '12px',
                      background: 'rgba(255, 255, 255, 0.95)',
                      color: 'var(--primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 15px rgba(0,0,0,0.25)'
                    }}>
                      <IconComponent size={24} />
                    </div>
                    <div>
                      <h3 style={{ color: '#ffffff', fontSize: '1.25rem', fontWeight: '800', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                        {service.name}
                      </h3>
                      <div style={{ color: '#cbd5e1', fontSize: '0.78rem' }}>
                        {service.tagline}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Body Content */}
                <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  
                  {/* Price Banner */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    justifyContent: 'space-between',
                    paddingBottom: '1rem',
                    marginBottom: '1.25rem',
                    borderBottom: '1px solid var(--border-subtle)'
                  }}>
                    <div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Starting from</span>
                      <div style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--primary-light)', lineHeight: 1 }}>
                        {formatGHS(service.basePrice)}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{service.priceUnit}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                        <Clock size={13} /> {service.duration}
                      </div>
                    </div>
                  </div>

                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.55 }}>
                    {service.description}
                  </p>

                  {/* Feature checklist */}
                  <div style={{ marginBottom: '1.75rem', flexGrow: 1 }}>
                    <div style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      Standard Protocols Included:
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {service.features.map((feat, idx) => (
                        <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.55rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                          <Check size={16} color="var(--primary-light)" style={{ flexShrink: 0, marginTop: '2px' }} />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.65rem' }}>
                    <button
                      onClick={() => onSelectService(service.id)}
                      className={service.popular ? "btn btn-primary shimmer-btn" : "btn btn-primary"}
                      style={{ width: '100%', padding: '0.85rem' }}
                    >
                      <Sparkles size={16} />
                      <span>Book {service.name.split(' ')[0]} {service.name.split(' ')[1] || ''}</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 4-Step AuraClean Process Guarantee */}
        <div style={{
          background: 'var(--bg-surface)',
          borderRadius: 'var(--radius-lg)',
          padding: '3rem 2rem',
          border: '1px solid var(--border-subtle)',
          textAlign: 'center'
        }}>
          <div className="badge-gold" style={{ marginBottom: '0.75rem' }}>
            <Award size={14} /> The AuraClean Standard
          </div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '2.5rem' }}>
            How Our 4-Stage Ghana Clean Operates
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem' }}>
            {[
              { step: '01', title: 'Arrival & Pre-Inspection', desc: 'Squad arrives on time in branded AuraClean uniform, inspects problem areas and high-traffic zones.' },
              { step: '02', title: 'Eco Disinfection & Scrub', desc: 'Hospital-grade sanitizers applied to kill 99.9% of bacteria, molds, and viruses on contact.' },
              { step: '03', title: 'Deep Extraction & Polish', desc: 'Industrial steam vacs extract deep stains, polish glass, descales tile grout and cleans appliances.' },
              { step: '04', title: 'Supervisor Quality Sign-off', desc: 'Team Lead walks through with you for final approval before payment is collected via MoMo/Cash.' }
            ].map((item, idx) => (
              <div key={idx} style={{ textAlign: 'left', padding: '1rem', background: 'var(--bg-primary)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: '2rem', fontWeight: '900', color: 'var(--primary-light)', opacity: 0.8, lineHeight: 1, marginBottom: '0.5rem' }}>
                  {item.step}
                </div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: '800', marginBottom: '0.4rem', color: 'var(--text-primary)' }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '2.5rem', display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/calculator" className="btn btn-secondary">
              <span>Calculate Service Pricing</span>
              <ChevronRight size={16} />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
