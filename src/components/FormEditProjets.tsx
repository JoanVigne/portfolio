import Image from "next/image";
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

  const [ouvrirForm, setOuvrirForm] = useState(false);

  /* const [dataProfile, setdataProfile] = useState(profile);
  function handleInputChange(e) {
    const { name, value } = e.target;
    const updatedValue = Array.isArray(value) ? value : value.split(",");
    setdataProfile((prevData) => ({
      ...prevData,
      [name]: updatedValue,
    }));
  } */

  function ajouterUnProjet() {
    console.log("addAProjet");
  }
  function SupprimerUnProjet(thisOne) {
    console.log(thisOne);
  }

  return (
    <div>
      {projets &&
        projets.map((projet) => {
          const projectValues = Object.values(projet);
          return projectValues.map((project) => {
            // Vérifiez si la clé est "id"
            if (project !== "bnj6s7XN4HZ19fVcNNv2") {
              return (
                <div key={project.nom}>
                  <span>{project.nom} </span>
                  <button
                    onClick={() => {
                      SupprimerUnProjet(project);
                    }}
                  >
                    supprimer
                  </button>
                </div>
              );
            }
            // Si la clé est "id", retournez null ou ne rien retourner
            return null;
          });
        })}
      <button
        onClick={() => {
          setOuvrirForm(!ouvrirForm);
        }}
      >
        {ouvrirForm ? <>hide form</> : <>Ajouter un projet</>}
      </button>
      {ouvrirForm && (
        <form action="" onSubmit={ajouterUnProjet}>
          <label htmlFor="nom">Nom</label>
          <input
            type="text"
            name="nom"
            id="nom"
            /*   value={dataProfile.email}
            onChange={handleInputChange} */
          />
          <label htmlFor="nom">repository</label>
          <input
            type="text"
            name="repository"
            id="repository"
            /*   value={dataProfile.email}
            onChange={handleInputChange} */
          />
          <label htmlFor="nom">lien</label>
          <input
            type="text"
            name="lien"
            id="lien"
            /*   value={dataProfile.email}
            onChange={handleInputChange} */
          />
          <label htmlFor="nom">description</label>
          <input
            type="text"
            name="description"
            id="description"
            /*   value={dataProfile.email}
            onChange={handleInputChange} */
          />
          <label htmlFor="nom">date</label>
          <input
            type="text"
            name="date"
            id="date"
            /*   value={dataProfile.email}
            onChange={handleInputChange} */
          />
          techno ?
        </form>
      )}
    </div>
  );
};

export default FormEditProjets;
