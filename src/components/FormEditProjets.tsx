import React, { useEffect, useState } from "react";
import "./formEditProjets.css";
import { db, fetchDataFromDBToSessionStorage } from "@/firebase/config";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import Image from "next/image";
import MyModal from "./MyModal";
import FormEditThisProjet from "./FormEditThisProjet";

const FormEditProjets: React.FC = () => {
  const router = useRouter();

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

  const [messageMAJ, setMessageMAJ] = useState<string | null>(null);

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

  // pour ajouter un element dans liste de techno
  const [technos, setTechnos] = useState<string[]>([]);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setDataAjoutProjet((prevData) => ({
      ...prevData,
      [name]: name === "technos" ? [value] : value,
    }));
  }
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

  // ajout et suppression projets dans db :
  async function ajouterUnProjet(e: React.FormEvent) {
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
    try {
      await setDoc(doc(db, "projets", "bnj6s7XN4HZ19fVcNNv2"), nouveauProjet, {
        merge: true,
      });
      setMessageMAJ("Projet ajouté !");

      //
      localStorage.removeItem("projets");

      setInterval(() => {
        fetchProjets();
      }, 1000);

      // reset le form
      setDataAjoutProjet({
        nom: "",
        repository: "",
        lien: "",
        description: "",
        date: "",
        technos: [],
      });
    } catch (error: any) {
      setMessageMAJ(error);
    }
  }

  const SupprimerUnProjet = async (nomProjetASupprimer: string) => {
    console.log("nomProjet", nomProjetASupprimer);

    try {
      const docRef = doc(db, "projets", "bnj6s7XN4HZ19fVcNNv2");
      const docSnapshot = await getDoc(docRef);
      const projetsData = docSnapshot.data();
      const projetASupprimer = Object.entries(projetsData).find(
        ([key]) => key === nomProjetASupprimer
      );
      if (projetASupprimer) {
        const [key] = projetASupprimer;
        const updatedProjetsData = { ...projetsData };
        delete updatedProjetsData[key];
        await setDoc(docRef, updatedProjetsData);
        setMessageMAJ("Le projet a bien été supprimé");
        sessionStorage.setItem("projets", JSON.stringify([updatedProjetsData]));
        toggleModal(null);
      } else {
        setMessageMAJ("Le projet n'a pas été trouvé");
      }
    } catch (error) {
      console.error("Erreur lors de la suppression du document :", error);
      setMessageMAJ("Erreur lors de la suppression");
      // Gère l'erreur ici
    }
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);

  const toggleModal = (projectKey: string | null) => {
    setProjectToDelete(projectKey);
    setModalVisible(!modalVisible);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const [thisForm, setThisForm] = useState(false);
  const [projetToModify, setProjetToModify] = useState<string | null>(null);

  const toggleThisProjetForm = (projectKey: string | null) => {
    setProjetToModify(projectKey);
    setThisForm(!thisForm);
    console.log("projectKey", projectKey);
  };

  function handleSave(newData: any) {
    console.log("Nouvelles données à sauvegarder :", newData);
  }
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
                <div key={project.nom} className="projet-container">
                  <div className="nom-edit-supprime-container">
                    <span className="nom-projet">{project.nom} </span>
                    <div className="edit-supprime-container">
                      <Image
                        className="edit-icon"
                        src="/edit.png"
                        alt="edit icon"
                        width={14}
                        height={14}
                        priority
                        onClick={() => toggleThisProjetForm(key)}
                      />

                      <button
                        className="button-attention"
                        onClick={() => toggleModal(key)}
                      >
                        supprimer
                      </button>
                    </div>
                  </div>
                  {thisForm && projetToModify === key && (
                    <FormEditThisProjet data={project} onSave={handleSave} />
                  )}
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
          onKeyDown={handleKeyDown} // pour gerer la touche "enter"
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

          {messageMAJ && <p>{messageMAJ}</p>}
          <button type="submit">Ajouter ce nouveau projet</button>
        </form>
      )}
    </div>
  );
};

export default FormEditProjets;
