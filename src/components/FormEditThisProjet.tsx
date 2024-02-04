import React, { ChangeEvent, useState } from "react";

interface FormData {
  nom: string | undefined;
  date: string | undefined;
  description: string | undefined;
  repository: string | undefined;
  techno: string[] | undefined;
  lienImg: string[] | undefined;
}

const FormEditThisProjet: React.FC<{
  data: FormData;
  onSave: (newData: FormData) => void;
}> = ({ data, onSave }) => {
  const [formData, setFormData] = React.useState<FormData>(data);
  const [arrayValues, setArrayValues] = useState<{ technos: string }>({
    technos: "",
  });
  const [arrayValuesImg, setArrayValuesImg] = useState<{ lienImgs: string }>({
    lienImgs: "",
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  /* 
  const handleTechnoChange = (
    index: number,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const newTechno = [...(formData.techno || [])];
    newTechno[index] = e.target.value;
    setFormData({ ...formData, techno: newTechno });
  }; */
  // technos :
  const ajouterTechno = () => {
    const technos = [...(formData.techno || [])];
    if (
      formData.techno &&
      formData.techno.indexOf(arrayValues.technos) === -1
    ) {
      technos.push(arrayValues.technos);
      setFormData({
        ...formData,
        techno: technos,
      });
    }
    setArrayValues({ technos: "" });
  };
  const supprimerTechno = (techno: string) => {
    const newTechnos = (formData.techno || []).filter((t) => t !== techno);
    setFormData({ ...formData, techno: newTechnos });
  };
  // lien imgs :
  const ajouterLienImg = () => {
    const lienImgs = [...(formData.lienImg || [])];
    if (
      formData.lienImg &&
      formData.lienImg.indexOf(arrayValuesImg.lienImgs) === -1
    ) {
      lienImgs.push(arrayValuesImg.lienImgs);
      setFormData({
        ...formData,
        lienImg: lienImgs,
      });
    }
    setArrayValuesImg({ lienImgs: "" });
  };
  const supprimerLienImg = (lienImg: string) => {
    const newLienImgs = (formData.lienImg || []).filter((l) => l !== lienImg);
    setFormData({ ...formData, lienImg: newLienImgs });
  };

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <form className="form-admin">
      <label>Nom du projet:</label>
      <input
        type="text"
        name="nom"
        value={formData.nom || ""}
        onChange={handleInputChange}
        disabled // désactive l'input
      />
      <p className="nom-message">Le nom du projet ne peut pas être modifié.</p>
      <label>Date:</label>
      <input
        type="text"
        name="date"
        value={formData.date || ""}
        onChange={handleInputChange}
      />
      <label>Description:</label>
      <textarea
        name="description"
        value={formData.description || ""}
        onChange={handleInputChange}
      />
      <label>Repository:</label>
      <input
        type="text"
        name="repository"
        value={formData.repository || ""}
        onChange={handleInputChange}
      />
      {/* techno ! */}
      <label>Technologies utilisées:</label>
      {formData.techno &&
        formData.techno.map((techno, index) => (
          <div key={index} className="element-et-supprimer">
            <p>{techno}</p>
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
      {/* lien img ! */}
      <label>Liens des images :</label>
      {formData.lienImg &&
        formData.lienImg.map((lien, index) => (
          <div key={index} className="element-et-supprimer">
            <p>{lien}</p>
            <img src={lien} alt={formData.nom} />
            <button
              className="supprimer"
              type="button"
              onClick={() => supprimerLienImg(lien)}
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
      <button type="button" onClick={ajouterLienImg}>
        + image
      </button>
      <button className="submit" type="button" onClick={handleSave}>
        Enregistrer
      </button>
    </form>
  );
};

export default FormEditThisProjet;
