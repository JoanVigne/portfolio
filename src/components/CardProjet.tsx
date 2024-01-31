import React, { useEffect } from "react";
import "./cardProjet.css";

interface Projet {
  nom: string;
  date: string;
  repository: string;
  lien: string;
  description: string;
  techno: string[];
}
interface srcProjets {
  [key: string]: React.ReactNode;
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
      { threshold: 0.2 } // valeur de % de hauteur au scroll sur element
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

  const { nom, date, repository, lien, techno, description } = projet;

  const srcProjets: srcProjets = {
    "Lil Adventure": (
      <div className="img-projet-container">
        <img
          className="projet-img"
          src="/screen-projets/screenshot-liladventure-1.png"
          alt="jeu screenshot face à l'armée"
          loading="lazy"
        />
        {/* <img
          className="projet-img"
          src="/screenshot-liladventure-2.png"
          alt="jeu screenshot"
        /> */}
        <img
          className="projet-img"
          src="/screen-projets/screenshot-liladventure-3.png"
          alt="jeu screenshot personnage dans la neige"
          loading="lazy"
        />
        <img
          className="projet-img"
          src="/screen-projets/screenshot-liladventure-4.png"
          alt="jeu screenshot en combat"
          loading="lazy"
        />
      </div>
    ),
    "Daniel Vigne écrivain": (
      <div className="img-projet-container">
        <img
          className="projet-img"
          src="/screen-projets/screenshot-danielvigne-1.png"
          alt="jeu screenshot"
          loading="lazy"
        />
      </div>
    ),
    "Laura Touati Psychologue": (
      <div className="img-projet-container">
        <video
          width="381px"
          height="auto"
          autoPlay
          loop
          muted
          title="visite du site"
          aria-describedby="description-video"
        >
          <source
            src="/screen-projets/video-lauratouati-1.mp4"
            type="video/mp4"
          />
          Video de présentation de ce site
        </video>
        <p id="description-video" hidden>
          visite du site avec demonstration du passage de la souris sur le menu.
        </p>
      </div>
    ),
    "openclassrooms Sophie Bluel architecte": (
      <div className="img-projet-container">
        <img
          className="projet-img"
          src="/screen-projets/screenshot-sophiebluel-1.png"
          alt="projet openclassroom screenshot"
          loading="lazy"
        />
        <img
          className="projet-img"
          src="/screen-projets/screenshot-sophiebluel-2.png"
          alt="screenshot modale"
          loading="lazy"
        />
        <img
          className="projet-img"
          src="/screen-projets/screenshot-sophiebluel-3.png"
          alt="screenshot filtre dynamique"
          loading="lazy"
        />
      </div>
    ),
  };
  return (
    <div className="card-projet">
      <h3>{nom}</h3>
      {srcProjets[nom]}
      <h4>date de création : {date}</h4>
      <h4 className="projet-repo">
        <a href={repository} target="_blank">
          Repo github
        </a>
      </h4>

      <div className="techno-container">
        {techno &&
          techno.map((tec: string, index: number /* ( */) => {
            const tecMin = tec.toLowerCase().replace(/\s/g, ""); // Remplace les espaces par rien
            return (
              <img
                className="techno-logo"
                key={index}
                src={`logos/${tecMin}.png`}
                alt={tec}
              />
            );
          })}
      </div>

      <p>
        {description
          ? description
          : `
        Pas de description disponible
        `}
      </p>
      {lien && (
        <h4>
          <a className="projet-lien" href={lien} target="_blank">
            visiter le site
          </a>
        </h4>
      )}
    </div>
  );
};

export default CardProjet;
