import React, { useState } from "react";

const ToggleCSS: React.FC = () => {
  const [cssDesactive, setCssDesactive] = useState<boolean>(false);

  const toggleCSS = () => {
    const feuillesDeStyle = document.styleSheets;
    for (let i = 0; i < feuillesDeStyle.length; i++) {
      feuillesDeStyle[i].disabled = !cssDesactive;
    }
    setCssDesactive(!cssDesactive);
  };

  return (
    <input
      type="button"
      value={cssDesactive ? "Activer CSS" : "Désactiver CSS"}
      onClick={toggleCSS}
    />
  );
};

export default ToggleCSS;
