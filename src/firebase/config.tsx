import { initializeApp, getApps } from "firebase/app";
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
let firebase_app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
if (!firebase_app) {
  console.log("Firebase initialized successfully!");
} else {
  console.log("Firebase is already initialized.");
}

// Fire store
const db = getFirestore();

async function fetchDataFromDBToSessionStorage(collectionName: string) {
  // verification session storage
  const dansLeSessionStorage = sessionStorage.getItem(collectionName);
  if (dansLeSessionStorage) {
    return JSON.parse(dansLeSessionStorage);
  }
  const colRef = collection(db, collectionName);
  try {
    const snapshot = await getDocs(colRef);
    const data = snapshot.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
    sessionStorage.setItem(collectionName, JSON.stringify(data));
    console.log("Fetched :", collectionName);
    return data;
  } catch (error) {
    console.error("Error fetching data from Firestore:", error);
  }
}

async function newFetchDataDB(collectionName: string) {
  const colRef = collection(db, collectionName);
  try {
    const snapshot = await getDocs(colRef);
    const data = snapshot.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
    console.log("Fetched", collectionName);
    return data;
  } catch (error) {
    console.error("Error fetching data from firestore:", error);
  }
}

export { db };
export default firebase_app;
export { fetchDataFromDBToSessionStorage, newFetchDataDB };
