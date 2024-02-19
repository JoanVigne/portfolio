import { useLanguage } from "@/context/LanguageContext";
import React from "react";

const Head = () => {
  const { language } = useLanguage();

  return (
    <>
      {language === "fr" ? (
        <head>
          <title>Joan Vigne - Dev Web</title>
          <meta
            name="description"
            content="Portfolio de Joan Vigne, Développeur Web. Découvrez mes compétences, projets et expériences dans le domaine du développement web."
          />
          <meta
            property="og:title"
            content="Portfolio Joan Vigne - Développeur Web"
          />
          <meta
            property="og:description"
            content="Découvrez les compétences, projets et expériences de Joan Vigne, Développeur Web."
          />
          <meta property="og:image" content="/Joan.jpg" />
          <meta property="og:url" content="URL_DU_PORTFOLIO" />
          <meta property="og:type" content="website" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta
            name="twitter:title"
            content="Portfolio Joan Vigne - Développeur Web"
          />
          <meta
            name="twitter:description"
            content="Découvrez les compétences, projets et expériences de Joan Vigne, Développeur Web."
          />
          <meta name="twitter:image" content="/Joan.jpg" />
        </head>
      ) : (
        <head>
          <title>Joan Vigne - Web Developer</title>
          <meta
            name="description"
            content="Portfolio of Joan Vigne, Web Developer. Discover my skills, projects, and experiences in the field of web development."
          />
          <meta
            property="og:title"
            content="Joan Vigne's Portfolio - Web Developer"
          />
          <meta
            property="og:description"
            content="Discover Joan Vigne's skills, projects, and experiences, Web Developer."
          />
          <meta property="og:image" content="/Joan.jpg" />
          <meta property="og:url" content="URL_OF_THE_PORTFOLIO" />
          <meta property="og:type" content="website" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta
            name="twitter:title"
            content="Joan Vigne's Portfolio - Web Developer"
          />
          <meta
            name="twitter:description"
            content="Discover Joan Vigne's skills, projects, and experiences, Web Developer."
          />
          <meta name="twitter:image" content="/Joan.jpg" />
        </head>
      )}
    </>
  );
};

export default Head;
