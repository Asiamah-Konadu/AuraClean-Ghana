import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StatsBanner } from './components/StatsBanner';
import { ServicesSection } from './components/ServicesSection';
import { PricingCalculator } from './components/PricingCalculator';
import { BeforeAfterSlider } from './components/BeforeAfterSlider';
import { WhyChooseUs } from './components/WhyChooseUs';
import { CoverageAreas } from './components/CoverageAreas';
import { Testimonials } from './components/Testimonials';
import { FAQSection } from './components/FAQSection';
import { BookingModal } from './components/BookingModal';
import { TrackingModal } from './components/TrackingModal';
import { AdminDashboard } from './components/AdminDashboard';
import { WhatsAppButton } from './components/WhatsAppButton';
import { Footer } from './components/Footer';

export function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [bookingConfig, setBookingConfig] = useState(null);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, [darkMode]);

  const handleOpenBooking = (serviceId = 'deep-clean', bedrooms = 2, frequency = 'one-time', addons = []) => {
    setBookingConfig({
      serviceId,
      bedrooms,
      frequency,
      addons
    });
    setIsBookingOpen(true);
  };

  const handleBookWithConfig = (config) => {
    setBookingConfig(config);
    setIsBookingOpen(true);
  };

  return (
    <div className="app-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Sticky Navbar */}
      <Navbar
        onOpenBooking={() => handleOpenBooking()}
        onOpenTracking={() => setIsTrackingOpen(true)}
        onToggleAdmin={() => setIsAdminMode(!isAdminMode)}
        isAdminMode={isAdminMode}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      {/* Main View: Either Admin Back-Office or Customer Website */}
      {isAdminMode ? (
        <AdminDashboard onClose={() => setIsAdminMode(false)} />
      ) : (
        <main>
          {/* 1. Hero Section */}
          <Hero onOpenBooking={handleOpenBooking} />

          {/* 2. Stats and Credibility Banner */}
          <StatsBanner />

          {/* 3. Comprehensive Services Grid */}
          <ServicesSection onSelectService={(serviceId) => handleOpenBooking(serviceId)} />

          {/* 4. Interactive Live Price Calculator */}
          <PricingCalculator onBookWithConfig={handleBookWithConfig} />

          {/* 5. Before & After Transformation Slider */}
          <BeforeAfterSlider />

          {/* 6. Why Choose Us (Ghana Security & Standards) */}
          <WhyChooseUs onOpenBooking={() => handleOpenBooking()} />

          {/* 7. Coverage Areas & Dispatch Hubs */}
          <CoverageAreas onSelectLocation={() => handleOpenBooking()} />

          {/* 8. Testimonials & Google Ratings */}
          <Testimonials />

          {/* 9. FAQ Section */}
          <FAQSection />

          {/* 10. Footer */}
          <Footer
            onOpenBooking={() => handleOpenBooking()}
            onOpenTracking={() => setIsTrackingOpen(true)}
          />
        </main>
      )}

      {/* Interactive Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialConfig={bookingConfig}
      />

      {/* Interactive Live Tracking Modal */}
      <TrackingModal
        isOpen={isTrackingOpen}
        onClose={() => setIsTrackingOpen(false)}
      />

      {/* Floating WhatsApp Quick Connect Button */}
      <WhatsAppButton />
    </div>
  );
}

export default App;
