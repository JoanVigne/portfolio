import React, { useEffect } from "react";
import "./cardProjet.css";
import { useLanguage } from "@/context/LanguageContext";

interface Projet {
  nom: string;
  date: string;
  repository: string;
  lien: string;
  description: string;
  descriptionEN: string;
  techno: string[];
  lienImgs: string[];
}
interface srcProjets {
  [key: string]: React.ReactNode;
}

const CardProjet: React.FC<{ projet: Projet }> = ({ projet }) => {
  // langue :
  const { language } = useLanguage();
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

  const {
    nom,
    date,
    repository,
    lien,
    techno,
    description,
    descriptionEN,
    lienImgs,
  } = projet;

  const srcProjets: srcProjets = {
    "Lil Adventure": (
      <>
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
      </>
    ),
    "Daniel Vigne écrivain": (
      <>
        <img
          className="projet-img"
          src="/screen-projets/screenshot-danielvigne-1.png"
          alt="jeu screenshot"
          loading="lazy"
        />
      </>
    ),
    "Laura Touati Psychologue": (
      <>
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
      </>
    ),
    "openclassrooms Sophie Bluel architecte": (
      <>
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
      </>
    ),
  };
  return (
    <div className="card-projet">
      <h3>{nom}</h3>
      <div className="img-projet-container">
        {lienImgs && lienImgs.length > 0
          ? lienImgs.map((lienimg, index) => {
              return (
                <img
                  src={lienimg}
                  alt={nom + index}
                  className="du-storage"
                  key={index}
                  onError={(e) => {
                    // Si l'image ne peut pas être chargée, affiche simplement le nom de la technologie
                    e.currentTarget.style.display = "none";
                  }}
                />
              );
            })
          : srcProjets[nom]}
      </div>

      <h4>Date: {date}</h4>
      <h4 className="projet-repo">
        <a href={repository} target="_blank">
          Repo github
        </a>
      </h4>

      <div className="techno-container">
        {techno &&
          techno.map((tec: string, index: number /* ( */) => {
            const tecMin = tec.toLowerCase().replace(/\s/g, "");
            return (
              <img
                className="techno-logo"
                key={index}
                src={`logos/${tecMin}.png`}
                alt={tec}
                onError={(e) => {
                  // Si l'image ne peut pas être chargée, affiche simplement le nom de la technologie
                  e.currentTarget.style.display = "none";
                  e.currentTarget.insertAdjacentHTML(
                    "afterend",
                    `<p>${tec}</p>`
                  );
                }}
              />
            );
          })}
      </div>
      <p>{language === "fr" ? description : descriptionEN}</p>
      {lien && (
        <h4 className="projet-lien">
          <a href={lien} target="_blank">
            {language === "fr" ? "Voir le projet" : "View Project"}
          </a>
        </h4>
      )}
    </div>
  );
};

export default CardProjet;
