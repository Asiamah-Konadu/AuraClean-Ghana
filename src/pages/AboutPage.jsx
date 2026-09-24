import React from 'react';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { Testimonials } from '../components/Testimonials';
import { FAQSection } from '../components/FAQSection';
import { Sparkles, ShieldCheck, Heart, Award, Users, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function AboutPage({ onOpenBooking }) {
  return (
    <div className="animate-fade-in" style={{ padding: '3.5rem 0 6rem 0', background: 'var(--bg-primary)' }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 3.5rem auto' }}>
          <div className="badge-emerald" style={{ marginBottom: '0.85rem' }}>
            <Award size={14} /> The Gold Standard in Hygiene
          </div>
          <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontWeight: '800', letterSpacing: '-0.03em', marginBottom: '1rem' }}>
            Elevating Ghanaian Cleaning into an Art Form
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.6 }}>
            AuraClean Ghana was founded with a singular ambition: to provide Ghana’s luxury residential and corporate sectors with international five-star cleaning reliability, rigorous background security vetting, and hospital-grade eco-disinfection.
          </p>
        </div>

        {/* Why Choose Us Core Pillars */}
        <WhyChooseUs onOpenBooking={onOpenBooking} />

        {/* Core Pillars Grid */}
        <div style={{
          marginTop: '4.5rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem'
        }}>
          <div className="glass-panel" style={{ padding: '2.5rem', background: 'var(--bg-surface)' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'var(--primary-subtle)',
              color: 'var(--primary-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.25rem'
            }}>
              <ShieldCheck size={26} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
              100% CID Background Vetted Staff
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              We understand the sanctity and security of your private home and corporate confidential areas. Every technician undergoes police background screening, biometric Ghana Card verification, and continuous hospitality training.
            </p>
          </div>

          <div className="glass-panel" style={{ padding: '2.5rem', background: 'var(--bg-surface)' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'var(--accent-gold-subtle)',
              color: 'var(--accent-gold-dark)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.25rem'
            }}>
              <Heart size={26} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
              Eco-Safe Hospital Grade Sanitizers
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              We strictly utilize non-toxic, pet-safe, and pediatric-approved formulations that eliminate 99.9% of tropical pathogens, dust mites, mold spores, and allergens without leaving harsh chemical residues or fumes.
            </p>
          </div>

          <div className="glass-panel" style={{ padding: '2.5rem', background: 'var(--bg-surface)' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'var(--primary-subtle)',
              color: 'var(--primary-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.25rem'
            }}>
              <Users size={26} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
              Dedicated Squad Supervisors
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              You don’t have to micro-manage cleaners. Every AuraClean dispatch includes a dedicated Squad Supervisor who rigorously checks off a 48-point quality audit before handing the keys or inspection sheet back to you.
            </p>
          </div>
        </div>

        {/* Testimonials */}
        <div style={{ marginTop: '5rem' }}>
          <Testimonials />
        </div>

        {/* FAQs */}
        <div style={{ marginTop: '2rem' }}>
          <FAQSection />
        </div>

      </div>
    </div>
  );
}
