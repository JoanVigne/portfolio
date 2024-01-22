import { fetchDataDB } from "@/firebase/config";
import React, { useEffect, useState } from "react";
import DisplayOneData from "./DisplayOneData";
import Loading from "./Loading";
import "./sectionFormations.css";

interface FormationDetails {
  debut: string;
  location: string;
  nom: string;
  duree: string;
  etablissement: string;
  fin: string;
  langages?: string[];
  contenu?: string[];
  autres?: string[];
}
interface FormationsGeneralDetails {
  etablissement: string;
  location: string;
  nom: string;
  fin: string;
  duree: string;
  debut: string;
  langues: string[];
}

interface FormationsCodingDetails {
  [key: string]: FormationDetails;
}
interface Formations {
  formationsGeneral: FormationsGeneralDetails;
  formationsCoding: FormationsCodingDetails;
}

const SectionFormations = () => {
  // FORMATIONS
  const [formations, setFormations] = useState<Formations | null>(null);
  const [expandedContenu, setExpandedContenu] = useState<string | null>(null);
  const toggleContenu = (formationKey: string) => {
    setExpandedContenu((prevExpandedContenu) =>
      prevExpandedContenu === formationKey ? null : formationKey
    );
  };

  useEffect(() => {
    const fetchFormations = async () => {
      const fetchedFormations = await fetchDataDB("formations");
      setFormations(fetchedFormations[0]);
    };
    fetchFormations();
  }, []);

  if (!formations) {
    // Ajoutez ici le code ou le composant que vous souhaitez afficher pendant le chargement
    return <Loading />;
  }
  return (
    <section className="section-formations">
      <div className="coding-formations-container formations-container">
        <h2> Mes formations dans le domaine du numérique :</h2>
        {formations && (
          <div className="formations-groupe-container ">
            {Object.keys(formations.formationsCoding).map((formationKey) => {
              const formation = formations.formationsCoding[formationKey];
              const etablissementSansEspace = formation.etablissement.replace(
                /\s/g,
                "-"
              );

              const handleEnSavoirPlusClick = () => {
                const element = document.getElementById(
                  etablissementSansEspace
                );

                if (element) {
                  // Vous pouvez manipuler la classe ou la hauteur directement ici
                  element.classList.toggle("contenu-expanded");
                }
              };

              return (
                <div key={formation} className="formation-card">
                  <div className="etablissement-container">
                    <img
                      className="logo-etablissement"
                      src={`/logos/${etablissementSansEspace}.png`}
                      alt="logo etablissement"
                    />
                    {formation.etablissement}
                  </div>

                  <h3>{formation.nom}</h3>

                  <p>
                    Du {formation.debut} au {formation.fin}
                  </p>
                  <button
                    className="en-savoir-plus"
                    onClick={handleEnSavoirPlusClick}
                  >
                    En savoir plus
                  </button>

                  <>
                    <ul
                      className={`contenu-list ${
                        formationKey === expandedContenu
                          ? "contenu-expanded"
                          : ""
                      }`}
                      id={etablissementSansEspace}
                    >
                      {formation.contenu &&
                        formation.contenu.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                    </ul>
                  </>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className="autres-formations-container formations-container">
        <h2>Mes autres formations : </h2>
        {formations && (
          <div className="formations-groupe-container ">
            {Object.keys(formations.formationsGeneral).map((formationKey) => {
              const formation = formations.formationsGeneral[formationKey];
              const etablissementSansEspace = formation.etablissement.replace(
                /\s/g,
                "-"
              );
              return (
                <div key={formation} className="formation-card">
                  <div className="etablissement-container">
                    <img
                      className="logo-etablissement"
                      src={`/logos/${etablissementSansEspace}.png`}
                      alt="logo etablissement"
                    />
                    {formation.etablissement}
                  </div>
                  <h3>{formation.nom}</h3>

                  <p>
                    Du {formation.debut} au {formation.fin}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default SectionFormations;
