import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// 1. MANUALLY ADD THIS IMPORT
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCXV3Nok4k6L_An-pI-xDFJEi5gJDFG6xo",
  authDomain: "otpverification-8356b.firebaseapp.com",
  projectId: "otpverification-8356b",
  storageBucket: "otpverification-8356b.firebasestorage.app",
  messagingSenderId: "141517573112",
  appId: "1:141517573112:web:8266ef3e8b439175a5a40d",
  measurementId: "G-60NRG74V0D",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// 2. MANUALLY ADD AND EXPORT THIS LINE
export const auth = getAuth(app);

export const analytics = getAnalytics(app);
