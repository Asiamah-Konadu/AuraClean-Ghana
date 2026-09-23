// ============================================================
// AuraClean Ghana — Firebase Configuration
// ============================================================
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCC1BV9FQd1-NekCyHwhbNkSiRt-dCNglM",
  authDomain: "auracleanghana.firebaseapp.com",
  projectId: "auracleanghana",
  storageBucket: "auracleanghana.firebasestorage.app",
  messagingSenderId: "46283451748",
  appId: "1:46283451748:web:c0694a5f7da85d9e921e71",
  measurementId: "G-Y52MNBLGBW"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firestore database
export const db = getFirestore(app);

// Initialize Analytics (only in browser environments that support it)
isSupported().then((supported) => {
  if (supported) getAnalytics(app);
});

export default app;
