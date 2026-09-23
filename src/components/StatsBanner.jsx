import React from 'react';
import { Home, Users, Award, ShieldCheck, MapPin, Sparkles } from 'lucide-react';

export function StatsBanner() {
  const stats = [
    {
      icon: Home,
      value: '1,850+',
      label: 'Homes & Offices Cleaned',
      detail: 'Across Accra, Tema & Kumasi'
    },
    {
      icon: Users,
      value: '100%',
      label: 'Vetted & Insured Staff',
      detail: 'Full Ghana Police CID clearance'
    },
    {
      icon: Award,
      value: '4.98★',
      label: 'Customer Satisfaction',
      detail: 'Over 620+ 5-Star reviews'
    },
    {
      icon: ShieldCheck,
      value: '24-Hour',
      label: 'Re-Clean Guarantee',
      detail: 'Not satisfied? We return free'
    }
  ];

  return (
    <section style={{
      padding: '2.5rem 0',
      background: 'var(--bg-surface)',
      borderTop: '1px solid var(--border-subtle)',
      borderBottom: '1px solid var(--border-subtle)',
      position: 'relative'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
          gap: '1.75rem'
        }}>
          {stats.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.15rem',
                  padding: '1rem',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-surface-elevated)',
                  border: '1px solid var(--border-subtle)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                }}
              >
                <div style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '14px',
                  background: 'var(--primary-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--primary-light)',
                  flexShrink: 0
                }}>
                  <Icon size={26} />
                </div>
                <div>
                  <div style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--text-primary)', lineHeight: 1.1 }}>
                    {item.value}
                  </div>
                  <div style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--text-secondary)' }}>
                    {item.label}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {item.detail}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
