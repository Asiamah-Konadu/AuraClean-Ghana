import React, { useState, useEffect } from 'react';
import { Sparkles, Star, CheckCircle2, ArrowRight, MessageSquare, PhoneCall, ShieldCheck, MapPin, Calculator, Award, Zap, Clock, ThumbsUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SERVICES_DATA } from '../data/servicesData';
import { DISPLAY_PHONE, getWhatsAppLink } from '../utils/formatters';

export function Hero({ onOpenBooking }) {
  const [activeHighlight, setActiveHighlight] = useState(0);

  const heroHighlights = [
    {
      title: "Luxury Residential Deep Cleaning",
      area: "East Legon & Cantonments",
      badge: "5★ Hospital-Grade",
      img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      serviceId: "deep-clean"
    },
    {
      title: "Corporate & Embassy Headquarters Care",
      area: "Ridge, Airport City & Osu",
      badge: "Corporate Choice",
      img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
      serviceId: "commercial-office"
    },
    {
      title: "Post-Construction & Move-In Polish",
      area: "Airport Residential & Kumasi Ahodwo",
      badge: "Heavy Duty Finish",
      img: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=1200&q=80",
      serviceId: "post-construction"
    }
  ];

  // Auto-rotate hero highlights
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveHighlight((prev) => (prev + 1) % heroHighlights.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const currentHero = heroHighlights[activeHighlight];

  return (
    <section style={{
      position: 'relative',
      padding: '4.5rem 0 5.5rem 0',
      overflow: 'hidden',
      background: 'radial-gradient(ellipse at 50% -15%, rgba(16, 185, 129, 0.18) 0%, rgba(245, 158, 11, 0.08) 45%, rgba(248, 250, 252, 0) 75%)'
    }}>
      {/* Dynamic Animated Ambient Orbs */}
      <div className="hero-glow-1 animate-pulse-glow"></div>
      <div className="hero-glow-2 animate-pulse-glow" style={{ animationDelay: '2s' }}></div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '3.5rem',
          alignItems: 'center'
        }} className="hero-main-grid">
          
          {/* Left Column: Value Proposition & Animated Headlines */}
          <div>
            {/* Top Badges */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
              <div className="badge-emerald animate-fade-in">
                <Sparkles size={14} className="animate-sparkle" /> 
                <span>Ghana's Premier 5-Star Cleaning House</span>
              </div>
              <div className="badge-gold animate-fade-in" style={{ animationDelay: '0.15s' }}>
                <Star size={14} fill="#f59e0b" color="#f59e0b" />
                <span>4.98 Google Score (Accra, Tema & Kumasi)</span>
              </div>
            </div>

            {/* Main Headline */}
            <h1 style={{
              fontSize: 'clamp(2.5rem, 5vw, 4.1rem)',
              fontWeight: '800',
              letterSpacing: '-0.035em',
              lineHeight: 1.12,
              marginBottom: '1.5rem',
              color: 'var(--text-primary)'
            }}>
              Immaculate Living, <br />
              <span style={{
                background: 'linear-gradient(135deg, #059669 0%, #10b981 40%, #f59e0b 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block'
              }}>
                Masterfully Executed in Ghana.
              </span>
            </h1>

            {/* Subheading */}
            <p style={{
              fontSize: '1.15rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.65,
              marginBottom: '2.25rem',
              maxWidth: '580px'
            }}>
              From luxury apartments in <strong>East Legon, Cantonments & Airport</strong> to executive offices in <strong>Ridge & Kumasi</strong>. Experience vetted 5-star cleaning squads, hospital-grade eco-disinfection, and effortless online booking.
            </p>

            {/* Value Checkpoints Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
              gap: '0.85rem',
              marginBottom: '2.5rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', fontSize: '0.92rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                <div style={{ background: 'var(--primary-subtle)', padding: '4px', borderRadius: '50%', display: 'flex' }}>
                  <CheckCircle2 size={16} color="var(--primary-light)" />
                </div>
                <span>100% Background-Vetted Staff</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', fontSize: '0.92rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                <div style={{ background: 'var(--primary-subtle)', padding: '4px', borderRadius: '50%', display: 'flex' }}>
                  <CheckCircle2 size={16} color="var(--primary-light)" />
                </div>
                <span>MTN MoMo & Telecel Accepted</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', fontSize: '0.92rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                <div style={{ background: 'var(--primary-subtle)', padding: '4px', borderRadius: '50%', display: 'flex' }}>
                  <CheckCircle2 size={16} color="var(--primary-light)" />
                </div>
                <span>Free Re-Clean Satisfaction Guarantee</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', fontSize: '0.92rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                <div style={{ background: 'var(--primary-subtle)', padding: '4px', borderRadius: '50%', display: 'flex' }}>
                  <CheckCircle2 size={16} color="var(--primary-light)" />
                </div>
                <span>Hospital-Grade Eco Disinfectants</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
              <button
                onClick={() => onOpenBooking(currentHero.serviceId)}
                className="btn btn-primary shimmer-btn"
                style={{ padding: '0.95rem 2.2rem', fontSize: '1.05rem', boxShadow: '0 8px 25px var(--primary-glow)' }}
              >
                <Sparkles size={18} />
                <span>Book Instant Clean</span>
                <ArrowRight size={18} />
              </button>

              <Link
                to="/calculator"
                className="btn btn-secondary"
                style={{ padding: '0.95rem 1.75rem', fontSize: '1.02rem', gap: '0.6rem' }}
              >
                <Calculator size={18} color="var(--accent-gold-dark)" />
                <span>Calculate Cost</span>
              </Link>

              <a
                href={getWhatsAppLink('Hello AuraClean Ghana! I would like to schedule a clean.')}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
                style={{ padding: '0.95rem 1.6rem', fontSize: '1.02rem' }}
              >
                <MessageSquare size={18} />
                <span>WhatsApp</span>
              </a>
            </div>

            {/* Trust Proof Bar */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.5rem',
              paddingTop: '1.75rem',
              borderTop: '1px solid var(--border-subtle)',
              flexWrap: 'wrap'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ display: 'flex', color: '#f59e0b' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="#f59e0b" color="#f59e0b" />
                  ))}
                </div>
                <span style={{ fontSize: '0.92rem', fontWeight: '800', color: 'var(--text-primary)' }}>4.98 / 5.0</span>
              </div>
              <span style={{ color: 'var(--text-muted)' }}>•</span>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                Trusted by <strong>1,850+</strong> Ghanaian Estates, Villas & Offices
              </span>
            </div>
          </div>

          {/* Right Column: Animated Luxury Interactive Showcase Visual */}
          <div style={{ position: 'relative' }}>
            
            {/* Main Showcase Card with Smooth Image */}
            <div className="glass-panel" style={{
              position: 'relative',
              borderRadius: '26px',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-lg)',
              border: '2px solid var(--border-glass)'
            }}>
              <div style={{ position: 'relative', height: '440px', overflow: 'hidden' }}>
                <img
                  src={currentHero.img}
                  alt={currentHero.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                    transform: 'scale(1.02)'
                  }}
                />
                
                {/* Gradient Shading */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(9, 13, 22, 0.92) 0%, rgba(9, 13, 22, 0.25) 50%, rgba(0,0,0,0.05) 100%)'
                }}></div>

                {/* Top Badge on Image */}
                <div style={{
                  position: 'absolute',
                  top: '1.25rem',
                  left: '1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <span style={{
                    background: 'rgba(255, 255, 255, 0.95)',
                    color: '#065f46',
                    fontSize: '0.78rem',
                    fontWeight: '800',
                    padding: '0.4rem 0.85rem',
                    borderRadius: 'var(--radius-full)',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.25)'
                  }}>
                    ★ {currentHero.badge}
                  </span>
                </div>

                {/* Bottom Overlay Info */}
                <div style={{
                  position: 'absolute',
                  bottom: '1.5rem',
                  left: '1.5rem',
                  right: '1.5rem',
                  color: '#ffffff'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#34d399', fontSize: '0.82rem', fontWeight: '700', marginBottom: '0.3rem' }}>
                    <MapPin size={14} />
                    <span>Serving {currentHero.area}</span>
                  </div>
                  <h3 style={{ fontSize: '1.45rem', fontWeight: '800', color: '#ffffff', marginBottom: '0.75rem' }}>
                    {currentHero.title}
                  </h3>
                  
                  {/* Slide Indicators */}
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem' }}>
                    {heroHighlights.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveHighlight(idx)}
                        style={{
                          height: '5px',
                          flexGrow: 1,
                          borderRadius: '4px',
                          background: activeHighlight === idx ? '#34d399' : 'rgba(255, 255, 255, 0.3)',
                          transition: 'all 0.3s ease'
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Floating Glass Badges (Top Right & Bottom Left) */}
            
            {/* Floating Badge 1: Live Dispatch */}
            <div className="glass-panel-strong animate-float" style={{
              position: 'absolute',
              top: '-1.5rem',
              right: '-1.25rem',
              padding: '0.85rem 1.25rem',
              borderRadius: 'var(--radius-md)',
              border: '1.5px solid rgba(16, 185, 129, 0.4)',
              boxShadow: '0 12px 30px rgba(0, 0, 0, 0.25)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              zIndex: 3
            }}>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(16, 185, 129, 0.4)'
              }}>
                <Zap size={20} />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span className="pulse-dot" style={{ width: '6px', height: '6px' }}></span>
                  <span style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--primary-light)', textTransform: 'uppercase' }}>
                    Just Dispatched
                  </span>
                </div>
                <div style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-primary)' }}>
                  Squad en route to East Legon
                </div>
              </div>
            </div>

            {/* Floating Badge 2: Verified Ghana Standards */}
            <div className="glass-panel-strong animate-float-delayed" style={{
              position: 'absolute',
              bottom: '-1.75rem',
              left: '-1.25rem',
              padding: '0.85rem 1.25rem',
              borderRadius: 'var(--radius-md)',
              border: '1.5px solid rgba(245, 158, 11, 0.4)',
              boxShadow: '0 12px 30px rgba(0, 0, 0, 0.25)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              zIndex: 3
            }}>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #d97706 0%, #f59e0b 100%)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(245, 158, 11, 0.4)'
              }}>
                <ShieldCheck size={20} />
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--accent-gold-dark)', textTransform: 'uppercase' }}>
                  CID Police Vetted
                </div>
                <div style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-primary)' }}>
                  100% Supervised Ghana Teams
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

      <style>{`
        @media (min-width: 992px) {
          .hero-main-grid {
            grid-template-columns: 1.15fr 0.85fr !important;
          }
        }
        @media (max-width: 640px) {
          .hero-main-grid {
            gap: 2rem !important;
          }
        }
      `}</style>
    </section>
  );
}
