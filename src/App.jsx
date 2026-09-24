import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { TrackingModal } from './components/TrackingModal';
import { WhatsAppButton } from './components/WhatsAppButton';

// Pages
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { EstimatorPage } from './pages/EstimatorPage';
import { TransformationsPage } from './pages/TransformationsPage';
import { LocationsPage } from './pages/LocationsPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { AdminPage } from './pages/AdminPage';

// Scroll to top helper on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Inner App with Layout Wrapper
function MainLayout({ darkMode, setDarkMode }) {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [bookingConfig, setBookingConfig] = useState(null);
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith('/admin');

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
      <ScrollToTop />

      {/* Customer Header only on customer facing pages */}
      {!isAdminRoute && (
        <Navbar
          onOpenBooking={() => handleOpenBooking()}
          onOpenTracking={() => setIsTrackingOpen(true)}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />
      )}

      {/* Main Routed Content */}
      <main style={{ flexGrow: 1 }}>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                onOpenBooking={handleOpenBooking}
                onSelectService={(svcId) => handleOpenBooking(svcId)}
              />
            }
          />
          <Route
            path="/services"
            element={
              <ServicesPage
                onSelectService={(svcId) => handleOpenBooking(svcId)}
              />
            }
          />
          <Route
            path="/calculator"
            element={
              <EstimatorPage
                onBookWithConfig={handleBookWithConfig}
              />
            }
          />
          <Route
            path="/estimator"
            element={
              <EstimatorPage
                onBookWithConfig={handleBookWithConfig}
              />
            }
          />
          <Route
            path="/transformations"
            element={
              <TransformationsPage
                onOpenBooking={() => handleOpenBooking()}
              />
            }
          />
          <Route
            path="/locations"
            element={
              <LocationsPage
                onOpenBooking={(loc) => handleOpenBooking()}
              />
            }
          />
          <Route
            path="/about"
            element={
              <AboutPage
                onOpenBooking={() => handleOpenBooking()}
              />
            }
          />
          <Route
            path="/contact"
            element={
              <ContactPage
                onOpenBooking={() => handleOpenBooking()}
              />
            }
          />
          <Route
            path="/admin"
            element={<AdminPage />}
          />
        </Routes>
      </main>

      {/* Customer Footer only on customer facing pages */}
      {!isAdminRoute && (
        <Footer
          onOpenBooking={() => handleOpenBooking()}
          onOpenTracking={() => setIsTrackingOpen(true)}
        />
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
      {!isAdminRoute && <WhatsAppButton />}
    </div>
  );
}

export function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, [darkMode]);

  return (
    <BrowserRouter>
      <MainLayout darkMode={darkMode} setDarkMode={setDarkMode} />
    </BrowserRouter>
  );
}

export default App;
