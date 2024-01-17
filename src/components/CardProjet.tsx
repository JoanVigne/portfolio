import React, { useEffect } from "react";
import "./cardProjet.css";

interface Projet {
  nom: string;
  date: string;
  repository: string;
  lien: string;
  techno: string[];
}

const CardProjet: React.FC<{ projet: Projet }> = ({ projet }) => {
  // Vérifie si projet est défini avant d'accéder à ses propriétés
  if (!projet) {
    return null;
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          }
        });
      },
      { threshold: 0.2 } // Ajuste la valeur en fonction de tes besoins
    );

    const allElementsInCards = document.querySelectorAll(".card-projet *");

    allElementsInCards.forEach((ele) => {
      observer.observe(ele);
    });

    const cards = document.querySelectorAll(".card-projet");
    cards.forEach((card) => {
      observer.observe(card);
    });

    return () => {
      allElementsInCards.forEach((ele) => {
        observer.unobserve(ele);
      });
      cards.forEach((card) => {
        observer.unobserve(card);
      });
    };
  }, []);

  const { nom, date, repository, lien, techno } = projet;

  return (
    <div className="card-projet">
      <h3>{nom}</h3>
      {/* Ajoutez d'autres propriétés selon vos besoins */}
      {/*       <img src="" alt={nom} /> */}
      <img className="projet-img" src="/Joan_big.jpg" alt="joan photo" />
      <h3>date de création : {date}</h3>
      <h3>
        <a className="projet-repo" href={repository} target="_blank">
          Repository github
        </a>
      </h3>

      <h3>Techno utilisées :</h3>
      <div className="techno-container">
        {techno &&
          techno.map((tec: string, index: number) => (
            <img
              className="techno-logo"
              key={index}
              src={`logos/${tec}.png`}
              alt={tec}
            />
          ))}
      </div>

      <p>
        Petit texte explicatif de plusieurs lignes qui raconte un peu l'histoire
        du projet
      </p>
      <h3>
        <a className="projet-lien" href={lien} target="_blank">
          visiter le site
        </a>
      </h3>
    </div>
  );
};

export default CardProjet;
