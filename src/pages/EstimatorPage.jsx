import React, { useState } from 'react';
import { Calculator, Check, Sparkles, Flame, Maximize, Shirt, Droplets, Container, Layers, ShieldCheck, ArrowRight, HelpCircle, Phone, Clock, CreditCard } from 'lucide-react';
import { SERVICES_DATA, ADDONS_DATA } from '../data/servicesData';
import { formatGHS, DISPLAY_PHONE, getWhatsAppLink } from '../utils/formatters';

const addonIcons = {
  oven_fridge: Flame,
  windows_exterior: Maximize,
  laundry_ironing: Shirt,
  pressure_wash: Droplets,
  water_tank: Container,
  closet_org: Layers
};

export function EstimatorPage({ onBookWithConfig }) {
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
    <div className="animate-fade-in" style={{ padding: '3.5rem 0 6rem 0', background: 'var(--bg-primary)' }}>
      <div className="container">
        
        {/* Page Hero Header */}
        <div style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto 3.5rem auto' }}>
          <div className="badge-gold" style={{ marginBottom: '0.85rem' }}>
            <Calculator size={14} /> Transparent Ghana Cedi Pricing
          </div>
          <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontWeight: '800', letterSpacing: '-0.03em', marginBottom: '1rem' }}>
            Instant Cleaning Cost Estimator
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.6 }}>
            Customize your exact home or office cleaning package in real-time. Transparent pricing with zero hidden surcharges. All equipment, hospital-grade eco detergents, and Ghana transport are included.
          </p>
        </div>

        {/* Two-Column Interactive Layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '2.5rem',
          maxWidth: '1140px',
          margin: '0 auto'
        }} className="estimator-grid">
          
          {/* Left Column: Interactive Controls */}
          <div className="glass-panel" style={{ padding: '2.5rem', background: 'var(--bg-surface)' }}>
            
            {/* Step 1: Service Category */}
            <div style={{ marginBottom: '2.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.9rem' }}>
                <label style={{ fontSize: '1rem', fontWeight: '800', color: 'var(--text-primary)' }}>
                  1. Select Service Package:
                </label>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Required</span>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '0.75rem' }}>
                {SERVICES_DATA.map(s => {
                  const isSelected = selectedServiceId === s.id;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setSelectedServiceId(s.id)}
                      style={{
                        padding: '0.85rem 0.75rem',
                        borderRadius: 'var(--radius-md)',
                        border: `2px solid ${isSelected ? 'var(--primary-light)' : 'var(--border-subtle)'}`,
                        background: isSelected ? 'var(--primary-subtle)' : 'var(--bg-surface-elevated)',
                        color: isSelected ? 'var(--primary-light)' : 'var(--text-primary)',
                        fontWeight: isSelected ? '700' : '600',
                        fontSize: '0.85rem',
                        textAlign: 'center',
                        transition: 'all 0.2s ease',
                        boxShadow: isSelected ? '0 4px 14px var(--primary-glow)' : 'none'
                      }}
                    >
                      <div>{s.name}</div>
                      <span style={{ fontSize: '0.72rem', opacity: 0.8, display: 'block', marginTop: '0.2rem' }}>
                        From {formatGHS(s.basePrice)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Property Specifications */}
            <div style={{ marginBottom: '2.25rem' }}>
              <label style={{ display: 'block', fontSize: '1rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '1.25rem' }}>
                2. Property Size & Layout:
              </label>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }} className="rooms-grid">
                {/* Bedrooms */}
                <div style={{ background: 'var(--bg-surface-elevated)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '0.75rem' }}>
                    <span style={{ color: 'var(--text-secondary)', fontWeight: '600' }}>Bedrooms / Offices:</span>
                    <strong style={{ color: 'var(--primary-light)', fontSize: '1.05rem' }}>
                      {bedrooms === 1 ? '1 Room / Studio' : `${bedrooms} Rooms`}
                    </strong>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="6"
                    value={bedrooms}
                    onChange={(e) => setBedrooms(Number(e.target.value))}
                    style={{ width: '100%', accentColor: 'var(--primary-light)', cursor: 'pointer' }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
                    <span>1</span>
                    <span>2</span>
                    <span>3</span>
                    <span>4</span>
                    <span>5</span>
                    <span>6+</span>
                  </div>
                </div>

                {/* Bathrooms */}
                <div style={{ background: 'var(--bg-surface-elevated)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '0.75rem' }}>
                    <span style={{ color: 'var(--text-secondary)', fontWeight: '600' }}>Bathrooms / Washrooms:</span>
                    <strong style={{ color: 'var(--primary-light)', fontSize: '1.05rem' }}>
                      {bathrooms === 1 ? '1 Bathroom' : `${bathrooms} Bathrooms`}
                    </strong>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="6"
                    value={bathrooms}
                    onChange={(e) => setBathrooms(Number(e.target.value))}
                    style={{ width: '100%', accentColor: 'var(--primary-light)', cursor: 'pointer' }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
                    <span>1</span>
                    <span>2</span>
                    <span>3</span>
                    <span>4</span>
                    <span>5</span>
                    <span>6+</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Add-Ons Selection */}
            <div style={{ marginBottom: '2.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.9rem' }}>
                <label style={{ fontSize: '1rem', fontWeight: '800', color: 'var(--text-primary)' }}>
                  3. Deep Clean Extra Add-ons:
                </label>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Optional Extras</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: '0.75rem' }}>
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
                        padding: '0.85rem',
                        borderRadius: 'var(--radius-md)',
                        border: `1.5px solid ${isChecked ? 'var(--primary-light)' : 'var(--border-subtle)'}`,
                        background: isChecked ? 'var(--primary-subtle)' : 'var(--bg-surface-elevated)',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        <div style={{
                          width: '22px',
                          height: '22px',
                          borderRadius: '5px',
                          border: `1.5px solid ${isChecked ? 'var(--primary-light)' : 'var(--border-subtle)'}`,
                          background: isChecked ? 'var(--primary-light)' : 'transparent',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#ffffff'
                        }}>
                          {isChecked && <Check size={14} />}
                        </div>
                        <span style={{ fontSize: '0.82rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                          {addon.name}
                        </span>
                      </div>
                      <span style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--primary-light)' }}>
                        +{formatGHS(addon.price)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Frequency Selection */}
            <div>
              <label style={{ display: 'block', fontSize: '1rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '0.9rem' }}>
                4. Cleaning Frequency & Recurring Discounts:
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.85rem' }}>
                {[
                  { id: 'one-time', title: 'One-Time Clean', sub: 'Standard Price' },
                  { id: 'bi-weekly', title: 'Bi-Weekly', sub: 'Save 15% Each Clean' },
                  { id: 'weekly', title: 'Weekly Clean', sub: 'Save 20% Each Clean' }
                ].map(item => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setFrequency(item.id)}
                    style={{
                      padding: '1rem 0.75rem',
                      borderRadius: 'var(--radius-md)',
                      border: `2px solid ${frequency === item.id ? 'var(--accent-gold)' : 'var(--border-subtle)'}`,
                      background: frequency === item.id ? 'var(--accent-gold-subtle)' : 'var(--bg-surface-elevated)',
                      color: frequency === item.id ? 'var(--accent-gold-dark)' : 'var(--text-secondary)',
                      textAlign: 'center',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div style={{ fontWeight: '700', fontSize: '0.95rem' }}>{item.title}</div>
                    <div style={{ fontSize: '0.78rem', marginTop: '0.25rem', opacity: 0.9 }}>{item.sub}</div>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Real-Time Price Summary & Instant Reservation */}
          <div className="glass-panel-strong" style={{
            padding: '2.5rem',
            border: '2px solid var(--border-primary)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            borderRadius: 'var(--radius-lg)'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <div className="badge-emerald">
                  <Sparkles size={14} /> Itemized Estimate
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  <Clock size={13} /> {currentService.duration}
                </div>
              </div>

              <h2 style={{ fontSize: '1.6rem', fontWeight: '800', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
                {currentService.name}
              </h2>

              {/* Line items */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.92rem' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Base Package Rate:</span>
                  <strong>{formatGHS(basePrice)}</strong>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.92rem' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Layout Adjustment ({bedrooms} Bed, {bathrooms} Bath):</span>
                  <strong>+{formatGHS(roomCost)}</strong>
                </div>

                {addonsCost > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.92rem' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Selected Add-ons ({selectedAddons.length}):</span>
                    <strong>+{formatGHS(addonsCost)}</strong>
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.92rem', paddingTop: '0.85rem', borderTop: '1px dashed var(--border-subtle)' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Subtotal:</span>
                  <span>{formatGHS(subtotal)}</span>
                </div>

                {discountAmount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.92rem', color: '#16a34a' }}>
                    <span>Frequency Discount ({discountPct * 100}%):</span>
                    <strong>-{formatGHS(discountAmount)}</strong>
                  </div>
                )}
              </div>

              {/* Total Box */}
              <div style={{
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(245, 158, 11, 0.15) 100%)',
                padding: '1.75rem',
                borderRadius: 'var(--radius-md)',
                marginBottom: '1.75rem',
                border: '1px solid var(--border-primary)'
              }}>
                <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)', fontWeight: '700' }}>
                  Final Estimated Total:
                </span>
                <div style={{ fontSize: '2.6rem', fontWeight: '800', color: 'var(--primary-light)', lineHeight: 1.1, marginTop: '0.3rem' }}>
                  {formatGHS(finalTotal)}
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.45rem' }}>
                  ✓ All transport across Accra/Tema/Kumasi included <br />
                  ✓ Hospital-grade eco-detergents and vacuum gear supplied
                </div>
              </div>
            </div>

            {/* CTA & Trust badges */}
            <div>
              <button
                onClick={handleProceed}
                className="btn btn-primary shimmer-btn"
                style={{ width: '100%', padding: '1.05rem', fontSize: '1.05rem', marginBottom: '1rem' }}
              >
                <span>Book This Exact Configuration</span>
                <ArrowRight size={18} />
              </button>
              
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                <ShieldCheck size={16} color="var(--primary-light)" />
                <span>100% Satisfaction or Free Re-Clean • Pay with MoMo</span>
              </div>
            </div>

          </div>

        </div>

        {/* Pricing FAQs & Guarantees */}
        <div style={{
          marginTop: '5rem',
          maxWidth: '900px',
          margin: '5rem auto 0 auto',
          background: 'var(--bg-surface)',
          padding: '2.5rem',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-subtle)'
        }}>
          <h3 style={{ fontSize: '1.35rem', fontWeight: '800', marginBottom: '1.5rem', textAlign: 'center' }}>
            Frequently Asked Questions Regarding Ghana Pricing
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            <div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: '700', marginBottom: '0.4rem', color: 'var(--primary-light)' }}>
                Are cleaning supplies and transport included?
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                Yes! Every AuraClean squad arrives fully equipped with industrial wet/dry vacuum cleaners, steam machines, microfiber cloths, and hospital-grade eco disinfectants.
              </p>
            </div>

            <div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: '700', marginBottom: '0.4rem', color: 'var(--primary-light)' }}>
                How do I pay for my cleaning session?
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                You can conveniently pay via MTN Mobile Money, Telecel Cash, Bank Transfer, or Cash upon post-cleaning quality inspection.
              </p>
            </div>

            <div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: '700', marginBottom: '0.4rem', color: 'var(--primary-light)' }}>
                What if I need custom corporate or estate cleaning?
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                For large embassies, bank branches, or entire gated communities, our operations supervisor conducts an on-site survey and delivers a tailored contract quote.
              </p>
            </div>

            <div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: '700', marginBottom: '0.4rem', color: 'var(--primary-light)' }}>
                Is there any advance cancellation fee?
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                No. You can reschedule or cancel your slot anytime up to 2 hours prior to dispatch with zero penalty fees.
              </p>
            </div>
          </div>
        </div>

      </div>

      <style>{`
        @media (min-width: 992px) {
          .estimator-grid {
            grid-template-columns: 1.25fr 0.85fr !important;
          }
        }
        @media (max-width: 640px) {
          .rooms-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
