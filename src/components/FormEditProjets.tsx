import React, { useEffect, useState } from "react";
import "./formEditProjets.css";
import { db, fetchDataFromDBToSessionStorage } from "@/firebase/config";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

import Image from "next/image";

import FormEditThisProjet from "./FormEditThisProjet";
import FormAjoutProjet from "./FormAjoutProjet";

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

  const [ouvrirForm, setOuvrirForm] = useState(false);

  const [messageAlert, setMessageAlert] = useState<string | null>(null);

  const SupprimerUnProjet = async (nomProjetASupprimer: string) => {
    try {
      const docRef = doc(db, "projets", "bnj6s7XN4HZ19fVcNNv2");
      const docSnapshot = await getDoc(docRef);
      const projetsData = docSnapshot.data();
      if (!projetsData) {
        return;
      }
      const projetASupprimer = Object.entries(projetsData).find(
        ([key]) => key === nomProjetASupprimer
      );
      if (projetASupprimer) {
        const [key] = projetASupprimer;
        const updatedProjetsData = { ...projetsData };
        delete updatedProjetsData[key];
        await setDoc(docRef, updatedProjetsData);
        setMessageAlert("Le projet a bien été supprimé");
        setProjets([updatedProjetsData]);
        sessionStorage.setItem("projets", JSON.stringify([updatedProjetsData]));
        toggleModal(null);
      } else {
        setMessageAlert("Le projet n'a pas été trouvé");
      }
    } catch (error) {
      console.error("Erreur lors de la suppression du document :", error);
      setMessageAlert("Erreur lors de la suppression");
      // Gère l'erreur ici
    }
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);

  const toggleModal = (projectKey: string | null) => {
    setProjectToDelete(projectKey);
    setModalVisible(!modalVisible);
  };

  const [thisForm, setThisForm] = useState(false);
  const [projetToModify, setProjetToModify] = useState<string | null>(null);

  const toggleThisProjetForm = (projectKey: string | null) => {
    setProjetToModify(projectKey);
    setThisForm(!thisForm);
  };

  const [messages, setMessages] = useState<{ [key: string]: string }>({});

  async function handleSave(newData: any, projetKey: string) {
    const newKeyName = newData.nom.replace(/\s+/g, "-").toLowerCase();

    const verifierProjetExiste = (
      projetRecherche: string,
      projetsDansLaBase: any
    ): boolean => projetRecherche in projetsDansLaBase;

    const docRef = doc(db, "projets", "bnj6s7XN4HZ19fVcNNv2");
    const projetSnapshot = await getDoc(docRef);
    const projetDansLaBaseDeDonnees = projetSnapshot.data();

    const projetRecherche = newKeyName;
    const projetExiste = verifierProjetExiste(
      projetRecherche,
      projetDansLaBaseDeDonnees
    );

    const newMessages = { ...messages };
    if (projetExiste && projetDansLaBaseDeDonnees) {
      projetDansLaBaseDeDonnees[projetRecherche] = newData;

      // le modifier dans la DB fire base
      await updateDoc(docRef, {
        [newKeyName]: newData,
      });
      newMessages[projetKey] =
        "Le projet a été mis à jour dans la base de données.";
      if (projets) {
        const newArray = [{ ...projets[0], [newKeyName]: newData }];
        setProjets(newArray);
        sessionStorage.setItem("projets", JSON.stringify(newArray));
      }
    } else {
      newMessages[projetKey] =
        "Le projet n'existe pas sous ce nom, créer un nouveau projet?";
    }
    setMessages(newMessages);
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

                      <Image
                        className="bin"
                        onClick={() => toggleModal(key)}
                        src="/bin.png"
                        alt="edit icon"
                        width={14}
                        height={14}
                        priority
                      />
                    </div>
                  </div>
                  {thisForm && projetToModify === key && (
                    <>
                      <FormEditThisProjet
                        data={project}
                        onSave={(newData) => handleSave(newData, key)}
                      />
                      <p>{messages[key]}</p>
                    </>
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
      <p>{messageAlert}</p>
      <button
        onClick={() => {
          setOuvrirForm(!ouvrirForm);
        }}
      >
        {ouvrirForm ? <>hide form</> : <>Ajouter un projet</>}
      </button>
      {ouvrirForm && (
        <FormAjoutProjet projets={projets} setProjets={setProjets} />
      )}
    </div>
  );
};

export default FormEditProjets;
