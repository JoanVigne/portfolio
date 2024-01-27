import {
  query,
  where,
  getDocs,
  collection,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../config";

const deleteData = async (
  quelleCollection: string,
  id: string,
  supprimerQuoi: string
) => {
  try {
    console.log("dans le try");
    const q = query(
      collection(db, quelleCollection, id),
      where(supprimerQuoi, "==", true)
    );
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot);

    if (querySnapshot.size > 0) {
      // Récupère le premier document correspondant (on suppose ici qu'il n'y a qu'un seul document avec ce nom)
      const document = querySnapshot.docs[0];
      console.log("on est bien arrivé avant le DeletDoc, document :", document);
      return;
      await deleteDoc(doc(db, quelleCollection, document.id));
      console.log("Document supprimé avec succès");
    } else {
      console.log("Aucun document trouvé avec le nom spécifié");
    }
  } catch (error) {
    console.error("Erreur lors de la suppression du document :", error);
    // Gère l'erreur ici
  }
};

export default deleteData;
