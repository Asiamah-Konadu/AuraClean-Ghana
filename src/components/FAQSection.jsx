import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: 'Do I need to provide any cleaning supplies or equipment?',
      a: 'Not at all! AuraClean brings 100% of our own equipment—including heavy-duty wet/dry vacuums, industrial steam extractors, microfiber cloths, extension poles, and hospital-grade eco-friendly cleaning detergents. If you have a specific specialty polish you prefer, our team is happy to use it.'
    },
    {
      q: 'How does payment work with MTN MoMo, Telecel Cash, or Card?',
      a: 'We offer maximum flexibility. You can pay securely online or via MoMo transfer upon job completion once our supervisor conducts the final inspection with you.'
    },
    {
      q: 'Are your cleaners background-checked and trustworthy in my home?',
      a: 'Yes, absolutely. Every AuraClean squad member undergoes a rigorous vetting process involving Ghana Police CID criminal background checks, permanent address verification, and continuous hospitality training.'
    },
    {
      q: 'Do I have to be present while the team is cleaning?',
      a: 'No, you do not need to be home. Many of our clients in East Legon, Cantonments, and Airport Residential leave keys with their estate security, front desk, or lockboxes. You will receive live status updates and photo confirmations upon completion.'
    },
    {
      q: 'What is your 24-Hour Satisfaction Guarantee?',
      a: 'Your peace of mind is our utmost priority. If you notice any area or fixture that does not meet our standard, message us on WhatsApp or call 055 010 3277 within 24 hours, and our squad will return to re-clean that specific area completely free of charge.'
    },
    {
      q: 'Which cities and regions in Ghana do you currently service?',
      a: 'We have full mobile squad coverage across Greater Accra (East Legon, Cantonments, Airport Res, Spintex, Tema, Osu, Dansoman, Madina, etc.), the Ashanti Region (Kumasi Ahodwo, Nhyiaeso, KNUST), and the Western Region (Takoradi & Sekondi).'
    }
  ];

  return (
    <section style={{ padding: '6rem 0', background: 'var(--bg-primary)', position: 'relative' }}>
      <div className="container" style={{ maxWidth: '850px' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span className="badge-emerald" style={{ marginBottom: '0.75rem' }}>
            <HelpCircle size={14} /> Clear Answers
          </span>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', fontWeight: '800', letterSpacing: '-0.02em' }}>
            Frequently Asked Questions
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', marginTop: '0.5rem' }}>
            Everything you need to know about booking with AuraClean Ghana.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="glass-panel"
                style={{
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-surface)',
                  border: `1px solid ${isOpen ? 'var(--primary-light)' : 'var(--border-subtle)'}`,
                  overflow: 'hidden',
                  transition: 'all 0.2s ease'
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                  style={{
                    width: '100%',
                    padding: '1.25rem 1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    textAlign: 'left',
                    fontWeight: '700',
                    fontSize: '1.02rem',
                    color: 'var(--text-primary)',
                    gap: '1rem'
                  }}
                >
                  <span>{faq.q}</span>
                  <span style={{ color: isOpen ? 'var(--primary-light)' : 'var(--text-muted)' }}>
                    {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </span>
                </button>

                {isOpen && (
                  <div style={{
                    padding: '0 1.5rem 1.25rem 1.5rem',
                    color: 'var(--text-secondary)',
                    fontSize: '0.92rem',
                    lineHeight: 1.6,
                    borderTop: '1px solid var(--border-subtle)',
                    paddingTop: '1rem'
                  }}>
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
