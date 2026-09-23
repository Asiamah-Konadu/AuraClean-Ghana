import React, { useState } from 'react';
import { MessageSquare, X, Sparkles } from 'lucide-react';
import { DISPLAY_PHONE, getWhatsAppLink } from '../utils/formatters';

export function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div style={{
      position: 'fixed',
      bottom: '1.75rem',
      right: '1.75rem',
      zIndex: 999,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      gap: '0.65rem'
    }}>
      {/* Floating Mini Prompt */}
      {showTooltip && (
        <div className="animate-fade-in" style={{
          background: 'var(--bg-surface)',
          padding: '0.75rem 1rem',
          borderRadius: 'var(--radius-md)',
          boxShadow: 'var(--shadow-lg)',
          border: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          maxWidth: '260px'
        }}>
          <div>
            <div style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <span className="pulse-dot"></span> Dispatch Live
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.15rem' }}>
              Chat with our team directly on WhatsApp for instant booking.
            </div>
          </div>
          <button
            onClick={() => setShowTooltip(false)}
            style={{ color: 'var(--text-muted)', cursor: 'pointer' }}
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* WhatsApp Button */}
      <a
        href={getWhatsAppLink('Hello AuraClean Ghana! I would like to inquire about booking a cleaning squad.')}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          width: '58px',
          height: '58px',
          borderRadius: '50%',
          background: '#25D366',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 25px rgba(37, 211, 102, 0.45)',
          transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
          e.currentTarget.style.boxShadow = '0 12px 30px rgba(37, 211, 102, 0.6)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 8px 25px rgba(37, 211, 102, 0.45)';
        }}
        title={`Chat with AuraClean on WhatsApp (${DISPLAY_PHONE})`}
      >
        <MessageSquare size={30} />
      </a>
    </div>
  );
}
