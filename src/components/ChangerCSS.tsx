import { useLanguage } from "@/context/LanguageContext";
import React from "react";

interface ChangerCSSProps {
  annee: string;
}
const ChangerCSS: React.FC<ChangerCSSProps> = ({ annee }) => {
  // langue
  const { language } = useLanguage();
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
        value={language === "fr" ? `Des années ${annee}` : `of the ${annee}'s`}
        onClick={toggleClass}
      />
    </>
  );
};

export default ChangerCSS;
