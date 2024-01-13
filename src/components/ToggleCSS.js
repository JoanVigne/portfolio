import React from "react";
import { useState } from "react";

const ToggleCSS = () => {
  const [cssDesactive, setCssDesactive] = useState(false);

  const supprimerCSS = () => {
    var feuillesDeStyle = document.styleSheets;
    for (var i = 0; i < feuillesDeStyle.length; i++) {
      feuillesDeStyle[i].disabled = true;
    }
    setCssDesactive(true);
  };

  const reactiverCSS = () => {
    var feuillesDeStyle = document.styleSheets;
    for (var i = 0; i < feuillesDeStyle.length; i++) {
      feuillesDeStyle[i].disabled = false;
    }
    setCssDesactive(false);
  };

  return (
    <>
      {cssDesactive ? (
        <button onClick={reactiverCSS}>Activer CSS</button>
      ) : (
        <button onClick={supprimerCSS}>Désactiver CSS</button>
      )}
    </>
  );
};

export default ToggleCSS;
