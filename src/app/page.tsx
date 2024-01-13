'use client'
import { collection, doc, updateDoc } from 'firebase/firestore';
import { db, fetchDataDB } from '@/firebase/config';
import { useEffect, useState } from 'react';


export default function Home() { 

  const colRefName = "testing modify";
  const [dataTest, setDataTest] = useState([]);
  // recuperons les données 
  useEffect(() => {
    const fetchTestingData = async () => {
      const fetchedData = await fetchDataDB(colRefName);
      setDataTest(fetchedData);
    };
    fetchTestingData();
  },[])

  useEffect(() => {
    console.log("dataTest",dataTest)
  },[dataTest])

  const modifySmt = async (e, documentId) => {
    e.preventDefault();

    try {
      const colRef = collection(db, colRefName);
      const docRef = doc(colRef, documentId);

      const updatedData = {};

      const formData = new FormData(e.target);

      formData.forEach((value, key) => {
        const [element, field] = key.split('.');

        if (!updatedData[element]) {
          updatedData[element] = {};
        }

        if (field) {
          // Si le champ est "unTableau", assurez-vous que c'est un tableau
          if (element === "premierElement" && field === "unTableau") {
            if (!Array.isArray(updatedData[element][field])) {
              updatedData[element][field] = [];
            }
            // Ajoutez la nouvelle valeur à l'array existant
            updatedData[element][field].push(value);
          } else {
            updatedData[element][field] = value;
          }
        } else {
          updatedData[element] = value;
        }
      });

      await updateDoc(docRef, updatedData);

      console.log("Document mis à jour avec succès !");
    } catch (error) {
      console.error("Erreur lors de la mise à jour du document :", error);
    }
  };

  function generateFormFields(element, prefix = "") {
    return Object.keys(element).map((key) => {
      const fieldKey = prefix ? `${prefix}.${key}` : key;
  
      if (key === "id") {
        // Si la clé est "id", ne pas créer d'élément de formulaire
        return null;
      }
  
      if (typeof element[key] === "object" && element[key] !== null) {
        if (Array.isArray(element[key])) {
          // Si c'est un tableau, ajouter un input pour ajouter un nouvel élément
          return (
            <div key={fieldKey}>
              <label htmlFor={fieldKey}>{fieldKey}</label>
              {element[key].map((item, index) => (
                <div key={`${fieldKey}.${index}`}>
                  <input
                    type="text"
                    name={`${fieldKey}.${index}`}
                    defaultValue={item}
                  />
                </div>
              ))}
              {/* Bouton pour ajouter un nouvel élément dans le tableau */}
              <input type="text" name={"new"+prefix} id={"new"+prefix} />
              <button type="button" onClick={() => addNewElement(element, key)}>
                Ajouter Nouvel Élément
              </button>
            </div>
          );
        }
  
        return generateFormFields(element[key], fieldKey);
      }
  
      return (
        <div key={fieldKey}>
          <label htmlFor={fieldKey}>{fieldKey}</label>
          <input type="text" name={fieldKey} id={fieldKey} defaultValue={element[key]} />
        </div>
      );
    });
  }

  const addNewElement = (parentElement, arrayName) => {
    // Cette fonction est appelée lorsque vous souhaitez ajouter un nouvel élément à l'array
    setDataTest((prevData) => {
      const newData = [...prevData];
      const newArray = [...prevData[0][parentElement][arrayName], "Nouvel Élément"];
      newData[0][parentElement][arrayName] = newArray;
      return newData;
    });
  };

  return (
    <main>
    <p>New main</p>
    <form className="modify" onSubmit={(e) => modifySmt(e, dataTest[0].id)}>
      {dataTest.length > 0 && generateFormFields(dataTest[0])}
      <button>Modifier</button>
    </form>
  </main>
  );
}