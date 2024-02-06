import React, { useEffect, useState } from "react";
import "./sectionProjets.css";
import CardProjet from "./CardProjet";
import { fetchDataFromDBToSessionStorage } from "@/firebase/config";
import { useLanguage } from "@/context/LanguageContext";

interface ProjetData {
  [key: string]: {
    nom: string;
    date: string;
    repository: string;
    lien: string;
    description: string;
    techno: string[];
    lienImgs: string[];
  };
}

const SectionProjets = () => {
  // langue
  const { language } = useLanguage();

  const [projets, setProjets] = useState<ProjetData>({});

  useEffect(() => {
    const fetchFormations = async () => {
      const fetched = await fetchDataFromDBToSessionStorage("projets");
      setProjets(fetched[0]);
    };

    fetchFormations();
  }, []);

  return (
    <section className="section-projets" id="projets">
      {language === "fr" ? <h2>Projets</h2> : <h2>Projects</h2>}

      <div className="container-card-projet">
        {projets &&
          Object.keys(projets).map((projetKey) => {
            if (projetKey !== "id") {
              return <CardProjet key={projetKey} projet={projets[projetKey]} />;
            }

            return null;
          })}
      </div>
    </section>
  );
};

export default SectionProjets;
