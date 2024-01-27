import firebase_app from "../config";
import {
  getFirestore,
  Firestore,
  doc,
  setDoc,
  DocumentReference,
  DocumentData,
} from "firebase/firestore";

const db: Firestore = getFirestore(firebase_app);

interface AddDataResult {
  result: DocumentReference<DocumentData> | null;
  error: any; // Remplacez 'any' par le type approprié si vous savez quel est le type d'erreur renvoyé par la méthode setDoc.
}

export default async function addData(
  collection: string,
  id: string,
  data: any
): Promise<AddDataResult> {
  let result: DocumentReference | null;
  let error: any = null;

  console.log("Avant le try");
  try {
    result = await setDoc(doc(db, collection, id), data, {
      merge: true,
    });
  } catch (e) {
    error = e;
    console.error("Erreur lors de l'ajout des données:", e);
  }

  return { result, error };
}
