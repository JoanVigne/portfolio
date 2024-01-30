import React from "react";

import "./sectionAPropos.css";
import { useProfileContext } from "@/context/ProfileContext";

const SectionAPropos = () => {
  const { profile } = useProfileContext() || {};

  const formatList = (items: string[]): string => {
    if (items.length === 0) {
      return "";
    }
    if (items.length === 1) {
      return items[0];
    }
    const lastItem = items[items.length - 1];
    const otherItems = items.slice(0, -1);
    return `${otherItems.join(", ")} et ${lastItem}.`;
  };
  return (
    <section className="section-a-propos">
      <h2>À propos ...</h2>
      <div className="content">
        <img
          src="/Joan_big.jpg"
          alt="joan travaillant portrait"
          loading="lazy"
        />

        <div className="infos-container">
          <p>
            <strong>Joan Vigne</strong>, professionnel de 33 ans passionné par
            le monde du
            <strong> développement web</strong> et de l'
            <strong>informatique</strong>, et engagé à apporter une{" "}
            <strong>valeur ajoutée</strong> à chaque projet.
            <br />
            Ayant un très bon niveau de français, d'anglais, et des notions
            avancées en italien et en portugais, je suis ouvert aux{" "}
            <strong>opportunités professionnelles</strong> partout dans le
            monde.{" "}
          </p>
          <div className="matrisise-et-decouverte">
            <h3>Les langages et applications maitrisé</h3>
            <ul>
              <li>
                {profile && profile.langagesMaitrise && (
                  <>{formatList(profile.langagesMaitrise)} </>
                )}
              </li>
              <li>
                {profile && profile.langagesMaitrise && (
                  <>{formatList(profile.autresMaitrise)} </>
                )}
              </li>
            </ul>
            <h3>Les langages et applications que j'ai apprécié découvrir</h3>
            <ul>
              <li>
                {profile && profile.langagesMaitrise && (
                  <>{formatList(profile.langagesDecouverte)} </>
                )}
              </li>
              <li>
                {profile && profile.langagesMaitrise && (
                  <>{formatList(profile.autresDecouverte)} </>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionAPropos;
