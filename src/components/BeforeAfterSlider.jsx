import React, { useState } from 'react';
import { Sparkles, MoveHorizontal, ArrowLeftRight, CheckCircle2 } from 'lucide-react';

export function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [activePreset, setActivePreset] = useState(0);

  const presets = [
    {
      title: 'Luxury Kitchen & Grout Descaling',
      location: 'East Legon Penthouse',
      before: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1000&q=70',
      after: 'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?auto=format&fit=crop&w=1000&q=70',
      details: 'Deep oil grease removal from extractor hood, sparkling tile grout & polished quartz counters.'
    },
    {
      title: 'Post-Construction Tile Restoration',
      location: 'Cantonments 5-Bed Residence',
      before: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1000&q=70',
      after: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=70',
      details: 'Drywall dust extraction, cement scraping, and multi-stage rotary buffing.'
    },
    {
      title: 'Sofa & Upholstery Hot Steam Extraction',
      location: 'Airport Residential',
      before: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=70',
      after: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1000&q=70',
      details: 'Complete tea and oil stain extraction, color brightening, and antimicrobial deodorization.'
    }
  ];

  const currentPreset = presets[activePreset];

  return (
    <section id="transformations" style={{ padding: '6rem 0', background: 'var(--bg-primary)', position: 'relative' }}>
      <div className="container">
        
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3.5rem auto' }}>
          <span className="badge-emerald" style={{ marginBottom: '0.75rem' }}>
            <Sparkles size={14} /> Visible Excellence
          </span>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', fontWeight: '800', letterSpacing: '-0.02em', marginBottom: '1rem' }}>
            Interactive Before & After Results
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
            Drag the interactive slider left and right to inspect the AuraClean transformation.
          </p>

          {/* Preset Buttons */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.6rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
            {presets.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setActivePreset(idx);
                  setSliderPosition(50);
                }}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.82rem',
                  fontWeight: '600',
                  border: `1.5px solid ${activePreset === idx ? 'var(--primary-light)' : 'var(--border-subtle)'}`,
                  background: activePreset === idx ? 'var(--primary-subtle)' : 'var(--bg-surface)',
                  color: activePreset === idx ? 'var(--primary-light)' : 'var(--text-secondary)',
                  transition: 'all 0.2s ease'
                }}
              >
                {preset.title.split('&')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* The Interactive Slider Container */}
        <div style={{
          maxWidth: '900px',
          margin: '0 auto',
          position: 'relative',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-lg)',
          border: '2px solid var(--border-glass)'
        }}>
          
          <div style={{
            position: 'relative',
            height: '480px',
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
            
            {/* After Badge */}
            <div style={{
              position: 'absolute',
              top: '1.25rem',
              right: '1.25rem',
              background: 'rgba(5, 150, 105, 0.85)',
              backdropFilter: 'blur(8px)',
              color: '#ffffff',
              fontWeight: '700',
              fontSize: '0.82rem',
              padding: '0.35rem 0.85rem',
              borderRadius: 'var(--radius-full)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
              zIndex: 3
            }}>
              <Sparkles size={14} /> AFTER: AuraCleaned
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
                  width: '900px',
                  maxWidth: 'none',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
              
              {/* Before Badge */}
              <div style={{
                position: 'absolute',
                top: '1.25rem',
                left: '1.25rem',
                background: 'rgba(15, 23, 42, 0.85)',
                backdropFilter: 'blur(8px)',
                color: '#ffffff',
                fontWeight: '700',
                fontSize: '0.82rem',
                padding: '0.35rem 0.85rem',
                borderRadius: 'var(--radius-full)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
              }}>
                BEFORE
              </div>
            </div>

            {/* Slider Dividing Line & Drag Handle */}
            <div style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: `${sliderPosition}%`,
              width: '3px',
              background: '#ffffff',
              zIndex: 10,
              boxShadow: '0 0 10px rgba(0,0,0,0.6)',
              transform: 'translateX(-50%)'
            }}>
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                background: '#ffffff',
                color: 'var(--primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 15px rgba(0,0,0,0.4)',
                cursor: 'ew-resize'
              }}>
                <ArrowLeftRight size={18} />
              </div>
            </div>

            {/* Range Input Overlaid for dragging */}
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

          {/* Info Banner below the slider */}
          <div style={{
            background: 'var(--bg-surface)',
            padding: '1.25rem 1.75rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            borderTop: '1px solid var(--border-subtle)'
          }}>
            <div>
              <div style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--text-primary)' }}>
                {currentPreset.title}
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                📍 {currentPreset.location} • {currentPreset.details}
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', color: 'var(--primary-light)', fontWeight: '700' }}>
              <CheckCircle2 size={16} /> 100% Guaranteed Finish
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
