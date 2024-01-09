import { initializeApp, getApps } from "firebase/app";
/* import { getStorage } from "firebase/storage"; */
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";

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
const colRef = collection(db, "test");
let test = [];
const fetchDataFromFirestore = async () => {
  try {
    const snapshot = await getDocs(colRef);
    console.log("Data from Firestore:", snapshot.docs);
    snapshot.docs.forEach((doc) => {
      test.push({ ...doc.data(), id: doc.id });
    });
    console.log("test", test);
  } catch (error) {
    console.error("Error fetching data from Firestore:", error);
  }
};
fetchDataFromFirestore();

//add
/* const addSmt = document.querySelector(".add");
addSmt.addEventListener("submit", (e) => {
  e.preventDefault();
  addDoc(colRef, {
    title: addSmt.title.value,
    author: addSmt.author.value,
  });
}); */
// delete
/* const deleteSmt = document.querySelector(".delete");
deleteSmt.addEventListener("submit", (e) => {
  e.preventDefault();
}); */
export { db };
export default firebase_app;
export { test };
