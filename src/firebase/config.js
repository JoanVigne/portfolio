import { initializeApp, getApps } from "firebase/app";
/* import { getStorage } from "firebase/storage"; */
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
console.log("Before initializing Firebase");

let firebase_app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
console.log("firebase fichier");
if (!firebase_app) {
  console.log("Firebase initialized successfully!");
} else {
  console.log("Firebase is already initialized.");
}

// Fire store
/* const db = getFirestore();
const colRef = collection(db, "test");
getDocs(colRef).then((snapshot) => {
  console.log("dans le getDocs colRef.then");
  console.log(snapshot.docs);
}); */
const db = getFirestore();
const fetchDataFromFirestore = async () => {
  try {
    const colRef = collection(db, "test");
    const snapshot = await getDocs(colRef);
    console.log("Data from Firestore:", snapshot.docs);
  } catch (error) {
    console.error("Error fetching data from Firestore:", error);
  }
};

fetchDataFromFirestore();

export default firebase_app;
