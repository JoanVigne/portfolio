import Image from "next/image";
import React, { useEffect, useState } from "react";
import "./formEditProjets.css";
import { fetchDataFromDBToSessionStorage } from "@/firebase/config";

const FormEditProjets: React.FC = () => {
  const [projets, setProjets] = useState<Array<{ [key: string]: any }> | null>(
    null
  );
  useEffect(() => {
    fetchProjets();
  }, []);
  async function fetchProjets() {
    const fetchedProjets = await fetchDataFromDBToSessionStorage("projets");
    setProjets(fetchedProjets);
  }

  // submit le form
  /* async function handleSubmit(e) {
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
  } */

  const [ouvrirForm, setOuvrirForm] = useState(false);

  // change la value des inputs :
  const [dataAjoutProjet, setDataAjoutProjet] = useState({
    nom: "",
    repository: "",
    lien: "",
    description: "",
    date: "",
    technos: [] as string[],
  });

  const [arrayValues, setArrayValues] = useState({
    technos: "",
  });

  const [technos, setTechnos] = useState<string[]>([]);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setDataAjoutProjet((prevData) => ({
      ...prevData,
      [name]: name === "technos" ? [value] : value,
    }));
  }
  // pour ajouter un element dans liste de techno
  const ajouterTechno = () => {
    const nouvelleTechno = arrayValues.technos.trim();
    if (nouvelleTechno !== "" && !technos.includes(nouvelleTechno)) {
      setTechnos([...technos, nouvelleTechno]);
      setArrayValues({ technos: "" });
      setDataAjoutProjet((prevData) => ({
        ...prevData,
        technos: [...prevData.technos, nouvelleTechno],
      }));
    }
  };

  const supprimerTechno = (techno: string) => {
    const nouvellesTechnos = technos.filter((t) => t !== techno);
    setTechnos(nouvellesTechnos);
  };

  const ajouterUnProjet = (e: React.FormEvent) => {
    console.log("Projets debut : ", projets);
    e.preventDefault();
    const nouveauProjet = {
      [dataAjoutProjet.nom.replace(/\s+/g, "-").toLowerCase()]: {
        nom: dataAjoutProjet.nom,
        repository: dataAjoutProjet.repository,
        description: dataAjoutProjet.description,
        date: dataAjoutProjet.date,
        techno: dataAjoutProjet.technos,
      },
    };
    setProjets((prevProjets: any[]) => {
      const premierProjet = prevProjets[0];
      return [{ ...premierProjet, ...nouveauProjet }, ...prevProjets.slice(1)];
    });
    // Réinitialiser le formulaire
    setDataAjoutProjet({
      nom: "",
      repository: "",
      lien: "",
      description: "",
      date: "",
      technos: [],
    });
    console.log("nouveau projet : ", nouveauProjet);
    sessionStorage.setItem("projets", JSON.stringify(projets));
    // a envoyer dans la DB
  };
  const SupprimerUnProjet = (nomProjetASupprimer: string) => {
    const projetsCopy = { ...projets[0] };

    console.log("nomProjet", nomProjetASupprimer);

    const keys = Object.keys(projetsCopy);
    const nouvellesKeys = keys.filter((key) => key !== nomProjetASupprimer);
    const nouveauProjetsCopy = Object.fromEntries(
      nouvellesKeys.map((key) => [key, projetsCopy[key]])
    );
    setProjets([nouveauProjetsCopy]);
    // a mettre dans sessionStorage
    // a envoyer dans la DB
  };
  const [modalVisible, setModalVisible] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);

  const toggleModal = (projectKey) => {
    setProjectToDelete(projectKey);
    setModalVisible(!modalVisible);
  };
  return (
    <div>
      {projets &&
        projets.map((projet: any) => {
          const projectKeys = Object.keys(projet);
          return projectKeys.map((key) => {
            const project = projet[key];
            // Vérifiez si la clé est differente de "id"
            if (key !== "id") {
              return (
                <div key={project.nom}>
                  <span className="nom-projet">{project.nom} </span>
                  <button
                    className="button-attention"
                    onClick={() => toggleModal(key)}
                  >
                    supprimer
                  </button>
                  {modalVisible && projectToDelete === key && (
                    <div id="confirmationModal" className="modal">
                      <div className="modal-confirmation-suppression">
                        <p>Voulez-vous vraiment supprimer {project.nom} ?</p>
                        <button
                          className="button-attention"
                          onClick={() => SupprimerUnProjet(key)}
                        >
                          Oui
                        </button>
                        <button onClick={() => toggleModal(null)}>
                          Annuler
                        </button>
                      </div>
                    </div>
                  )}
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
        <form
          action=""
          onSubmit={ajouterUnProjet}
          className="form-ajout-projet"
        >
          <label htmlFor="nom">Nom</label>
          <input
            type="text"
            name="nom"
            id="nom"
            value={dataAjoutProjet.nom}
            onChange={handleInputChange}
          />
          <label htmlFor="nom">repository</label>
          <input
            type="text"
            name="repository"
            id="repository"
            value={dataAjoutProjet.repository}
            onChange={handleInputChange}
          />
          <label htmlFor="nom">lien</label>
          <input
            type="text"
            name="lien"
            id="lien"
            value={dataAjoutProjet.lien}
            onChange={handleInputChange}
          />
          <label htmlFor="nom">description</label>
          <input
            type="text"
            name="description"
            id="description"
            value={dataAjoutProjet.description}
            onChange={handleInputChange}
          />
          <label htmlFor="nom">date</label>
          <input
            type="text"
            name="date"
            id="date"
            value={dataAjoutProjet.date}
            onChange={handleInputChange}
          />

          <label htmlFor="technos">Technos</label>
          {technos.map((techno, index) => (
            <div key={index}>
              {techno}
              <button type="button" onClick={() => supprimerTechno(techno)}>
                Supprimer
              </button>
            </div>
          ))}
          <input
            type="text"
            value={arrayValues.technos}
            onChange={(e) => setArrayValues({ technos: e.target.value })}
          />
          <button type="button" onClick={ajouterTechno}>
            + techno
          </button>

          <button type="submit">Ajouter ce nouveau projet</button>
        </form>
      )}
    </div>
  );
};

export default FormEditProjets;
