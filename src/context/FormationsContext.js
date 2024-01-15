// context/FormationsContext.js
import { createContext, useContext, useState } from "react";

const FormationsContext = createContext();

export const FormationsProvider = ({ children }) => {
  const [formations, setFormations] = useState([]);
  console.log("formations dans le formationsProvider, DEBUT ", formations);
  if (
    Array.isArray(formations) &&
    formations.length > 0 &&
    typeof formations[0] === "object"
  ) {
    console.log("formations deja fetched !");
    return;
  }
  const updateFormations = (newFormations) => {
    setFormations(newFormations);
  };
  console.log("formations dans le formationsProvider, FIN ", formations);
  return (
    <FormationsContext.Provider value={{ formations, updateFormations }}>
      {children}
    </FormationsContext.Provider>
  );
};

export const useFormationsContext = () => {
  return useContext(FormationsContext);
};
