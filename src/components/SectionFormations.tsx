import { fetchDataFromDBToSessionStorage } from "@/firebase/config";
import React, { useEffect, useState } from "react";
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
  [key: string]: FormationDetails;
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

  useEffect(() => {
    const fetchFormations = async () => {
      const fetchedFormations = await fetchDataFromDBToSessionStorage(
        "formations"
      );
      setFormations(fetchedFormations[0]);
    };
    fetchFormations();
  }, []);

  if (!formations) {
    return <Loading />;
  }

  // pour mettre des , et ET et . dans les listes :
  const formatList = (items: string[]): string => {
    if (items.length === 0) {
      return "";
    }
    if (items.length === 1) {
      return items[0];
    }
    const lastItem = items[items.length - 1];
    const otherItems = items.slice(0, -1);
    return `${otherItems.join(", ")} et ${lastItem}.`;
  };

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
                  const isExpanded =
                    element.classList.contains("contenu-expanded");
                  element.classList.toggle("contenu-expanded");
                  element.setAttribute("aria-hidden", String(isExpanded));
                }
              };

              return (
                <div key={etablissementSansEspace} className="formation-card">
                  <h3 className="etablissement-container">
                    <img
                      className="logo-etablissement"
                      src={`/logos/${etablissementSansEspace}.png`}
                      alt={"logo " + formation.etablissement}
                    />
                    {formation.etablissement}
                  </h3>

                  <h3>{formation.nom}</h3>

                  <h3>
                    Du {formation.debut} au {formation.fin}
                  </h3>
                  <button
                    className="en-savoir-plus"
                    onClick={handleEnSavoirPlusClick}
                  >
                    Contenu
                  </button>

                  <>
                    <ul
                      className={`contenu-list ${
                        formationKey === expandedContenu
                          ? "contenu-expanded"
                          : ""
                      }`}
                      id={etablissementSansEspace}
                      aria-hidden={formationKey !== expandedContenu}
                    >
                      {formation.contenu &&
                        formation.contenu.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      <li>
                        <h4>Langages :</h4>
                        {formation.langages /* ?.length > 0 */ && (
                          <>{formatList(formation.langages)} </>
                        )}
                      </li>
                      <li>
                        <h4>Autres App et frameworks :</h4>
                        {formation.autres /* ?.length > 0 */ && (
                          <>{formatList(formation.autres)} </>
                        )}
                      </li>
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
                <div key={etablissementSansEspace} className="formation-card">
                  <h3 className="etablissement-container">
                    <img
                      className="logo-etablissement"
                      src={`/logos/${etablissementSansEspace}.png`}
                      alt={"logo " + formation.etablissement}
                    />
                    {formation.etablissement}
                  </h3>
                  <h3>{formation.nom}</h3>

                  <h3>
                    Du {formation.debut} au {formation.fin}
                  </h3>
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
