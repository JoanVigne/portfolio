import Image from "next/image";
import React, { useEffect, useState } from "react";
import "./formEditProjets.css";
import { db, fetchDataFromDBToSessionStorage } from "@/firebase/config";
import { collection, doc, setDoc, updateDoc } from "firebase/firestore";
import addData from "@/firebase/firestore/addData";
import deleteData from "@/firebase/firestore/deletData";

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
  /*   const ajouterUnProjet = async (e: React.FormEvent) => */
  async function ajouterUnProjet(e: React.FormEvent) {
    e.preventDefault();

    console.log("Projets debut : ", projets);

    const nouveauProjet = {
      [dataAjoutProjet.nom.replace(/\s+/g, "-").toLowerCase()]: {
        nom: dataAjoutProjet.nom,
        repository: dataAjoutProjet.repository,
        description: dataAjoutProjet.description,
        date: dataAjoutProjet.date,
        techno: dataAjoutProjet.technos,
      },
    };
    console.log("nouveau projet : ", nouveauProjet);
    try {
      await setDoc(doc(db, "projets", "bnj6s7XN4HZ19fVcNNv2"), nouveauProjet, {
        merge: true,
      });
      setMessageMAJ("Projet ajouté !");
      setDataAjoutProjet({
        nom: "",
        repository: "",
        lien: "",
        description: "",
        date: "",
        technos: [],
      });
      setProjets(
        (
          prevProjets: React.SetStateAction<{ [key: string]: any }[] | null>
        ) => {
          const premierProjet = prevProjets[0];
          return [
            { ...premierProjet, ...nouveauProjet },
            ...prevProjets.slice(1),
          ];
        }
      );
      sessionStorage.setItem("projets", JSON.stringify(projets));
    } catch (error: any) {
      setMessageMAJ(error);
    }
  }

  const SupprimerUnProjet = (nomProjetASupprimer: string) => {
    /*  const projetsCopy = { ...projets[0] }; */

    console.log("nomProjet", nomProjetASupprimer);
    /* 
    const keys = Object.keys(projetsCopy);
    const nouvellesKeys = keys.filter((key) => key !== nomProjetASupprimer);
    const nouveauProjetsCopy = Object.fromEntries(
      nouvellesKeys.map((key) => [key, projetsCopy[key]])
    ); 
    setProjets([nouveauProjetsCopy]);
    */
    // a mettre dans sessionStorage
    /*     sessionStorage.setItem("projets", JSON.stringify(projets)); */
    // a envoyer dans la DB
    deleteData("projets", "bnj6s7XN4HZ19fVcNNv2", nomProjetASupprimer);
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);

  const toggleModal = (projectKey: string | React.SetStateAction<null>) => {
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

          {messageMAJ && <p>{messageMAJ}</p>}
          <button type="submit">Ajouter ce nouveau projet</button>
        </form>
      )}
    </div>
  );
};

export default FormEditProjets;
