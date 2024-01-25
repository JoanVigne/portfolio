import Head from "next/head";
import React, { useEffect, useState } from "react";

const ChangerCSS = ({ annee }) => {
  function toggleClass() {
    const thisTheme = `theme-${annee}`;
    const bodyClasses = document.body.classList;
    // si bodyClasses contient thisTheme, enlever thisTheme, sinon ajouter thisTheme
    bodyClasses.toggle(thisTheme);
    /*     bodyClasses.add(`theme-${annee}`);
    console.log(bodyClasses);
    console.log("nouveau css : ", annee); */
  }
  return (
    <>
      <input
        type="button"
        value={`Style des années ${annee}`}
        onClick={toggleClass}
      />
    </>
  );
};

export default ChangerCSS;
