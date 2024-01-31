import React from "react";

interface ChangerCSSProps {
  annee: string;
}
const ChangerCSS: React.FC<ChangerCSSProps> = ({ annee }) => {
  function toggleClass() {
    const thisTheme = `theme-${annee}`;
    const bodyClasses = Array.from(document.body.classList);
    bodyClasses.forEach((cls) => document.body.classList.remove(cls));
    document.body.classList.add(thisTheme);
  }
  // STYLES DANS LE GLOBAL CSS
  return (
    <>
      <input
        type="button"
        value={`Des années ${annee}`}
        onClick={toggleClass}
      />
    </>
  );
};

export default ChangerCSS;
