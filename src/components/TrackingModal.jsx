import React, { useState } from 'react';
import { X, Search, CheckCircle2, Clock, Truck, Sparkles, User, MapPin, Phone, MessageSquare, AlertCircle } from 'lucide-react';
import { formatGHS, DISPLAY_PHONE, getWhatsAppLink } from '../utils/formatters';

export function TrackingModal({ isOpen, onClose }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [booking, setBooking] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSearch = async (e) => {
    e?.preventDefault();
    if (!searchQuery.trim()) return;
    setLoading(true);
    setErrorMsg('');
    setBooking(null);

    try {
      const res = await fetch(`/api/bookings/track/${encodeURIComponent(searchQuery.trim())}`);
      const data = await res.json();
      if (data.success && data.booking) {
        setBooking(data.booking);
      } else {
        setErrorMsg(data.message || 'No booking found. Please check your Ghana Booking ID or phone number.');
      }
    } catch (err) {
      setErrorMsg('Could not connect to tracking server. Please WhatsApp support directly.');
    } finally {
      setLoading(false);
    }
  };

  const getStepStatus = (statusStr) => {
    const s = statusStr?.toLowerCase() || '';
    if (s.includes('completed')) return 4;
    if (s.includes('progress')) return 3;
    if (s.includes('dispatched')) return 2;
    if (s.includes('confirmed') || s.includes('pending')) return 1;
    return 1;
  };

  const currentStep = booking ? getStepStatus(booking.status) : 0;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '680px' }}>
        
        {/* Header */}
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
              background: 'var(--primary-subtle)',
              color: 'var(--primary-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Search size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800' }}>Live Cleaner Dispatch Tracker</h3>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Track real-time squad arrival and cleaning progress
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

        {/* Content */}
        <div style={{ padding: '1.75rem' }}>
          
          {/* Search Input Box */}
          <form onSubmit={handleSearch} style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter Booking Code (e.g. AC-GH-1092) or Phone Number"
              style={{
                flexGrow: 1,
                padding: '0.8rem 1rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-subtle)',
                background: 'var(--bg-primary)',
                color: 'var(--text-primary)',
                fontSize: '0.92rem'
              }}
            />
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
              style={{ padding: '0.8rem 1.4rem' }}
            >
              {loading ? 'Locating...' : 'Track'}
            </button>
          </form>

          {/* Quick Demo Tag */}
          {!booking && !errorMsg && (
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              💡 Try testing with demo tracking code: <strong style={{ color: 'var(--primary-light)', cursor: 'pointer' }} onClick={() => { setSearchQuery('AC-GH-1092'); }}>AC-GH-1092</strong> or <strong style={{ color: 'var(--primary-light)', cursor: 'pointer' }} onClick={() => { setSearchQuery('0550103277'); }}>0550103277</strong>
            </div>
          )}

          {errorMsg && (
            <div style={{
              padding: '1rem',
              background: '#fef2f2',
              border: '1px solid #fecaca',
              color: '#991b1b',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.88rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem'
            }}>
              <AlertCircle size={18} />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Result Card */}
          {booking && (
            <div className="glass-panel animate-fade-in" style={{
              padding: '1.75rem',
              borderRadius: 'var(--radius-lg)',
              background: 'var(--bg-primary)',
              border: '1.5px solid var(--border-primary)'
            }}>
              
              {/* Top Meta */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-subtle)' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Reference ID:</span>
                  <div style={{ fontSize: '1.3rem', fontWeight: '800', color: 'var(--primary-light)' }}>{booking.id}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span className="badge-emerald" style={{ fontSize: '0.85rem' }}>
                    <Sparkles size={14} /> {booking.status}
                  </span>
                </div>
              </div>

              {/* Progress Stepper */}
              <div style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem', position: 'relative' }}>
                  {[
                    { num: 1, label: 'Confirmed', icon: CheckCircle2 },
                    { num: 2, label: 'Dispatched', icon: Truck },
                    { num: 3, label: 'In Progress', icon: Sparkles },
                    { num: 4, label: 'Completed', icon: CheckCircle2 }
                  ].map((stepItem) => {
                    const isPassed = currentStep >= stepItem.num;
                    const isCurrent = currentStep === stepItem.num;
                    const Icon = stepItem.icon;
                    return (
                      <div key={stepItem.num} style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '50%',
                          background: isPassed ? 'var(--primary-light)' : 'var(--bg-surface-elevated)',
                          color: isPassed ? '#ffffff' : 'var(--text-muted)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: `2px solid ${isPassed ? 'var(--primary-light)' : 'var(--border-subtle)'}`,
                          marginBottom: '0.35rem',
                          boxShadow: isCurrent ? '0 0 10px var(--primary-glow)' : 'none'
                        }}>
                          <Icon size={16} />
                        </div>
                        <span style={{ fontSize: '0.72rem', fontWeight: isCurrent ? '800' : '500', color: isPassed ? 'var(--text-primary)' : 'var(--text-muted)' }}>
                          {stepItem.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Booking Details Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem',
                fontSize: '0.88rem',
                marginBottom: '1.5rem',
                background: 'var(--bg-surface)',
                padding: '1.25rem',
                borderRadius: 'var(--radius-md)'
              }}>
                <div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Customer:</div>
                  <strong>{booking.customerName}</strong>
                </div>
                <div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Service:</div>
                  <strong>{booking.serviceName}</strong>
                </div>
                <div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Date & Slot:</div>
                  <strong>{booking.date} ({booking.timeSlot})</strong>
                </div>
                <div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Assigned Cleaner Squad:</div>
                  <strong style={{ color: 'var(--primary-light)' }}>{booking.cleanerAssigned || 'Team Emerald Squad'}</strong>
                </div>
                <div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Address:</div>
                  <strong>{booking.location} ({booking.city})</strong>
                </div>
                <div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Payment Status:</div>
                  <strong style={{ color: '#16a34a' }}>{booking.paymentStatus} ({formatGHS(booking.totalAmount)})</strong>
                </div>
              </div>

              {/* Direct Support Button */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Need to reschedule or speak with supervisor?
                </span>
                <a
                  href={getWhatsAppLink(`Hello AuraClean Ghana, I am tracking my booking ${booking.id}. Please update me on the squad arrival.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp"
                  style={{ padding: '0.6rem 1.2rem', fontSize: '0.85rem' }}
                >
                  <MessageSquare size={15} />
                  <span>WhatsApp Coordinator</span>
                </a>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
