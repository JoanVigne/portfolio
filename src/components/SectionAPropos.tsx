import React from "react";

import "./sectionAPropos.css";

const SectionAPropos = () => {
  return (
    <section className="section-a-propos">
      <h2>À propos ...</h2>
      <div className="content">
        <img src="/Joan_big.jpg" alt="joan photo" />

        <div className="infos-container">
          <p>
            <strong>Joan Vigne</strong>, professionnel de 33 ans passionné par
            le monde du
            <strong> développement web</strong> et de l'
            <strong>informatique</strong>. Mon parcours professionnel est
            caractérisé par une soif constante de <strong>connaissances</strong>{" "}
            et la recherche de nouveaux <strong>défis</strong>. Je crois
            fortement en la <strong>flexibilité</strong>, valeur clé orientant
            mon travail, me permettant de rester à la <strong>pointe</strong> de
            mon domaine et de saisir des <strong>opportunités</strong>{" "}
            mondiales. Je m'engage à apporter une{" "}
            <strong>valeur ajoutée</strong> à chaque projet. Mon approche repose
            sur une <strong>exploration continue</strong> du monde du{" "}
            <strong>code</strong>. Je suis ouvert aux{" "}
            <strong>opportunités professionnelles</strong> partout dans le
            monde! N'hésitez pas à me <strong>contacter</strong>.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SectionAPropos;
