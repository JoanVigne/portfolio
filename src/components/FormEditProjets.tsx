import React, { useEffect, useState } from "react";

const FormEditProjets = () => {
  const [projets, setProjets] = useState(false);

  useEffect(() => {
    const sessionStorageProjets = sessionStorage.getItem("projets");
    setProjets(JSON.parse(sessionStorageProjets));
  }, []);

  // submit le form
  async function handleSubmit(e) {
    e.preventDefault();
    // Ajoutez ici la logique pour soumettre les données modifiées, par exemple, enregistrer dans sessionStorage ou envoyer à un backend
    console.log("Données modifiées :", dataProfile);
    // SI C EST LES MEMES DONNEES, PAS D ENVOI A LA BD
    if (dataProfile == profile) {
      console.log("ce sont les memes données");
      return;
    }
    try {
      console.log("le profile : ", profile);
      console.log("les datas recup dans le form : ", dataProfile);
      return;
      const documentId = dataProfile.id;
      console.log("documentId", documentId);
      const docRef = doc(collection(db, "profile"), documentId);
      await updateDoc(docRef, dataProfile);
      console.log("Document mis à jour avec succès !");
      sessionStorage.setItem("profile", JSON.stringify([dataProfile]));
    } catch (error) {
      console.error("Erreur lors de la mise à jour du document :", error);
    }
  }

  return (
    <div>
      <form className="form-edit-profile" onSubmit={handleSubmit}>
        <label htmlFor=""> TEST </label>
        <input type="text" value="test" />
      </form>
    </div>
  );
};

export default FormEditProjets;
