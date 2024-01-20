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
            et la recherche de nouveaux <strong>défis</strong>.
          </p>
          <p>
            Mon <strong>engagement</strong> envers l'<strong>innovation</strong>{" "}
            se reflète dans mon approche énergique envers chaque projet. Je
            crois fermement en la <strong>flexibilité </strong>
            comme valeur fondamentale qui guide mon travail. C'est cette
            <strong> flexibilité</strong> qui me permet de rester à la pointe de
            mon domaine et de m'ouvrir aux <strong>opportunités</strong> partout
            dans le monde.
          </p>

          <p>
            Je m'engage à apporter une <strong>valeur ajoutée</strong> à chaque
            projet. Mon approche repose sur une{" "}
            <strong>exploration continue</strong> du monde du{" "}
            <strong>code</strong>. Rejoignez-moi dans cette{" "}
            <strong>aventure</strong>, et ensemble, nous pouvons repousser les{" "}
            <strong>limites</strong> de l'<strong>innovation</strong>.
          </p>
          <p>
            Je suis ouvert aux <strong>opportunités professionnelles</strong>{" "}
            partout dans le monde! N'hésitez pas à me <strong>contacter</strong>
            .
          </p>
        </div>
      </div>
    </section>
  );
};

export default SectionAPropos;
