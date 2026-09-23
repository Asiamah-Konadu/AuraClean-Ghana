import React, { useState, useEffect } from 'react';
import { X, Sparkles, Check, ArrowRight, ArrowLeft, Calendar, Clock, MapPin, Phone, User, Mail, ShieldCheck, CreditCard, MessageSquare, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { SERVICES_DATA, ADDONS_DATA } from '../data/servicesData';
import { GHANA_LOCATIONS, TIME_SLOTS } from '../data/locationsData';
import { formatGHS, DISPLAY_PHONE, WHATSAPP_NUMBER, getWhatsAppLink } from '../utils/formatters';

export function BookingModal({ isOpen, onClose, initialConfig }) {
  const [step, setStep] = useState(1);
  
  // Step 1: Service config
  const [serviceId, setServiceId] = useState(initialConfig?.serviceId || 'deep-clean');
  const [bedrooms, setBedrooms] = useState(initialConfig?.bedrooms || 2);
  const [bathrooms, setBathrooms] = useState(initialConfig?.bathrooms || 2);
  const [frequency, setFrequency] = useState(initialConfig?.frequency || 'one-time');
  const [selectedAddons, setSelectedAddons] = useState(initialConfig?.addons || []);

  // Step 2: Customer & Location Info
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('Accra');
  const [location, setLocation] = useState('');
  const [gpsAddress, setGpsAddress] = useState('');

  // Step 3: Schedule
  const [date, setDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [timeSlot, setTimeSlot] = useState(TIME_SLOTS[0]);
  const [notes, setNotes] = useState('');

  // Step 4: Payment
  const [paymentMethod, setPaymentMethod] = useState('mtn_momo');
  const [submitting, setSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (initialConfig) {
      if (initialConfig.serviceId) setServiceId(initialConfig.serviceId);
      if (initialConfig.bedrooms) setBedrooms(initialConfig.bedrooms);
      if (initialConfig.bathrooms) setBathrooms(initialConfig.bathrooms);
      if (initialConfig.frequency) setFrequency(initialConfig.frequency);
      if (initialConfig.addons) setSelectedAddons(initialConfig.addons);
    }
  }, [initialConfig]);

  if (!isOpen) return null;

  const currentService = SERVICES_DATA.find(s => s.id === serviceId) || SERVICES_DATA[0];

  // Price computation
  const basePrice = currentService.basePrice;
  const roomCost = (Math.max(0, bedrooms - 1) * 60) + (Math.max(0, bathrooms - 1) * 40);
  
  const addonsCost = selectedAddons.reduce((sum, item) => {
    const found = ADDONS_DATA.find(a => a.name === item || a.id === item);
    return sum + (found ? found.price : 0);
  }, 0);

  const subtotal = basePrice + roomCost + addonsCost;
  let discountPct = 0;
  if (frequency === 'weekly') discountPct = 0.20;
  else if (frequency === 'bi-weekly') discountPct = 0.15;
  else if (frequency === 'monthly') discountPct = 0.10;
  
  const discountAmount = Math.round(subtotal * discountPct);
  const totalAmount = subtotal - discountAmount;

  const toggleAddon = (addonName) => {
    if (selectedAddons.includes(addonName)) {
      setSelectedAddons(selectedAddons.filter(a => a !== addonName));
    } else {
      setSelectedAddons([...selectedAddons, addonName]);
    }
  };

  const handleNext = () => {
    setErrorMsg('');
    if (step === 2) {
      if (!customerName.trim() || !phone.trim() || !location.trim()) {
        setErrorMsg('Please enter your full name, phone number, and location / neighborhood.');
        return;
      }
    }
    setStep(step + 1);
  };

  const handleFinalSubmit = async () => {
    setErrorMsg('');
    setSubmitting(true);
    try {
      const payload = {
        customerName,
        phone,
        email,
        serviceId,
        serviceName: currentService.name,
        bedrooms,
        bathrooms,
        frequency,
        addons: selectedAddons,
        city,
        location,
        gpsAddress,
        date,
        timeSlot,
        totalAmount,
        paymentMethod,
        notes
      };

      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (data.success) {
        setBookingSuccess(data.booking);
        try {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
          });
        } catch (e) {
          // confetti fallback
        }
      } else {
        setErrorMsg(data.message || 'Error booking appointment.');
      }
    } catch (err) {
      setErrorMsg('Failed to connect to server. Please try again or WhatsApp us.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        
        {/* Modal Header */}
        <div style={{
          padding: '1.25rem 1.75rem',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'var(--bg-surface)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff'
            }}>
              <Sparkles size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800' }}>
                {bookingSuccess ? 'Booking Confirmed!' : 'Book Cleaning Service'}
              </h3>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                {bookingSuccess ? 'Ghana Booking Reference Generated' : `Step ${step} of 4 • Guaranteed 5-Star Clean`}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'var(--bg-surface-elevated)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-secondary)'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '1.75rem' }}>
          
          {/* SUCCESS SCREEN */}
          {bookingSuccess ? (
            <div style={{ textAlign: 'center', padding: '1rem 0' }}>
              <div style={{
                width: '70px',
                height: '70px',
                borderRadius: '50%',
                background: 'var(--primary-subtle)',
                color: 'var(--primary-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem auto'
              }}>
                <Check size={36} />
              </div>

              <span className="badge-emerald" style={{ marginBottom: '0.75rem' }}>
                Order Received Successfully
              </span>
              <h2 style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '0.5rem' }}>
                Akwaaba, {bookingSuccess.customerName}!
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '480px', margin: '0 auto 1.5rem auto' }}>
                Your booking has been scheduled. Our team coordinator will confirm arrival 30 minutes prior to your time slot.
              </p>

              {/* Reference Card */}
              <div style={{
                background: 'var(--bg-primary)',
                border: '2px dashed var(--border-primary)',
                borderRadius: 'var(--radius-md)',
                padding: '1.5rem',
                maxWidth: '480px',
                margin: '0 auto 2rem auto',
                textAlign: 'left'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-subtle)' }}>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Tracking Code:</span>
                  <strong style={{ fontSize: '1.1rem', color: 'var(--primary-light)' }}>{bookingSuccess.id}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.85rem' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Service:</span>
                  <strong>{bookingSuccess.serviceName}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.85rem' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Date & Time:</span>
                  <strong>{bookingSuccess.date} at {bookingSuccess.timeSlot}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.85rem' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Location:</span>
                  <strong>{bookingSuccess.location} ({bookingSuccess.city})</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle)', fontSize: '1rem' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Total Amount:</span>
                  <strong style={{ color: 'var(--primary-light)' }}>{formatGHS(bookingSuccess.totalAmount)}</strong>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <a
                  href={getWhatsAppLink(`Hello AuraClean Ghana, I just made booking ${bookingSuccess.id} for ${bookingSuccess.serviceName} on ${bookingSuccess.date}. Please confirm dispatch.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp"
                >
                  <MessageSquare size={16} />
                  <span>Send Confirmation on WhatsApp</span>
                </a>
                <button
                  onClick={onClose}
                  className="btn btn-secondary"
                >
                  Close & Done
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Step Progress Bar */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', position: 'relative' }}>
                {['Service', 'Location', 'Schedule', 'Payment'].map((label, idx) => {
                  const stepNum = idx + 1;
                  const isActive = step === stepNum;
                  const isDone = step > stepNum;
                  return (
                    <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2 }}>
                      <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: isDone ? 'var(--primary)' : isActive ? 'var(--primary-light)' : 'var(--bg-surface-elevated)',
                        color: isDone || isActive ? '#ffffff' : 'var(--text-muted)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: '700',
                        fontSize: '0.85rem',
                        border: `2px solid ${isActive || isDone ? 'var(--primary-light)' : 'var(--border-subtle)'}`,
                        boxShadow: isActive ? '0 0 12px var(--primary-glow)' : 'none'
                      }}>
                        {isDone ? <Check size={16} /> : stepNum}
                      </div>
                      <span style={{ fontSize: '0.75rem', fontWeight: isActive ? '700' : '500', color: isActive ? 'var(--primary-light)' : 'var(--text-muted)', marginTop: '0.3rem' }}>
                        {label}
                      </span>
                    </div>
                  );
                })}
              </div>

              {errorMsg && (
                <div style={{
                  padding: '0.75rem 1rem',
                  background: '#fef2f2',
                  border: '1px solid #fecaca',
                  color: '#991b1b',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '1.25rem'
                }}>
                  <AlertCircle size={16} />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* STEP 1: SERVICE DETAILS */}
              {step === 1 && (
                <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.4rem' }}>
                      Cleaning Package:
                    </label>
                    <select
                      value={serviceId}
                      onChange={(e) => setServiceId(e.target.value)}
                      style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', background: 'var(--bg-primary)', color: 'var(--text-primary)', fontWeight: '600' }}
                    >
                      {SERVICES_DATA.map(s => (
                        <option key={s.id} value={s.id}>{s.name} - from {formatGHS(s.basePrice)}</option>
                      ))}
                    </select>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.4rem' }}>
                        Bedrooms: {bedrooms}
                      </label>
                      <input
                        type="range"
                        min="1"
                        max="6"
                        value={bedrooms}
                        onChange={(e) => setBedrooms(Number(e.target.value))}
                        style={{ width: '100%', accentColor: 'var(--primary-light)' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.4rem' }}>
                        Bathrooms: {bathrooms}
                      </label>
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

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.4rem' }}>
                      Add-on Services:
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '0.5rem' }}>
                      {ADDONS_DATA.map(a => {
                        const isChecked = selectedAddons.includes(a.name) || selectedAddons.includes(a.id);
                        return (
                          <div
                            key={a.id}
                            onClick={() => toggleAddon(a.name)}
                            style={{
                              padding: '0.55rem 0.75rem',
                              borderRadius: 'var(--radius-sm)',
                              border: `1px solid ${isChecked ? 'var(--primary-light)' : 'var(--border-subtle)'}`,
                              background: isChecked ? 'var(--primary-subtle)' : 'var(--bg-primary)',
                              fontSize: '0.78rem',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between'
                            }}
                          >
                            <span>{a.name}</span>
                            <strong style={{ color: 'var(--primary-light)' }}>+{formatGHS(a.price)}</strong>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.4rem' }}>
                      Frequency:
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                      {[
                        { id: 'one-time', title: 'One-Time' },
                        { id: 'bi-weekly', title: 'Bi-Weekly (15% Off)' },
                        { id: 'weekly', title: 'Weekly (20% Off)' }
                      ].map(f => (
                        <button
                          key={f.id}
                          type="button"
                          onClick={() => setFrequency(f.id)}
                          style={{
                            padding: '0.6rem',
                            borderRadius: 'var(--radius-sm)',
                            border: `1px solid ${frequency === f.id ? 'var(--accent-gold)' : 'var(--border-subtle)'}`,
                            background: frequency === f.id ? 'var(--accent-gold-subtle)' : 'var(--bg-primary)',
                            color: frequency === f.id ? 'var(--accent-gold-dark)' : 'var(--text-secondary)',
                            fontSize: '0.75rem',
                            fontWeight: '600'
                          }}
                        >
                          {f.title}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: GHANA LOCATION & CONTACT */}
              {step === 2 && (
                <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.4rem' }}>
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="e.g. Kwame Mensah"
                        style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.4rem' }}>
                        Ghana Phone Number (MoMo / Calls) *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. 055 010 3277"
                        style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.4rem' }}>
                        Region / City
                      </label>
                      <select
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
                      >
                        <option value="Accra">Greater Accra</option>
                        <option value="Tema">Tema Municipality</option>
                        <option value="Kumasi">Kumasi (Ashanti)</option>
                        <option value="Takoradi">Takoradi (Western)</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.4rem' }}>
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="kwame@example.com"
                        style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.4rem' }}>
                      Specific Neighborhood, Street or Landmark *
                    </label>
                    <input
                      type="text"
                      required
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. East Legon, near American House, House #4"
                      style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.4rem' }}>
                      GhanaPost Digital GPS Address (Optional)
                    </label>
                    <input
                      type="text"
                      value={gpsAddress}
                      onChange={(e) => setGpsAddress(e.target.value)}
                      placeholder="e.g. GA-342-9901"
                      style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
                    />
                  </div>
                </div>
              )}

              {/* STEP 3: SCHEDULE */}
              {step === 3 && (
                <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.4rem' }}>
                        Preferred Date *
                      </label>
                      <input
                        type="date"
                        required
                        value={date}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={(e) => setDate(e.target.value)}
                        style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.4rem' }}>
                        Arrival Time Slot *
                      </label>
                      <select
                        value={timeSlot}
                        onChange={(e) => setTimeSlot(e.target.value)}
                        style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
                      >
                        {TIME_SLOTS.map(slot => (
                          <option key={slot} value={slot}>{slot}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.4rem' }}>
                      Special Entry or Gate Instructions (Optional)
                    </label>
                    <textarea
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="e.g. Please call 10 mins ahead, keys with security at the main gate, focus on master bathroom scale..."
                      style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
                    />
                  </div>

                  <div style={{
                    padding: '1rem',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--primary-subtle)',
                    border: '1px solid var(--border-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    fontSize: '0.85rem',
                    color: 'var(--primary-light)'
                  }}>
                    <ShieldCheck size={20} />
                    <span>A dedicated supervisor and vetted cleaning team will arrive in uniform with full equipment.</span>
                  </div>
                </div>
              )}

              {/* STEP 4: PAYMENT PREFERENCE */}
              {step === 4 && (
                <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '700' }}>
                    Choose Preferred Payment Method:
                  </label>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
                    {[
                      { id: 'mtn_momo', name: 'MTN Mobile Money (MoMo)', sub: 'Direct prompt on your phone' },
                      { id: 'telecel_cash', name: 'Telecel Cash', sub: 'Vodafone Cash prompt' },
                      { id: 'pay_after', name: 'Pay On-Site After Clean', sub: 'Cash or MoMo upon inspection' },
                      { id: 'card', name: 'Bank Card / Online', sub: 'Visa & Mastercard' }
                    ].map(p => (
                      <div
                        key={p.id}
                        onClick={() => setPaymentMethod(p.id)}
                        style={{
                          padding: '1rem',
                          borderRadius: 'var(--radius-md)',
                          border: `2px solid ${paymentMethod === p.id ? 'var(--primary-light)' : 'var(--border-subtle)'}`,
                          background: paymentMethod === p.id ? 'var(--primary-subtle)' : 'var(--bg-primary)',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <div style={{ fontWeight: '700', fontSize: '0.88rem', color: 'var(--text-primary)' }}>
                          {p.name}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                          {p.sub}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Summary Box */}
                  <div style={{
                    background: 'var(--bg-primary)',
                    padding: '1.25rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-subtle)'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', marginBottom: '0.4rem' }}>
                      <span>{currentService.name} ({bedrooms} Bed, {bathrooms} Bath):</span>
                      <strong>{formatGHS(basePrice + roomCost)}</strong>
                    </div>
                    {addonsCost > 0 && (
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', marginBottom: '0.4rem' }}>
                        <span>Add-ons:</span>
                        <strong>+{formatGHS(addonsCost)}</strong>
                      </div>
                    )}
                    {discountAmount > 0 && (
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', color: '#16a34a', marginBottom: '0.4rem' }}>
                        <span>Frequency Discount:</span>
                        <strong>-{formatGHS(discountAmount)}</strong>
                      </div>
                    )}
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: '800', paddingTop: '0.75rem', borderTop: '1px dashed var(--border-subtle)' }}>
                      <span>Total Amount Payable:</span>
                      <span style={{ color: 'var(--primary-light)' }}>{formatGHS(totalAmount)}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Footer */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: '2rem',
                paddingTop: '1.25rem',
                borderTop: '1px solid var(--border-subtle)'
              }}>
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="btn btn-secondary"
                    style={{ padding: '0.65rem 1.25rem' }}
                  >
                    <ArrowLeft size={16} />
                    <span>Back</span>
                  </button>
                ) : (
                  <div></div>
                )}

                {step < 4 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="btn btn-primary"
                    style={{ padding: '0.75rem 1.6rem' }}
                  >
                    <span>Continue</span>
                    <ArrowRight size={16} />
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled={submitting}
                    onClick={handleFinalSubmit}
                    className="btn btn-gold"
                    style={{ padding: '0.85rem 2rem', fontSize: '1rem' }}
                  >
                    <Sparkles size={16} />
                    <span>{submitting ? 'Confirming...' : 'Confirm & Schedule Clean'}</span>
                  </button>
                )}
              </div>
            </>
          )}

        </div>

      </div>
    </div>
  );
}
