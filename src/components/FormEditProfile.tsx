import React, { useEffect, useState } from "react";
import { db, newFetchDataDB } from "@/firebase/config";
import { collection, doc, updateDoc } from "firebase/firestore";
import { useProfileContext } from "@/context/ProfileContext";
import { z } from "zod";

interface ArrayValues {
  [key: string]: string;
}
const FormEditProfile: React.FC = () => {
  const { profile, updateProfile } = useProfileContext() || {};
  useEffect(() => {
    if (profile) {
      console.log("profile dans context");
      return;
    }
    const fetchProfile = async () => {
      try {
        const fetchedProfile = await newFetchDataDB("profile");
        if (fetchedProfile == undefined) {
          return;
        }
        updateProfile(fetchedProfile[0]);
      } catch (error) {
        console.error("Erreur lors du fetch du profil :", error);
      }
    };
    fetchProfile();
  }, []);

  // change la value des inputs :
  const [dataProfile, setdataProfile] = useState(profile);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    const updatedValue = Array.isArray(value) ? value : value.split(",");
    setdataProfile((prevData: any) => ({
      ...prevData,
      [name]: updatedValue,
    }));
  }

  // submit le form

  const [messageMAJ, setMessageMAJ] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("dataProfile", dataProfile);
    if (dataProfile == profile) {
      setMessageMAJ("ce sont les mêmes données");
      return;
    }
    type dataProfile = z.infer<typeof profileSchema>;
    const profileSchema = z.object({
      autresDecouverte: z.array(z.string()),
      autresMaitrise: z.array(z.string()),
      email: z.array(z.string()),
      id: z.string(),
      langagesDecouverte: z.array(z.string()),
      langagesMaitrise: z.array(z.string()),
      telephone: z.array(z.string()),
    });
    const validationResult = profileSchema.safeParse(dataProfile);
    if (validationResult.success === false) {
      console.log(validationResult);
      console.log(dataProfile);
      setMessageMAJ("Erreur dans le formulaire.");
      return;
    }

    /*  type nouveauProjetSansKey = z.infer<typeof projetSchema>;
    const projetSchema = z.object({
      nom: z.string(),
      repository: z.string().optional(),
      lien: z.string().optional(),
      description: z.string(),
      descriptionEN: z.string(),
      date: z.string(),
      techno: z.array(z.string()).optional(),
      lienImgs: z.array(z.string()).optional(),
    });
    const nouveauProjetSansKey = {
      nom: dataAjoutProjet.nom,
      repository: dataAjoutProjet.repository,
      lien: dataAjoutProjet.lien,
      description: dataAjoutProjet.description,
      descriptionEN: dataAjoutProjet.descriptionEN,
      date: dataAjoutProjet.date,
      techno: dataAjoutProjet.technos,
      lienImgs: dataAjoutProjet.lienImgs,
    };
    const validationResult = projetSchema.safeParse(nouveauProjetSansKey);

    if (validationResult.success === false) {
      console.log(validationResult);
      console.log(nouveauProjetSansKey);
      setMessageMAJ("Veuillez remplir correctement le formulaire");
      return;
    } */
    try {
      const documentId = dataProfile.id;
      const docRef = doc(collection(db, "profile"), documentId);
      await updateDoc(docRef, dataProfile);
      setMessageMAJ("Document mis à jour avec succès !");
      updateProfile(dataProfile);
      /*      sessionStorage.setItem("profile", JSON.stringify([dataProfile])); */
    } catch (error: any) {
      setMessageMAJ(error);
      console.error("Erreur lors de la mise à jour du document :", error);
    }
  }

  // pour supprimer un element d'une liste
  function handleRemove(index: number, dataKey: string) {
    const updatedData = [...dataProfile[dataKey]];
    updatedData.splice(index, 1);
    setdataProfile((prevData: any) => ({
      ...prevData,
      [dataKey]: updatedData,
    }));
  }

  // pour ajouter un element d'une liste
  const [arrayValues, setarrayValues] = useState<ArrayValues>({
    autresMaitrise: "",
    langagesDecouverte: "",
    langagesMaitrise: "",
  });

  function handleAddSmtInArray(whichArray: string) {
    if (arrayValues[whichArray].trim() !== "") {
      const updatedData = [...dataProfile[whichArray], arrayValues[whichArray]];
      setdataProfile((prevData: any) => ({
        ...prevData,
        [whichArray]: updatedData,
      }));
      console.log("avant", arrayValues);
      setarrayValues({ ...arrayValues, [whichArray]: "" });
    }
  }

  return (
    <form className="form-admin" onSubmit={handleSubmit}>
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
          <small>le format du numero de telephone sera retourné tel quel</small>
          <label htmlFor="LangagesMaitrise">Langages maitrisés</label>
          {Array.isArray(dataProfile.langagesMaitrise) &&
            dataProfile.langagesMaitrise.map(
              (langage: string, index: number) => (
                <div className="techno-et-supprimer" key={index}>
                  <span>{langage}</span>
                  <button
                    type="button"
                    className="supprimer"
                    onClick={() => handleRemove(index, "langagesMaitrise")}
                  >
                    -
                  </button>
                </div>
              )
            )}
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

          <label htmlFor="LangagesDecouverte">Langages découverts</label>
          {Array.isArray(dataProfile.langagesDecouverte) &&
            dataProfile.langagesDecouverte.map(
              (langage: string, index: number) => (
                <div className="techno-et-supprimer" key={index}>
                  <span>{langage}</span>
                  <button
                    className="supprimer"
                    type="button"
                    onClick={() => handleRemove(index, "langagesDecouverte")}
                  >
                    -
                  </button>
                </div>
              )
            )}
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
            dataProfile.autresMaitrise.map((autre: string, index: number) => (
              <div className="techno-et-supprimer" key={index}>
                <span>{autre}</span>
                <button
                  className="supprimer"
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
            dataProfile.autresDecouverte.map((autre: string, index: number) => (
              <div className="techno-et-supprimer" key={index}>
                <span>{autre}</span>
                <button
                  className="supprimer"
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
          {messageMAJ && <p>{messageMAJ}</p>}
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
