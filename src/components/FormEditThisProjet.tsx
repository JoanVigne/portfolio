import React, { ChangeEvent, useState } from "react";
import "./formEditThisProjet.css";

interface FormData {
  nom: string | undefined;
  date: string | undefined;
  description: string | undefined;
  repository: string | undefined;
  techno: string[] | undefined;
}

const FormEditThisProjet: React.FC<{
  data: FormData;
  onSave: (newData: FormData) => void;
}> = ({ data, onSave }) => {
  const [formData, setFormData] = React.useState<FormData>(data);
  const [arrayValues, setArrayValues] = useState<{ technos: string }>({
    technos: "",
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTechnoChange = (
    index: number,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const newTechno = [...(formData.techno || [])];
    newTechno[index] = e.target.value;
    setFormData({ ...formData, techno: newTechno });
  };
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

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <form className="edit-this-projet">
      <label>Nom du projet:</label>
      <input
        type="text"
        name="nom"
        value={formData.nom || ""}
        onChange={handleInputChange}
        /* disabled */ // désactive l'input
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
      <label>Technologies utilisées:</label>

      {formData.techno &&
        formData.techno.map((techno, index) => (
          <div key={index}>
            {techno}
            <button
              className="supprimer"
              type="button"
              onClick={() => supprimerTechno(techno)}
            >
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
      <button type="button" onClick={handleSave}>
        Enregistrer
      </button>
    </form>
  );
};

export default FormEditThisProjet;
