// ============================================================
// AuraClean Ghana — Firestore Service Layer
// Collections: bookings | cleaners | stats
// ============================================================
import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
  runTransaction,
  limit,
} from "firebase/firestore";
import { db } from "./config";

// ─── Collection References ───────────────────────────────────
export const COLLECTIONS = {
  BOOKINGS: "bookings",
  CLEANERS: "cleaners",
  SERVICES: "services",
  SETTINGS: "settings",
};

// ─── Booking ID Generator ─────────────────────────────────────
const generateBookingId = () => {
  const prefix = "AC";
  const year = new Date().getFullYear().toString().slice(-2);
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
  const num = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}${year}-${rand}${num}`;
};

// ═══════════════════════════════════════════════════════════════
//  BOOKINGS
// ═══════════════════════════════════════════════════════════════

/**
 * Create a new booking in Firestore.
 * Returns the created booking document with its generated ID.
 */
export async function createBooking(bookingData) {
  const bookingId = generateBookingId();

  const newBooking = {
    id: bookingId,
    customerName: bookingData.customerName,
    phone: bookingData.phone,
    email: bookingData.email || "",
    serviceId: bookingData.serviceId,
    serviceName: bookingData.serviceName,
    bedrooms: bookingData.bedrooms || 1,
    bathrooms: bookingData.bathrooms || 1,
    frequency: bookingData.frequency || "one-time",
    addons: bookingData.addons || [],
    city: bookingData.city || "Accra",
    location: bookingData.location,
    gpsAddress: bookingData.gpsAddress || "",
    date: bookingData.date,
    timeSlot: bookingData.timeSlot,
    totalAmount: bookingData.totalAmount,
    paymentMethod: bookingData.paymentMethod || "mtn_momo",
    paymentStatus: "Pending Payment",
    notes: bookingData.notes || "",
    status: "Confirmed",
    cleanerAssigned: "",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  // Use the custom ID as the Firestore document ID
  const docRef = doc(db, COLLECTIONS.BOOKINGS, bookingId);
  await runTransaction(db, async (transaction) => {
    transaction.set(docRef, newBooking);
  });

  return { ...newBooking, id: bookingId };
}

/**
 * Fetch all bookings, with optional filters.
 * @param {string} statusFilter  - "all" | "Confirmed" | "In Progress" | etc.
 * @param {string} cityFilter    - "all" | "Accra" | "Tema" | etc.
 * @param {string} searchQuery   - free text against name / phone / id
 */
export async function fetchBookings(statusFilter = "all", cityFilter = "all", searchQuery = "") {
  const ref = collection(db, COLLECTIONS.BOOKINGS);

  let constraints = [orderBy("createdAt", "desc")];

  if (statusFilter !== "all") {
    constraints = [where("status", "==", statusFilter), orderBy("createdAt", "desc")];
  }

  if (cityFilter !== "all") {
    constraints = [where("city", "==", cityFilter), orderBy("createdAt", "desc")];
  }

  if (statusFilter !== "all" && cityFilter !== "all") {
    constraints = [
      where("status", "==", statusFilter),
      where("city", "==", cityFilter),
      orderBy("createdAt", "desc"),
    ];
  }

  const q = query(ref, ...constraints);
  const snapshot = await getDocs(q);

  let bookings = snapshot.docs.map((d) => ({ ...d.data(), docId: d.id }));

  // Client-side search filter
  if (searchQuery.trim()) {
    const lower = searchQuery.toLowerCase();
    bookings = bookings.filter(
      (b) =>
        b.id?.toLowerCase().includes(lower) ||
        b.customerName?.toLowerCase().includes(lower) ||
        b.phone?.toLowerCase().includes(lower) ||
        b.city?.toLowerCase().includes(lower) ||
        b.location?.toLowerCase().includes(lower)
    );
  }

  return bookings;
}

/**
 * Get a single booking by its custom ID (e.g. "AC26-XY1234").
 */
export async function getBookingById(bookingId) {
  const docRef = doc(db, COLLECTIONS.BOOKINGS, bookingId);
  const snap = await getDoc(docRef);
  if (!snap.exists()) return null;
  return { ...snap.data(), docId: snap.id };
}

/**
 * Update booking status and optionally the assigned cleaner.
 */
export async function updateBookingStatus(bookingId, newStatus, cleanerAssigned = null) {
  const docRef = doc(db, COLLECTIONS.BOOKINGS, bookingId);
  const updates = {
    status: newStatus,
    updatedAt: serverTimestamp(),
  };
  if (cleanerAssigned !== null) {
    updates.cleanerAssigned = cleanerAssigned;
  }
  await updateDoc(docRef, updates);
  return true;
}

/**
 * Update booking payment status.
 */
export async function updatePaymentStatus(bookingId, paymentStatus) {
  const docRef = doc(db, COLLECTIONS.BOOKINGS, bookingId);
  await updateDoc(docRef, {
    paymentStatus,
    updatedAt: serverTimestamp(),
  });
  return true;
}

/**
 * Delete a booking by its custom ID.
 */
export async function deleteBooking(bookingId) {
  const docRef = doc(db, COLLECTIONS.BOOKINGS, bookingId);
  await deleteDoc(docRef);
  return true;
}

// ═══════════════════════════════════════════════════════════════
//  STATS  (computed client-side from bookings collection)
// ═══════════════════════════════════════════════════════════════

/**
 * Compute dashboard stats from the bookings collection.
 * Returns: { totalRevenueGHS, activeCleans, pendingConfirmation, availableCleaners }
 */
export async function fetchDashboardStats() {
  const ref = collection(db, COLLECTIONS.BOOKINGS);
  const snapshot = await getDocs(ref);
  const bookings = snapshot.docs.map((d) => d.data());

  const totalRevenueGHS = bookings
    .filter((b) => b.status === "Completed")
    .reduce((sum, b) => sum + (b.totalAmount || 0), 0);

  const activeCleans = bookings.filter(
    (b) => b.status === "In Progress" || b.status === "Cleaner Dispatched"
  ).length;

  const pendingConfirmation = bookings.filter((b) => b.status === "Confirmed").length;

  // Fetch cleaner count from cleaners collection
  const cleanersSnap = await getDocs(collection(db, COLLECTIONS.CLEANERS));
  const availableCleaners = cleanersSnap.size || 15;

  return {
    totalRevenueGHS,
    activeCleans,
    pendingConfirmation,
    availableCleaners,
    totalBookings: bookings.length,
  };
}

// ═══════════════════════════════════════════════════════════════
//  CLEANERS
// ═══════════════════════════════════════════════════════════════

/**
 * Fetch all available cleaner teams.
 */
export async function fetchCleaners() {
  const ref = collection(db, COLLECTIONS.CLEANERS);
  const snapshot = await getDocs(ref);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
}
