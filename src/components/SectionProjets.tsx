import React, { useEffect, useState } from "react";
import "./sectionProjets.css";
import CardProjet from "./CardProjet";
import { fetchDataDB } from "@/firebase/config";

interface ProjetData {
  [key: string]: {
    nom: string;
    date: string;
    repository: string;
    lien: string;
    techno: string[];
  };
}

const SectionProjets = () => {
  const [projets, setProjets] = useState<ProjetData>({});

  useEffect(() => {
    const fetchFormations = async () => {
      const fetched = await fetchDataDB("projets");
      setProjets(fetched[0]);
    };

    fetchFormations();
  }, []);

  return (
    <section className="section-projets" id="projets">
      <h2>Projets</h2>
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
