import React, { useEffect, useState } from "react";
import "./formEditProfile.css";

const FormEditProfile = () => {
  const sessionStorageDATA = JSON.parse(sessionStorage.getItem("profile"));
  const [formData, setFormData] = useState(sessionStorageDATA?.[0] ?? {});
  // pour setFormData
  useEffect(() => {
    sessionStorageDATA[0].length > 0 && setFormData(sessionStorageDATA[0]);
    console.log("dans le useEffect");
    console.log("formData", formData);
  }, [sessionStorageDATA]);
  // change la value des inputs :
  function handleInputChange(e) {
    const { name, value } = e.target;
    const updatedValue = Array.isArray(value) ? value : value.split(",");
    setFormData((prevData) => ({
      ...prevData,
      [name]: updatedValue,
    }));
  }

  // submit le form
  function handleSubmit(e) {
    e.preventDefault();
    // Ajoutez ici la logique pour soumettre les données modifiées, par exemple, enregistrer dans sessionStorage ou envoyer à un backend
    console.log("Données modifiées :", formData);
  }

  // pour supprimer un element d'une liste
  function handleRemove(index, dataKey) {
    const updatedData = [...formData[dataKey]];
    updatedData.splice(index, 1);
    setFormData((prevData) => ({
      ...prevData,
      [dataKey]: updatedData,
    }));
  }

  // pour ajouter un element d'une liste
  const [theInputValue, setTheInputValue] = useState({
    autresMaitrise: "",
    langagesDecouverte: "",
    langagesMaitrise: "",
  });

  function handleAddLangage(whichArray) {
    if (theInputValue[whichArray].trim() !== "") {
      const updatedData = [...formData[whichArray], theInputValue[whichArray]];
      setFormData((prevData) => ({
        ...prevData,
        [whichArray]: updatedData,
      }));
      console.log("avant", theInputValue);
      setTheInputValue({ ...theInputValue, [whichArray]: "" });
      console.log("aprés", theInputValue);
      console.log("est bien passé par la");
    }
  }

  console.log(theInputValue);
  return (
    <form className="form-edit-profile" onSubmit={handleSubmit}>
      {sessionStorageDATA[0] && (
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
          <label htmlFor="LangagesMaitrise">Langages maitrisés</label>
          {Array.isArray(formData.langagesMaitrise) &&
            formData.langagesMaitrise.map((langage, index) => (
              <div key={index}>
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
              value={theInputValue.langagesMaitrise}
              onChange={(e) => {
                setTheInputValue({
                  ...theInputValue,
                  [e.target.name]: e.target.value,
                });
              }}
            />
            <button
              type="button"
              onClick={() => handleAddLangage("langagesMaitrise")}
            >
              +
            </button>
          </div>
          ////////////////////
          <label htmlFor="LangagesDecouverte">Langages découverts</label>
          {Array.isArray(formData.langagesDecouverte) &&
            formData.langagesDecouverte.map((langage, index) => (
              <div key={index}>
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
              value={theInputValue.langagesDecouverte}
              onChange={(e) => {
                setTheInputValue({
                  ...theInputValue,
                  [e.target.name]: e.target.value,
                });
              }}
            />
            <button
              type="button"
              onClick={() => handleAddLangage("langagesDecouverte")}
            >
              +
            </button>
          </div>
          <label htmlFor="autresMaitrise">Autres maitrisés</label>
          {Array.isArray(formData.autresMaitrise) &&
            formData.autresMaitrise.map((autre, index) => (
              <div key={index}>
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
              value={theInputValue.autresMaitrise}
              onChange={(e) => {
                setTheInputValue({
                  ...theInputValue,
                  [e.target.name]: e.target.value,
                });
              }}
            />
            <button
              type="button"
              onClick={() => handleAddLangage("autresMaitrise")}
            >
              +
            </button>
          </div>
          <input type="submit" value="Valider" />
          <input
            className="reset-form"
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
