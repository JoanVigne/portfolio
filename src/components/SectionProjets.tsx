import React, { useEffect, useState } from "react";
import "./sectionProjets.css";
import CardProjet from "./CardProjet";
import { fetchDataFromDBToSessionStorage } from "@/firebase/config";
import { useLanguage } from "@/context/LanguageContext";

interface Projet {
  nom: string;
  date: string;
  repository: string;
  lien: string;
  description: string;
  techno: string[];
  lienImgs: string[];
}

const SectionProjets = () => {
  // langue
  const { language } = useLanguage();

  const [projets, setProjets] = useState<Projet[]>([]);

  useEffect(() => {
    const fetchFormations = async () => {
      const fetched: { [key: string]: Projet } =
        await fetchDataFromDBToSessionStorage("projets");
      // trier par date :
      const sortedProjets = Object.values(fetched[0]).sort((a, b) => {
        // Vérifier si a.date et b.date sont définis
        if (a.date && b.date) {
          // Convertir les dates en objets Date
          const [monthA, yearA] = a.date.split("/");
          const [monthB, yearB] = b.date.split("/");
          // Comparer les années
          if (yearA !== yearB) {
            return parseInt(yearB) - parseInt(yearA);
          }
          // Si les années sont égales, comparer les mois
          return parseInt(monthB) - parseInt(monthA);
        } else {
          // Gérer le cas où a.date ou b.date est indéfini
          return 0;
        }
      });
      setProjets(sortedProjets);
    };

    fetchFormations();
  }, []);

  return (
    <section className="section-projets" id="projets">
      {language === "fr" ? <h2>Projets</h2> : <h2>Projects</h2>}

      <div className="container-card-projet">
        {projets &&
          projets.map((projet, index) => {
            if (projet.nom !== undefined) {
              return <CardProjet key={index} projet={projet} />;
            }
            return null;
          })}
      </div>
    </section>
  );
};

export default SectionProjets;
