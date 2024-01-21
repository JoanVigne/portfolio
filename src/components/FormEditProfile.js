import React, { useEffect, useState } from "react";
import "./formEditProfile.css";
import { db } from "@/firebase/config";
import { collection, doc, updateDoc } from "firebase/firestore";
import { useProfileContext } from "@/context/ProfileContext";

const FormEditProfile = () => {
  // fetch ou recuperer dans context le profile : PEUT ETRE PAS BESOIN CAR PAGE ADMIN
  const { profile, updateProfile } = useProfileContext() || {};
  useEffect(() => {
    if (profile) {
      console.log("il y a le profile dans le context", profile);
      return;
    }
    console.log("Dans le useEffect du RootLayout, ProfileProvider :", profile);

    const fetchProfile = async () => {
      try {
        const fetchedProfile = await newFetchDataDB("profile");
        console.log(fetchedProfile);
        updateProfile(fetchedProfile[0]);
      } catch (error) {
        console.error("Erreur lors du fetch du profil :", error);
      }
    };
    fetchProfile();
  }, []);

  // change la value des inputs :
  const [dataProfile, setdataProfile] = useState(profile);
  function handleInputChange(e) {
    const { name, value } = e.target;
    const updatedValue = Array.isArray(value) ? value : value.split(",");
    setdataProfile((prevData) => ({
      ...prevData,
      [name]: updatedValue,
    }));
  }

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

  // pour supprimer un element d'une liste
  function handleRemove(index, dataKey) {
    const updatedData = [...dataProfile[dataKey]];
    updatedData.splice(index, 1);
    setdataProfile((prevData) => ({
      ...prevData,
      [dataKey]: updatedData,
    }));
  }

  // pour ajouter un element d'une liste
  const [arrayValues, setarrayValues] = useState({
    autresMaitrise: "",
    langagesDecouverte: "",
    langagesMaitrise: "",
  });

  function handleAddSmtInArray(whichArray) {
    if (arrayValues[whichArray].trim() !== "") {
      const updatedData = [...dataProfile[whichArray], arrayValues[whichArray]];
      setdataProfile((prevData) => ({
        ...prevData,
        [whichArray]: updatedData,
      }));
      console.log("avant", arrayValues);
      setarrayValues({ ...arrayValues, [whichArray]: "" });
    }
  }

  return (
    <form className="form-edit-profile" onSubmit={handleSubmit}>
      {profile && (
        <>
          <label htmlFor="email">E-mail</label>
          <input
            type="text"
            name="email"
            id="email"
            value={dataProfile.email}
            onChange={handleInputChange}
          />
          <label htmlFor="telephone">Téléphone</label>
          <input
            type="text"
            name="telephone"
            id="telephone"
            value={dataProfile.telephone}
            onChange={handleInputChange}
          />
          <label htmlFor="LangagesMaitrise">Langages maitrisés</label>
          {Array.isArray(dataProfile.langagesMaitrise) &&
            dataProfile.langagesMaitrise.map((langage, index) => (
              <div className="span-button-container" key={index}>
                <span>{langage}</span>
                <button
                  type="button"
                  onClick={() => handleRemove(index, "langagesMaitrise")}
                >
                  -
                </button>
              </div>
            ))}
          <div>
            <input
              type="text"
              name="langagesMaitrise"
              value={arrayValues.langagesMaitrise}
              onChange={(e) => {
                setarrayValues({
                  ...arrayValues,
                  [e.target.name]: e.target.value,
                });
              }}
            />
            <button
              type="button"
              onClick={() => handleAddSmtInArray("langagesMaitrise")}
            >
              +
            </button>
          </div>
          ////////////////////
          <label htmlFor="LangagesDecouverte">Langages découverts</label>
          {Array.isArray(dataProfile.langagesDecouverte) &&
            dataProfile.langagesDecouverte.map((langage, index) => (
              <div className="span-button-container" key={index}>
                <span>{langage}</span>
                <button
                  type="button"
                  onClick={() => handleRemove(index, "langagesDecouverte")}
                >
                  -
                </button>
              </div>
            ))}
          <div>
            <input
              type="text"
              name="LangagesDecouverte"
              value={arrayValues.langagesDecouverte}
              onChange={(e) => {
                setarrayValues({
                  ...arrayValues,
                  [e.target.name]: e.target.value,
                });
              }}
            />
            <button
              type="button"
              onClick={() => handleAddSmtInArray("langagesDecouverte")}
            >
              +
            </button>
          </div>
          <label htmlFor="autresMaitrise">Autres maitrisés</label>
          {Array.isArray(dataProfile.autresMaitrise) &&
            dataProfile.autresMaitrise.map((autre, index) => (
              <div className="span-button-container" key={index}>
                <span>{autre}</span>
                <button
                  type="button"
                  onClick={() => handleRemove(index, "autresMaitrise")}
                >
                  -
                </button>
              </div>
            ))}
          <div>
            <input
              type="text"
              name="autresMaitrise"
              value={arrayValues.autresMaitrise}
              onChange={(e) => {
                setarrayValues({
                  ...arrayValues,
                  [e.target.name]: e.target.value,
                });
              }}
            />
            <button
              type="button"
              onClick={() => handleAddSmtInArray("autresMaitrise")}
            >
              +
            </button>
          </div>
          <label htmlFor="autresDecouverte">Autres decouvertes</label>
          {Array.isArray(dataProfile.autresDecouverte) &&
            dataProfile.autresDecouverte.map((autre, index) => (
              <div className="span-button-container" key={index}>
                <span>{autre}</span>
                <button
                  type="button"
                  onClick={() => handleRemove(index, "autresDecouverte")}
                >
                  -
                </button>
              </div>
            ))}
          <div>
            <input
              type="text"
              name="autresDecouverte"
              value={arrayValues.autresDecouverte}
              onChange={(e) => {
                setarrayValues({
                  ...arrayValues,
                  [e.target.name]: e.target.value,
                });
              }}
            />
            <button
              type="button"
              onClick={() => handleAddSmtInArray("autresDecouverte")}
            >
              +
            </button>
          </div>
          <input type="submit" value="Valider" />
          <input
            className="reset-form"
            type="button"
            value="Reset"
            onClick={() => setdataProfile(profile)}
          />
        </>
      )}
    </form>
  );
};
export default FormEditProfile;
