import React, { useEffect } from "react";
import DisplayOneData from "./DisplayOneData";
import "./sectionAPropos.css";

const SectionAPropos = () => {
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

    const infos = document.querySelector(".infos-container") as HTMLElement;
    observer.observe(infos);

    return () => {
      observer.unobserve(infos);
    };
  }, []);

  return (
    <section className="section-a-propos">
      <h2>À propos ...</h2>
      <div className="content">
        <div className="image-container">
          <img src="/Joan_big.jpg" alt="joan photo" />
        </div>

        <div className="infos-container">
          <p>
            Je suis Joan Vigne, un professionnel de 33 ans passionné par le
            monde du développement web et de l'informatique. Mon engagement
            envers l'innovation se reflète dans mon approche énergique envers
            chaque projet. Mon parcours professionnel, caractérisé par une soif
            constante de connaissances et la recherche de nouveaux défis,
            témoigne de ma volonté de rester à la pointe de mon domaine. La
            flexibilité est une valeur fondamentale qui guide mon travail.
            Ouvert à des opportunités partout dans le monde, je crois fermement
            que la diversité des expériences et des cultures enrichit tant mes
            compétences techniques que ma perspective personnelle. Que ce soit
            la création de solutions logicielles élégantes, la résolution de
            problèmes complexes ou l'exploration des dernières avancées
            technologiques, je m'engage à apporter une valeur ajoutée à chaque
            projet. Rejoignez-moi dans cette exploration continue du monde du
            code, où chaque ligne écrite représente une opportunité de créer
            quelque chose de nouveau et de significatif.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SectionAPropos;
