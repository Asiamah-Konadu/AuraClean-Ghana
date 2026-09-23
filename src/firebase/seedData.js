// ============================================================
// AuraClean Ghana — Firestore Database Seeder
// Run once to populate initial cleaners and sample bookings
// ============================================================
import { db } from "./config";
import { doc, setDoc, collection, getDocs, serverTimestamp } from "firebase/firestore";

const CLEANERS_SEED = [
  {
    id: "team-emerald",
    name: "Team Emerald",
    lead: "Sarah Addo",
    city: "Accra",
    phone: "0244123456",
    available: true,
    rating: 4.9,
    completedJobs: 142,
    specialties: ["standard-clean", "deep-clean", "upholstery-carpet"],
    displayName: "Team Emerald (Lead: Sarah Addo)",
  },
  {
    id: "team-gold",
    name: "Team Gold",
    lead: "Emmanuel Darko",
    city: "Accra",
    phone: "0554987321",
    available: true,
    rating: 4.8,
    completedJobs: 98,
    specialties: ["commercial-office", "post-construction", "deep-clean"],
    displayName: "Team Gold (Lead: Emmanuel Darko)",
  },
  {
    id: "team-ashanti",
    name: "Team Ashanti",
    lead: "Rita Asare",
    city: "Kumasi",
    phone: "0322765890",
    available: true,
    rating: 4.7,
    completedJobs: 76,
    specialties: ["standard-clean", "fumigation-pest", "deep-clean"],
    displayName: "Team Ashanti (Lead: Rita Asare)",
  },
  {
    id: "team-western",
    name: "Team Western",
    lead: "Jonathan Mensah",
    city: "Takoradi",
    phone: "0312456789",
    available: true,
    rating: 4.6,
    completedJobs: 54,
    specialties: ["standard-clean", "post-construction", "fumigation-pest"],
    displayName: "Team Western (Lead: Jonathan Mensah)",
  },
  {
    id: "team-tema",
    name: "Team Tema",
    lead: "Abena Boateng",
    city: "Tema",
    phone: "0303112233",
    available: true,
    rating: 4.8,
    completedJobs: 88,
    specialties: ["commercial-office", "deep-clean", "upholstery-carpet"],
    displayName: "Team Tema (Lead: Abena Boateng)",
  },
];

const SAMPLE_BOOKINGS_SEED = [
  {
    id: "AC26-DEMO0001",
    customerName: "Kwame Mensah",
    phone: "0244567890",
    email: "kwame@example.com",
    serviceId: "deep-clean",
    serviceName: "Luxury Deep Cleaning",
    bedrooms: 3,
    bathrooms: 2,
    frequency: "monthly",
    addons: ["Inside Fridge & Oven Scrub"],
    city: "Accra",
    location: "East Legon, near American House",
    gpsAddress: "GA-342-9901",
    date: "2026-09-25",
    timeSlot: "7:00 AM – 9:00 AM",
    totalAmount: 552,
    paymentMethod: "mtn_momo",
    paymentStatus: "Paid via MoMo",
    notes: "Please call 10 minutes before arrival.",
    status: "Confirmed",
    cleanerAssigned: "Team Emerald (Lead: Sarah Addo)",
  },
  {
    id: "AC26-DEMO0002",
    customerName: "Ama Asante",
    phone: "0557891234",
    email: "ama.asante@gmail.com",
    serviceId: "commercial-office",
    serviceName: "Commercial & Office Cleaning",
    bedrooms: 1,
    bathrooms: 2,
    frequency: "weekly",
    addons: [],
    city: "Accra",
    location: "Airport City, near Accra Mall",
    gpsAddress: "",
    date: "2026-09-26",
    timeSlot: "6:00 AM – 7:00 AM",
    totalAmount: 480,
    paymentMethod: "card",
    paymentStatus: "Paid via Card",
    notes: "After-hours clean, security desk will provide access.",
    status: "Cleaner Dispatched",
    cleanerAssigned: "Team Gold (Lead: Emmanuel Darko)",
  },
  {
    id: "AC26-DEMO0003",
    customerName: "Kofi Boateng",
    phone: "0322112233",
    email: "",
    serviceId: "post-construction",
    serviceName: "Post-Construction & Move-In",
    bedrooms: 4,
    bathrooms: 3,
    frequency: "one-time",
    addons: ["Compound & Driveway Pressure Wash"],
    city: "Kumasi",
    location: "Nhyiaeso, Kumasi",
    gpsAddress: "AK-110-4455",
    date: "2026-09-24",
    timeSlot: "8:00 AM – 10:00 AM",
    totalAmount: 1150,
    paymentMethod: "pay_after",
    paymentStatus: "Pay On-Site",
    notes: "Newly built 4-bedroom house, heavy cement dust.",
    status: "In Progress",
    cleanerAssigned: "Team Ashanti (Lead: Rita Asare)",
  },
];

/**
 * Seeds cleaners and sample bookings into Firestore.
 * Safe to call multiple times — skips if data already exists.
 */
export async function seedDatabase() {
  // --- Seed Cleaners ---
  const cleanersRef = collection(db, "cleaners");
  const existingCleaners = await getDocs(cleanersRef);
  if (existingCleaners.empty) {
    console.log("🌱 Seeding cleaners...");
    for (const cleaner of CLEANERS_SEED) {
      await setDoc(doc(db, "cleaners", cleaner.id), {
        ...cleaner,
        createdAt: serverTimestamp(),
      });
    }
    console.log(`✅ Seeded ${CLEANERS_SEED.length} cleaner teams.`);
  } else {
    console.log(`ℹ️ Cleaners already seeded (${existingCleaners.size} found). Skipping.`);
  }

  // --- Seed Sample Bookings ---
  const bookingsRef = collection(db, "bookings");
  const existingBookings = await getDocs(bookingsRef);
  if (existingBookings.empty) {
    console.log("🌱 Seeding sample bookings...");
    for (const booking of SAMPLE_BOOKINGS_SEED) {
      await setDoc(doc(db, "bookings", booking.id), {
        ...booking,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    }
    console.log(`✅ Seeded ${SAMPLE_BOOKINGS_SEED.length} sample bookings.`);
  } else {
    console.log(`ℹ️ Bookings already exist (${existingBookings.size} found). Skipping.`);
  }

  console.log("🔥 AuraClean Ghana Firestore database is ready!");
}
