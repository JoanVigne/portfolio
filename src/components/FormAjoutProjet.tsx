import { db } from "@/firebase/config";
import { doc, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";

interface FormAjoutProjetProps {
  projets: Array<{ [key: string]: any }> | null;
  setProjets: React.Dispatch<
    React.SetStateAction<Array<{ [key: string]: any }> | null>
  >;
}
const FormAjoutProjet: React.FC<FormAjoutProjetProps> = ({
  projets,
  setProjets,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };
  const [dataAjoutProjet, setDataAjoutProjet] = useState({
    nom: "",
    repository: "",
    lien: "",
    description: "",
    date: "",
    technos: [] as string[],
    lienImgs: [] as string[],
  });

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setDataAjoutProjet((prevData) => ({
      ...prevData,
      [name]: name === "technos" ? [value] : value,
      [name]: name === "lienImgs" ? [value] : value,
    }));
  }
  // pour ajouter un element dans liste de techno
  const [arrayValues, setArrayValues] = useState({
    technos: "",
  });
  const [technos, setTechnos] = useState<string[]>([]);

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
  // pour ajouter un element dans liste des images
  const [arrayValuesImg, setArrayValuesImg] = useState({
    lienImgs: "",
  });
  const [lienImgs, setLienImgs] = useState<string[]>([]);

  const ajouterImg = () => {
    const nouvelleImg = arrayValuesImg.lienImgs.trim();
    if (nouvelleImg !== "" && !lienImgs.includes(nouvelleImg)) {
      setLienImgs([...lienImgs, nouvelleImg]);
      setArrayValuesImg({ lienImgs: "" });
      setDataAjoutProjet((prevData) => ({
        ...prevData,
        lienImgs: [...prevData.lienImgs, nouvelleImg],
      }));
    }
  };
  const supprimerImg = (lienImg: string) => {
    const nouveauxLienImgs = lienImgs.filter((l) => l !== lienImg);
    setLienImgs(nouveauxLienImgs);
  };
  const [messageMAJ, setMessageMAJ] = useState<string | null>(null);
  async function ajouterUnProjet(e: React.FormEvent) {
    e.preventDefault();
    // verification si date est au bon format en obligeant 7 characteres et contient 6 numbers
    const target = e.target as typeof e.target & {
      date: { value: string };
    };
    const dateValue = target.date.value;
    if (!/^\d{2}\/\d{4}$/.test(dateValue) || dateValue.length !== 7) {
      setMessageMAJ("Veuillez saisir une date au format MM/YYYY (ex: 10/2022)");
      return;
    }
    const nouveauProjet = {
      [dataAjoutProjet.nom.replace(/\s+/g, "-").toLowerCase()]: {
        nom: dataAjoutProjet.nom,
        repository: dataAjoutProjet.repository,
        description: dataAjoutProjet.description,
        date: dataAjoutProjet.date,
        techno: dataAjoutProjet.technos,
        lienImgs: dataAjoutProjet.lienImgs,
      },
    };

    try {
      await setDoc(doc(db, "projets", "bnj6s7XN4HZ19fVcNNv2"), nouveauProjet, {
        merge: true,
      });
      setMessageMAJ("Projet ajouté !");
      if (projets) {
        const newArray = [{ ...projets[0], ...nouveauProjet }];
        setProjets(newArray);
        sessionStorage.setItem("projets", JSON.stringify(newArray));
      }
      // reset le form
      setDataAjoutProjet({
        nom: "",
        repository: "",
        lien: "",
        description: "",
        date: "",
        technos: [],
        lienImgs: [],
      });
    } catch (error: any) {
      setMessageMAJ(error);
    }
  }
  return (
    <form
      onKeyDown={handleKeyDown} // pour gerer la touche "enter"
      action=""
      onSubmit={ajouterUnProjet}
      className="form-admin"
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
        placeholder="ex: 10/2022"
        type="text"
        name="date"
        id="date"
        value={dataAjoutProjet.date}
        onChange={handleInputChange}
      />
      {/*     pour les technos : */}
      <label htmlFor="technos">Technos</label>
      {technos.map((techno, index) => (
        <div key={index} className="techno-et-supprimer">
          {techno}
          <button
            className="supprimer"
            type="button"
            onClick={() => supprimerTechno(techno)}
          >
            -
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
      {/*     pour les images : */}
      <label htmlFor="technos">Liens des images</label>
      {lienImgs.map((lien, index) => (
        <div key={index} className="techno-et-supprimer">
          <p>{lien}</p>

          <button
            className="supprimer"
            type="button"
            onClick={() => supprimerImg(lien)}
          >
            -
          </button>
        </div>
      ))}
      <input
        type="text"
        value={arrayValuesImg.lienImgs}
        onChange={(e) => setArrayValuesImg({ lienImgs: e.target.value })}
      />
      <button type="button" onClick={ajouterImg}>
        + image
      </button>

      {messageMAJ && <p>{messageMAJ}</p>}
      <button type="submit">Ajouter ce nouveau projet</button>
    </form>
  );
};

export default FormAjoutProjet;
