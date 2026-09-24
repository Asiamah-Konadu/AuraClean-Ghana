import React from 'react';
import { Hero } from '../components/Hero';
import { StatsBanner } from '../components/StatsBanner';
import { ServicesSection } from '../components/ServicesSection';
import { BeforeAfterSlider } from '../components/BeforeAfterSlider';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { CoverageAreas } from '../components/CoverageAreas';
import { Testimonials } from '../components/Testimonials';
import { FAQSection } from '../components/FAQSection';
import { ArrowRight, Calculator, Sparkles, MessageSquare, PhoneCall } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DISPLAY_PHONE, getWhatsAppLink } from '../utils/formatters';

export function HomePage({ onOpenBooking, onSelectService }) {
  return (
    <div className="animate-fade-in">
      {/* 1. Animated Luxury Hero Section */}
      <Hero onOpenBooking={onOpenBooking} />

      {/* 2. Stats & Credibility Banner */}
      <StatsBanner />

      {/* 3. Featured Services Section */}
      <div style={{ position: 'relative' }}>
        <ServicesSection onSelectService={onSelectService} />
        
        {/* Link to Full Services Catalog */}
        <div style={{ textAlign: 'center', paddingBottom: '3rem', background: 'var(--bg-primary)' }}>
          <Link
            to="/services"
            className="btn btn-secondary"
            style={{ padding: '0.85rem 2rem', fontSize: '0.98rem' }}
          >
            <span>View Complete Service Specifications</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* 4. Instant Estimator CTA Banner (Replacing the bulky embedded calculator with a sleek CTA leading to the dedicated page) */}
      <section style={{
        padding: '3.5rem 0',
        background: 'linear-gradient(135deg, rgba(5, 150, 105, 0.08) 0%, rgba(245, 158, 11, 0.08) 100%)',
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="container">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '2rem'
          }}>
            <div style={{ maxWidth: '640px' }}>
              <div className="badge-gold" style={{ marginBottom: '0.6rem' }}>
                <Calculator size={14} /> Instant Ghana Cedi Pricing
              </div>
              <h3 style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.1rem)', fontWeight: '800', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                Calculate Your Exact Cleaning Cost in Seconds
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.5 }}>
                Select your room numbers, deep-clean add-ons (oven, windows, poly-tank), and schedule frequency for a transparent, zero-obligation quote.
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <Link
                to="/calculator"
                className="btn btn-primary shimmer-btn"
                style={{ padding: '0.9rem 1.8rem', fontSize: '1rem' }}
              >
                <Calculator size={18} />
                <span>Open Price Calculator</span>
                <ArrowRight size={18} />
              </Link>
              
              <button
                onClick={() => onOpenBooking()}
                className="btn btn-secondary"
                style={{ padding: '0.9rem 1.5rem', fontSize: '1rem' }}
              >
                <span>Direct Booking</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Before & After Transformation Slider */}
      <BeforeAfterSlider />

      {/* 6. Why Choose Us (Ghana Security & Standards) */}
      <WhyChooseUs onOpenBooking={onOpenBooking} />

      {/* 7. Coverage Areas & Dispatch Hubs */}
      <CoverageAreas onSelectLocation={onOpenBooking} />

      {/* 8. Testimonials & Google Ratings */}
      <Testimonials />

      {/* 9. FAQ Section */}
      <FAQSection />

      {/* 10. Direct Hotline & Emergency Dispatch Callout */}
      <section style={{
        padding: '4.5rem 0',
        background: 'linear-gradient(135deg, #064e3b 0%, #059669 50%, #047857 100%)',
        color: '#ffffff',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: '780px', margin: '0 auto' }}>
          <div className="badge-gold" style={{ background: 'rgba(254, 240, 138, 0.2)', color: '#fef08a', borderColor: '#fef08a', marginBottom: '1rem' }}>
            <Sparkles size={14} /> Immediate Dispatch Service
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: '800', marginBottom: '1.25rem', color: '#ffffff' }}>
            Ready for a Spotless Home or Office Today?
          </h2>
          <p style={{ fontSize: '1.1rem', color: '#d1fae5', lineHeight: 1.6, marginBottom: '2.5rem' }}>
            Book online in 60 seconds with no upfront card charge, or chat directly with our Ghana operations coordinator on WhatsApp.
          </p>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => onOpenBooking()}
              className="btn shimmer-btn"
              style={{ background: '#ffffff', color: '#064e3b', fontWeight: '800', padding: '1rem 2.25rem', fontSize: '1.05rem', boxShadow: '0 8px 25px rgba(0,0,0,0.25)' }}
            >
              <Sparkles size={18} />
              <span>Book Instant Clean</span>
            </button>

            <a
              href={getWhatsAppLink('Hello AuraClean Ghana! I would like to book a cleaning now.')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp"
              style={{ padding: '1rem 2rem', fontSize: '1.05rem' }}
            >
              <MessageSquare size={18} />
              <span>WhatsApp: {DISPLAY_PHONE}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
