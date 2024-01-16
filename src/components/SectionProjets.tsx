import React from "react";
import "./sectionProjets.css";
import CardProjet from "./CardProjet";

const SectionProjets = () => {
  return (
    <section className="section-projets">
      <h2>Projets</h2>
      <div className="container-card-projet">
        <CardProjet />
        <CardProjet />
        <CardProjet />
        <CardProjet />
      </div>
    </section>
  );
};

export default SectionProjets;
