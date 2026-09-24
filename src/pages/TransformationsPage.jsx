import React, { useState } from 'react';
import { Sparkles, MoveHorizontal, ArrowLeftRight, CheckCircle2, Star, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export function TransformationsPage({ onOpenBooking }) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [activeCategory, setActiveCategory] = useState('all');
  const [activePreset, setActivePreset] = useState(0);

  const presets = [
    {
      id: 0,
      category: 'kitchen',
      title: 'Luxury Kitchen & Extractor Hood Descaling',
      location: 'East Legon Penthouse',
      before: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1000&q=70',
      after: 'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?auto=format&fit=crop&w=1000&q=70',
      details: 'Deep grease extraction from range hood, baked-on oven carbon removal, and sparkling tile grout polishing.',
      timeSpent: '4.5 Hours',
      serviceType: 'Luxury Deep Clean'
    },
    {
      id: 1,
      category: 'construction',
      title: 'Post-Construction Plaster & Tile Buffing',
      location: 'Cantonments 5-Bed Residence',
      before: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1000&q=70',
      after: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=70',
      details: 'Drywall dust extraction, cement scraping from Spanish porcelain tiles, and rotary floor polishing.',
      timeSpent: '7 Hours',
      serviceType: 'Post-Construction'
    },
    {
      id: 2,
      category: 'upholstery',
      title: 'Velvet Sofa & Carpet Hot Steam Wash',
      location: 'Airport Residential',
      before: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=70',
      after: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1000&q=70',
      details: 'Complete tea and oil stain extraction, color vibrancy rejuvenation, and hospital-grade allergen eradication.',
      timeSpent: '2.5 Hours',
      serviceType: 'Upholstery Steam Clean'
    },
    {
      id: 3,
      category: 'commercial',
      title: 'Executive Corporate Boardroom & Glass Scrub',
      location: 'Ridge Financial Tower',
      before: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=70',
      after: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1000&q=70',
      details: 'Streak-free double glass facade wash, leather seating restoration, and conference table high-gloss buffing.',
      timeSpent: '5 Hours',
      serviceType: 'Commercial Clean'
    }
  ];

  const currentPreset = presets[activePreset];

  return (
    <div className="animate-fade-in" style={{ padding: '3.5rem 0 6rem 0', background: 'var(--bg-primary)' }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 3rem auto' }}>
          <div className="badge-emerald" style={{ marginBottom: '0.85rem' }}>
            <Sparkles size={14} /> Proven Results
          </div>
          <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontWeight: '800', letterSpacing: '-0.03em', marginBottom: '1rem' }}>
            Real Ghana Transformations
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.6 }}>
            Explore actual before-and-after results delivered across Greater Accra, Kumasi, and Takoradi. Drag the interactive split slider to see the dramatic difference.
          </p>

          {/* Project Selector Pills */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.65rem', marginTop: '2rem', flexWrap: 'wrap' }}>
            {presets.map((preset) => (
              <button
                key={preset.id}
                onClick={() => {
                  setActivePreset(preset.id);
                  setSliderPosition(50);
                }}
                style={{
                  padding: '0.6rem 1.2rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.85rem',
                  fontWeight: '700',
                  border: `2px solid ${activePreset === preset.id ? 'var(--primary-light)' : 'var(--border-subtle)'}`,
                  background: activePreset === preset.id ? 'var(--primary-subtle)' : 'var(--bg-surface)',
                  color: activePreset === preset.id ? 'var(--primary-light)' : 'var(--text-secondary)',
                  transition: 'all 0.2s ease',
                  boxShadow: activePreset === preset.id ? '0 4px 12px var(--primary-glow)' : 'none'
                }}
              >
                {preset.title.split('&')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Comparison Card */}
        <div style={{
          maxWidth: '950px',
          margin: '0 auto 4rem auto',
          position: 'relative',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-lg)',
          border: '2px solid var(--border-glass)'
        }}>
          
          <div style={{
            position: 'relative',
            height: '520px',
            width: '100%',
            overflow: 'hidden',
            userSelect: 'none'
          }}>
            
            {/* After Image (Background) */}
            <img
              src={currentPreset.after}
              alt="After AuraClean Clean"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
            
            {/* After Tag */}
            <div style={{
              position: 'absolute',
              top: '1.25rem',
              right: '1.25rem',
              background: 'rgba(5, 150, 105, 0.9)',
              backdropFilter: 'blur(8px)',
              color: '#ffffff',
              fontWeight: '800',
              fontSize: '0.85rem',
              padding: '0.45rem 1rem',
              borderRadius: 'var(--radius-full)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              boxShadow: '0 4px 14px rgba(0,0,0,0.3)',
              zIndex: 3
            }}>
              <Sparkles size={15} /> AFTER: AuraClean Treatment
            </div>

            {/* Before Image (Clipped by slider position) */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: `${sliderPosition}%`,
              height: '100%',
              overflow: 'hidden',
              zIndex: 2
            }}>
              <img
                src={currentPreset.before}
                alt="Before Clean"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '950px',
                  maxWidth: 'none',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
              
              {/* Before Tag */}
              <div style={{
                position: 'absolute',
                top: '1.25rem',
                left: '1.25rem',
                background: 'rgba(15, 23, 42, 0.9)',
                backdropFilter: 'blur(8px)',
                color: '#ffffff',
                fontWeight: '800',
                fontSize: '0.85rem',
                padding: '0.45rem 1rem',
                borderRadius: 'var(--radius-full)',
                boxShadow: '0 4px 14px rgba(0,0,0,0.3)'
              }}>
                BEFORE CLEAN
              </div>
            </div>

            {/* Dividing Line & Drag Indicator */}
            <div style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: `${sliderPosition}%`,
              width: '3.5px',
              background: '#ffffff',
              zIndex: 10,
              boxShadow: '0 0 14px rgba(0,0,0,0.7)',
              transform: 'translateX(-50%)'
            }}>
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                background: '#ffffff',
                color: 'var(--primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 18px rgba(0,0,0,0.5)',
                cursor: 'ew-resize'
              }}>
                <ArrowLeftRight size={20} />
              </div>
            </div>

            {/* Interactive Range Input */}
            <input
              type="range"
              min="0"
              max="100"
              value={sliderPosition}
              onChange={(e) => setSliderPosition(Number(e.target.value))}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                opacity: 0,
                cursor: 'ew-resize',
                zIndex: 20
              }}
            />
          </div>

          {/* Project Details Footer */}
          <div style={{
            background: 'var(--bg-surface)',
            padding: '1.75rem 2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.25rem',
            borderTop: '1px solid var(--border-subtle)'
          }}>
            <div>
              <div style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                {currentPreset.title}
              </div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                📍 {currentPreset.location} • {currentPreset.details}
              </div>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                <span>Duration: <strong>{currentPreset.timeSpent}</strong></span>
                <span>•</span>
                <span>Service: <strong>{currentPreset.serviceType}</strong></span>
              </div>
            </div>
            
            <button
              onClick={() => onOpenBooking()}
              className="btn btn-primary shimmer-btn"
              style={{ padding: '0.75rem 1.5rem' }}
            >
              <Sparkles size={16} />
              <span>Get Similar Results</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
