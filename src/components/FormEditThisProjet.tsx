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
      <ul>
        {formData.techno &&
          formData.techno.map((tec: string, index: number) => (
            <li key={index}>
              <input
                type="text"
                value={tec}
                onChange={(e) => handleTechnoChange(index, e)}
              />
            </li>
          ))}
      </ul>
      <button type="button" onClick={handleSave}>
        Enregistrer
      </button>
    </form>
  );
};

export default FormEditThisProjet;
