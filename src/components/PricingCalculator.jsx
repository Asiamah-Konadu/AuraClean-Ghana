import React, { useState } from 'react';
import { Calculator, Check, Sparkles, Flame, Maximize, Shirt, Droplets, Container, Layers, ShieldCheck, ArrowRight } from 'lucide-react';
import { SERVICES_DATA, ADDONS_DATA } from '../data/servicesData';
import { formatGHS } from '../utils/formatters';

const addonIcons = {
  oven_fridge: Flame,
  windows_exterior: Maximize,
  laundry_ironing: Shirt,
  pressure_wash: Droplets,
  water_tank: Container,
  closet_org: Layers
};

export function PricingCalculator({ onBookWithConfig }) {
  const [selectedServiceId, setSelectedServiceId] = useState('deep-clean');
  const [bedrooms, setBedrooms] = useState(3);
  const [bathrooms, setBathrooms] = useState(2);
  const [frequency, setFrequency] = useState('one-time');
  const [selectedAddons, setSelectedAddons] = useState(['oven_fridge']);

  const currentService = SERVICES_DATA.find(s => s.id === selectedServiceId) || SERVICES_DATA[0];

  const toggleAddon = (addonId) => {
    if (selectedAddons.includes(addonId)) {
      setSelectedAddons(selectedAddons.filter(id => id !== addonId));
    } else {
      setSelectedAddons([...selectedAddons, addonId]);
    }
  };

  // Pricing math
  const basePrice = currentService.basePrice;
  const extraBedrooms = Math.max(0, bedrooms - 1);
  const extraBathrooms = Math.max(0, bathrooms - 1);
  const roomCost = (extraBedrooms * 60) + (extraBathrooms * 40);

  const addonsCost = selectedAddons.reduce((sum, id) => {
    const addon = ADDONS_DATA.find(a => a.id === id);
    return sum + (addon ? addon.price : 0);
  }, 0);

  const subtotal = basePrice + roomCost + addonsCost;
  
  let discountPct = 0;
  if (frequency === 'weekly') discountPct = 0.20;
  else if (frequency === 'bi-weekly') discountPct = 0.15;
  else if (frequency === 'monthly') discountPct = 0.10;

  const discountAmount = Math.round(subtotal * discountPct);
  const finalTotal = subtotal - discountAmount;

  const handleProceed = () => {
    const addonNames = selectedAddons.map(id => {
      const a = ADDONS_DATA.find(item => item.id === id);
      return a ? a.name : id;
    });

    onBookWithConfig({
      serviceId: selectedServiceId,
      serviceName: currentService.name,
      bedrooms,
      bathrooms,
      frequency,
      addons: addonNames,
      totalAmount: finalTotal
    });
  };

  return (
    <section id="calculator" style={{ padding: '6rem 0', background: 'var(--bg-surface)', position: 'relative' }}>
      <div className="container">
        
        <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 3.5rem auto' }}>
          <span className="badge-gold" style={{ marginBottom: '0.75rem' }}>
            <Calculator size={14} /> Transparent Ghana Cedi Pricing
          </span>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', fontWeight: '800', letterSpacing: '-0.02em', marginBottom: '1rem' }}>
            Interactive Cleaning Cost Calculator
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
            Custom-tailor your exact cleaning package in real time with zero hidden charges.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '2.5rem',
          maxWidth: '1100px',
          margin: '0 auto'
        }} className="calc-grid">
          
          {/* Controls Column */}
          <div className="glass-panel" style={{ padding: '2.25rem', background: 'var(--bg-primary)' }}>
            
            {/* 1. Service Selection */}
            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', fontSize: '0.95rem', fontWeight: '700', marginBottom: '0.85rem' }}>
                Step 1: Select Service Category
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.65rem' }}>
                {SERVICES_DATA.map(s => {
                  const isSelected = selectedServiceId === s.id;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setSelectedServiceId(s.id)}
                      style={{
                        padding: '0.75rem',
                        borderRadius: 'var(--radius-md)',
                        border: `1.5px solid ${isSelected ? 'var(--primary-light)' : 'var(--border-subtle)'}`,
                        background: isSelected ? 'var(--primary-subtle)' : 'var(--bg-surface)',
                        color: isSelected ? 'var(--primary-light)' : 'var(--text-primary)',
                        fontWeight: isSelected ? '700' : '500',
                        fontSize: '0.82rem',
                        textAlign: 'center',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {s.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Property Size Sliders */}
            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', fontSize: '0.95rem', fontWeight: '700', marginBottom: '1rem' }}>
                Step 2: Property Specifications
              </label>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                {/* Bedrooms */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', marginBottom: '0.5rem' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Bedrooms:</span>
                    <strong style={{ color: 'var(--primary-light)' }}>{bedrooms} {bedrooms === 1 ? 'Bed' : 'Beds'}</strong>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="6"
                    value={bedrooms}
                    onChange={(e) => setBedrooms(Number(e.target.value))}
                    style={{ width: '100%', accentColor: 'var(--primary-light)' }}
                  />
                </div>

                {/* Bathrooms */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', marginBottom: '0.5rem' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Bathrooms:</span>
                    <strong style={{ color: 'var(--primary-light)' }}>{bathrooms} {bathrooms === 1 ? 'Bath' : 'Baths'}</strong>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="6"
                    value={bathrooms}
                    onChange={(e) => setBathrooms(Number(e.target.value))}
                    style={{ width: '100%', accentColor: 'var(--primary-light)' }}
                  />
                </div>
              </div>
            </div>

            {/* 3. Add-Ons Selection */}
            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', fontSize: '0.95rem', fontWeight: '700', marginBottom: '0.85rem' }}>
                Step 3: Optional Deep Clean Add-ons
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.75rem' }}>
                {ADDONS_DATA.map((addon) => {
                  const isChecked = selectedAddons.includes(addon.id);
                  const Icon = addonIcons[addon.id] || Sparkles;
                  return (
                    <div
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.75rem',
                        borderRadius: 'var(--radius-md)',
                        border: `1.5px solid ${isChecked ? 'var(--primary-light)' : 'var(--border-subtle)'}`,
                        background: isChecked ? 'var(--primary-subtle)' : 'var(--bg-surface)',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{
                          width: '20px',
                          height: '20px',
                          borderRadius: '4px',
                          border: `1.5px solid ${isChecked ? 'var(--primary-light)' : 'var(--border-subtle)'}`,
                          background: isChecked ? 'var(--primary-light)' : 'transparent',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#ffffff'
                        }}>
                          {isChecked && <Check size={14} />}
                        </div>
                        <span style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                          {addon.name}
                        </span>
                      </div>
                      <span style={{ fontSize: '0.78rem', fontWeight: '700', color: 'var(--primary-light)' }}>
                        +{formatGHS(addon.price)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 4. Frequency Selection */}
            <div>
              <label style={{ display: 'block', fontSize: '0.95rem', fontWeight: '700', marginBottom: '0.85rem' }}>
                Step 4: Schedule Frequency & Savings
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
                {[
                  { id: 'one-time', title: 'One-Time', sub: 'Standard Price' },
                  { id: 'bi-weekly', title: 'Bi-Weekly', sub: 'Save 15%' },
                  { id: 'weekly', title: 'Weekly Clean', sub: 'Save 20%' }
                ].map(item => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setFrequency(item.id)}
                    style={{
                      padding: '0.85rem 0.5rem',
                      borderRadius: 'var(--radius-md)',
                      border: `1.5px solid ${frequency === item.id ? 'var(--accent-gold)' : 'var(--border-subtle)'}`,
                      background: frequency === item.id ? 'var(--accent-gold-subtle)' : 'var(--bg-surface)',
                      color: frequency === item.id ? 'var(--accent-gold-dark)' : 'var(--text-secondary)',
                      textAlign: 'center'
                    }}
                  >
                    <div style={{ fontWeight: '700', fontSize: '0.9rem' }}>{item.title}</div>
                    <div style={{ fontSize: '0.75rem', marginTop: '0.2rem' }}>{item.sub}</div>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Real-Time Price Summary Card */}
          <div className="glass-panel-strong" style={{
            padding: '2.25rem',
            border: '2px solid var(--border-primary)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <div className="badge-emerald" style={{ marginBottom: '1rem' }}>
                <Sparkles size={14} /> Itemized Estimate
              </div>

              <h3 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '1.5rem' }}>
                {currentService.name}
              </h3>

              {/* Line items */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Base Service Rate:</span>
                  <strong>{formatGHS(basePrice)}</strong>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Property Size Adjustment ({bedrooms} Bed, {bathrooms} Bath):</span>
                  <strong>+{formatGHS(roomCost)}</strong>
                </div>

                {addonsCost > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Selected Add-ons ({selectedAddons.length}):</span>
                    <strong>+{formatGHS(addonsCost)}</strong>
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', paddingTop: '0.75rem', borderTop: '1px dashed var(--border-subtle)' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Subtotal:</span>
                  <span>{formatGHS(subtotal)}</span>
                </div>

                {discountAmount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#16a34a' }}>
                    <span>Frequency Discount ({discountPct * 100}%):</span>
                    <strong>-{formatGHS(discountAmount)}</strong>
                  </div>
                )}
              </div>

              {/* Total Box */}
              <div style={{
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(245, 158, 11, 0.15) 100%)',
                padding: '1.5rem',
                borderRadius: 'var(--radius-md)',
                marginBottom: '1.5rem',
                border: '1px solid var(--border-primary)'
              }}>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)' }}>
                  Final Ghana Cedi Total:
                </span>
                <div style={{ fontSize: '2.4rem', fontWeight: '800', color: 'var(--primary-light)', lineHeight: 1.1, marginTop: '0.2rem' }}>
                  {formatGHS(finalTotal)}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
                  Includes transport, eco-supplies & supervisor inspection
                </div>
              </div>
            </div>

            {/* CTA */}
            <div>
              <button
                onClick={handleProceed}
                className="btn btn-primary"
                style={{ width: '100%', padding: '1rem', fontSize: '1.05rem', marginBottom: '0.85rem' }}
              >
                <span>Reserve This Package Now</span>
                <ArrowRight size={18} />
              </button>
              
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                <ShieldCheck size={15} color="var(--primary-light)" />
                <span>100% Satisfaction or Free Return Clean</span>
              </div>
            </div>

          </div>

        </div>

      </div>

      <style>{`
        @media (min-width: 992px) {
          .calc-grid {
            grid-template-columns: 1.3fr 0.9fr !important;
          }
        }
      `}</style>
    </section>
  );
}
