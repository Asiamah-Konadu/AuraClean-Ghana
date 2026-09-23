import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_PATH = path.join(__dirname, 'data', 'db.json');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Helper to read DB
const readDB = () => {
  try {
    const data = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading DB:', err);
    return { services: [], addons: [], bookings: [], reviews: [], coverageAreas: [], inquiries: [] };
  }
};

// Helper to write DB
const writeDB = (data) => {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error writing DB:', err);
    return false;
  }
};

// Generate Unique Ghana Booking Tracking Code: AC-GH-XXXX
const generateBookingId = () => {
  const randNum = Math.floor(1000 + Math.random() * 9000);
  return `AC-GH-${randNum}`;
};

// GET /api/services
app.get('/api/services', (req, res) => {
  const db = readDB();
  res.json({
    success: true,
    services: db.services || [],
    addons: db.addons || []
  });
});

// GET /api/coverage
app.get('/api/coverage', (req, res) => {
  const db = readDB();
  res.json({
    success: true,
    coverageAreas: db.coverageAreas || []
  });
});

// GET /api/bookings
app.get('/api/bookings', (req, res) => {
  const db = readDB();
  const { status, city, search } = req.query;
  let bookings = db.bookings || [];

  if (status && status !== 'all') {
    bookings = bookings.filter(b => b.status.toLowerCase() === status.toLowerCase());
  }

  if (city && city !== 'all') {
    bookings = bookings.filter(b => b.city.toLowerCase() === city.toLowerCase());
  }

  if (search) {
    const query = search.toLowerCase();
    bookings = bookings.filter(b => 
      b.id.toLowerCase().includes(query) ||
      b.customerName.toLowerCase().includes(query) ||
      b.phone.includes(query) ||
      b.location.toLowerCase().includes(query)
    );
  }

  // Sort newest first
  bookings.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  res.json({
    success: true,
    count: bookings.length,
    bookings
  });
});

// GET /api/bookings/:id or track code
app.get('/api/bookings/track/:code', (req, res) => {
  const db = readDB();
  const queryCode = req.params.code.trim().toUpperCase();
  const phoneQuery = req.params.code.trim();

  const booking = db.bookings.find(b => 
    b.id.toUpperCase() === queryCode || 
    b.phone.replace(/[^0-9]/g, '') === phoneQuery.replace(/[^0-9]/g, '')
  );

  if (!booking) {
    return res.status(404).json({
      success: false,
      message: `No booking found matching code or phone: "${req.params.code}". Please check your Ghana Booking ID (e.g. AC-GH-1092) or contact us on WhatsApp.`
    });
  }

  res.json({
    success: true,
    booking
  });
});

// POST /api/quotes/calculate - Instant dynamic quote calculation
app.post('/api/quotes/calculate', (req, res) => {
  const { serviceId, bedrooms = 1, bathrooms = 1, frequency = 'one-time', addons = [] } = req.body;
  const db = readDB();

  const service = db.services.find(s => s.id === serviceId) || db.services[0];
  const basePrice = service ? service.basePrice : 250;

  // Pricing formula
  let roomMultiplier = 1;
  const extraBedrooms = Math.max(0, bedrooms - 1);
  const extraBathrooms = Math.max(0, bathrooms - 1);
  const roomCost = (extraBedrooms * 60) + (extraBathrooms * 40);

  // Addons cost
  let addonsCost = 0;
  if (Array.isArray(addons)) {
    addons.forEach(addonName => {
      const found = db.addons.find(a => a.name === addonName || a.id === addonName);
      if (found) addonsCost += found.price;
    });
  }

  let subtotal = basePrice + roomCost + addonsCost;
  let discountPercentage = 0;

  if (frequency === 'weekly') discountPercentage = 0.20; // 20% off
  else if (frequency === 'bi-weekly') discountPercentage = 0.15; // 15% off
  else if (frequency === 'monthly') discountPercentage = 0.10; // 10% off

  const discountAmount = Math.round(subtotal * discountPercentage);
  const total = Math.max(100, subtotal - discountAmount);

  res.json({
    success: true,
    breakdown: {
      serviceName: service ? service.name : 'Custom Clean',
      basePrice,
      roomCost,
      addonsCost,
      subtotal,
      discountPercentage: discountPercentage * 100,
      discountAmount,
      total,
      currency: 'GH₵'
    }
  });
});

// POST /api/bookings - Create new booking
app.post('/api/bookings', (req, res) => {
  const {
    customerName,
    phone,
    email,
    serviceId,
    serviceName,
    bedrooms = 2,
    bathrooms = 2,
    frequency = 'one-time',
    addons = [],
    city = 'Accra',
    location,
    gpsAddress = '',
    date,
    timeSlot,
    totalAmount,
    paymentMethod = 'mtn_momo',
    notes = ''
  } = req.body;

  if (!customerName || !phone || !location || !date || !timeSlot) {
    return res.status(400).json({
      success: false,
      message: 'Please provide all required fields: Name, Phone, Location, Date, and Time Slot.'
    });
  }

  const db = readDB();
  const newId = generateBookingId();
  
  // Default cleaner assignment based on city
  let defaultCleaner = 'Team Emerald (Lead: Sarah Addo)';
  if (city.toLowerCase().includes('kumasi')) {
    defaultCleaner = 'Team Ashanti (Lead: Rita Asare)';
  } else if (city.toLowerCase().includes('takoradi')) {
    defaultCleaner = 'Team Western (Lead: Jonathan Mensah)';
  }

  const newBooking = {
    id: newId,
    customerName,
    phone,
    email: email || 'not_provided@auraclean.gh',
    serviceId: serviceId || 'deep-clean',
    serviceName: serviceName || 'Luxury Deep Cleaning',
    bedrooms: Number(bedrooms),
    bathrooms: Number(bathrooms),
    frequency,
    addons: Array.isArray(addons) ? addons : [],
    city,
    location,
    gpsAddress,
    date,
    timeSlot,
    totalAmount: Number(totalAmount) || 450,
    paymentMethod,
    paymentStatus: paymentMethod === 'pay_after' ? 'Pending On-Site Payment' : 'Confirmed (Mobile Money)',
    status: 'Confirmed',
    cleanerAssigned: defaultCleaner,
    notes,
    createdAt: new Date().toISOString()
  };

  db.bookings.unshift(newBooking);
  writeDB(db);

  res.status(201).json({
    success: true,
    message: `Booking successfully created! Your Ghana tracking reference is ${newId}`,
    booking: newBooking
  });
});

// PATCH /api/bookings/:id/status - Admin update
app.patch('/api/bookings/:id/status', (req, res) => {
  const { id } = req.params;
  const { status, cleanerAssigned, paymentStatus } = req.body;

  const db = readDB();
  const bookingIndex = db.bookings.findIndex(b => b.id.toUpperCase() === id.toUpperCase());

  if (bookingIndex === -1) {
    return res.status(404).json({ success: false, message: 'Booking not found.' });
  }

  if (status) db.bookings[bookingIndex].status = status;
  if (cleanerAssigned) db.bookings[bookingIndex].cleanerAssigned = cleanerAssigned;
  if (paymentStatus) db.bookings[bookingIndex].paymentStatus = paymentStatus;

  writeDB(db);

  res.json({
    success: true,
    message: `Booking ${id} status updated successfully.`,
    booking: db.bookings[bookingIndex]
  });
});

// DELETE /api/bookings/:id
app.delete('/api/bookings/:id', (req, res) => {
  const { id } = req.params;
  const db = readDB();
  const initialLength = db.bookings.length;
  db.bookings = db.bookings.filter(b => b.id.toUpperCase() !== id.toUpperCase());

  if (db.bookings.length === initialLength) {
    return res.status(404).json({ success: false, message: 'Booking not found.' });
  }

  writeDB(db);
  res.json({ success: true, message: `Booking ${id} deleted.` });
});

// GET /api/reviews
app.get('/api/reviews', (req, res) => {
  const db = readDB();
  res.json({ success: true, reviews: db.reviews || [] });
});

// POST /api/reviews
app.post('/api/reviews', (req, res) => {
  const { author, location, rating = 5, service, comment } = req.body;
  if (!author || !comment) {
    return res.status(400).json({ success: false, message: 'Author and review comment are required.' });
  }

  const db = readDB();
  const newReview = {
    id: `rev-${Date.now()}`,
    author,
    location: location || 'Accra, Ghana',
    rating: Number(rating) || 5,
    service: service || 'Home Cleaning',
    comment,
    date: 'Just now',
    verified: true
  };

  db.reviews.unshift(newReview);
  writeDB(db);

  res.status(201).json({ success: true, review: newReview });
});

// POST /api/contact - Inquiries
app.post('/api/contact', (req, res) => {
  const { name, phone, email, subject, message } = req.body;
  if (!name || !phone || !message) {
    return res.status(400).json({ success: false, message: 'Name, Phone, and Message are required.' });
  }

  const db = readDB();
  const newInquiry = {
    id: `inq-${Date.now()}`,
    name,
    phone,
    email: email || '',
    subject: subject || 'General Inquiry',
    message,
    date: new Date().toISOString(),
    status: 'New'
  };

  if (!db.inquiries) db.inquiries = [];
  db.inquiries.unshift(newInquiry);
  writeDB(db);

  res.status(201).json({
    success: true,
    message: 'Thank you! Your message has been received. Our team will contact you or reach out via WhatsApp shortly.'
  });
});

// GET /api/stats - Admin Dashboard Statistics
app.get('/api/stats', (req, res) => {
  const db = readDB();
  const bookings = db.bookings || [];

  const totalRevenue = bookings
    .filter(b => b.paymentStatus.toLowerCase().includes('paid') || b.status === 'Completed')
    .reduce((sum, b) => sum + (b.totalAmount || 0), 0);

  const activeCleans = bookings.filter(b => ['Cleaner Dispatched', 'In Progress'].includes(b.status)).length;
  const pendingConfirmation = bookings.filter(b => b.status === 'Pending' || b.status === 'Confirmed').length;
  const completedJobs = bookings.filter(b => b.status === 'Completed').length;

  res.json({
    success: true,
    stats: {
      totalBookings: bookings.length,
      totalRevenueGHS: totalRevenue,
      activeCleans,
      pendingConfirmation,
      completedJobs,
      customerSatisfaction: 99.4,
      availableCleaners: 15,
      activeServiceAreas: 3
    }
  });
});

app.listen(PORT, () => {
  console.log(`🌟 AuraClean Ghana API Backend running on http://localhost:${PORT}`);
});
