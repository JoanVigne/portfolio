import React, { useEffect, useState } from "react";

const FormEditProfile = () => {
  const sessionStorageDATA = JSON.parse(sessionStorage.getItem("profile"));
  const [formData, setFormData] = useState(sessionStorageDATA[0]);

  function handleInputChange(e) {
    const { name, value } = e.target;

    const updatedValue = Array.isArray(value) ? value : value.split(",");

    setFormData((prevData) => ({
      ...prevData,
      [name]: updatedValue,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Ajoutez ici la logique pour soumettre les données modifiées, par exemple, enregistrer dans sessionStorage ou envoyer à un backend
    console.log("Données modifiées :", formData);
  }
  function handleRemoveLangage(index) {
    const updatedLangagesDecouverte = [...formData.langagesDecouverte];
    updatedLangagesDecouverte.splice(index, 1);
    setFormData((prevData) => ({
      ...prevData,
      langagesDecouverte: updatedLangagesDecouverte,
    }));
  }

  return (
    <form onSubmit={handleSubmit}>
      {sessionStorageDATA && (
        <>
          <label htmlFor="email">E-mail</label>
          <input
            type="text"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleInputChange}
          />

          <label htmlFor="telephone">Téléphone</label>
          <input
            type="text"
            name="telephone"
            id="telephone"
            value={formData.telephone}
            onChange={handleInputChange}
          />
          <label htmlFor="LangageMaitrise">Langages maitrisés</label>
          <input
            type="text"
            name="LangageMaitrise"
            id="LangageMaitrise"
            value={formData.telephone}
            onChange={handleInputChange}
          />
          <label htmlFor="LangagesDecouverte">Langages découverts</label>
          {Array.isArray(formData.langagesDecouverte) &&
            formData.langagesDecouverte.map((langage, index) => (
              <div key={index}>
                <input
                  type="text"
                  name="LangagesDecouverte"
                  value={langage}
                  onChange={(e) => {
                    const updatedLangagesDecouverte = [
                      ...formData.langagesDecouverte,
                    ];
                    updatedLangagesDecouverte[index] = e.target.value;
                    handleInputChange({
                      target: {
                        name: "LangagesDecouverte",
                        value: updatedLangagesDecouverte,
                      },
                    });
                  }}
                />
                <button
                  type="button"
                  onClick={() => handleRemoveLangage(index)}
                >
                  Supprimer
                </button>
              </div>
            ))}
          <div>
            <input
              type="text"
              name="LangagesDecouverte"
              value={""}
              onChange={(e) => {
                // Ajouter la logique pour gérer l'ajout d'un nouvel élément
                const updatedLangagesDecouverte = [
                  ...formData.langagesDecouverte,
                  e.target.value,
                ];
                handleInputChange({
                  target: {
                    name: "LangagesDecouverte",
                    value: updatedLangagesDecouverte,
                  },
                });
              }}
            />
            <button type="button" onClick={() => handleAddLangage()}>
              Ajouter
            </button>
          </div>
          <input type="submit" value="Valider" />
          <input
            type="button"
            value="Reset"
            onClick={() => setFormData(sessionStorageDATA[0])}
          />
        </>
      )}
    </form>
  );
};
export default FormEditProfile;
