import React from "react";

import "./sectionAPropos.css";
import { useProfileContext } from "@/context/ProfileContext";
import { useLanguage } from "@/context/LanguageContext";

const SectionAPropos = () => {
  // langue :
  const { language } = useLanguage();

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
    const leReturn =
      language === "fr"
        ? `${otherItems.join(", ")} et ${lastItem}.`
        : `${otherItems.join(", ")} and ${lastItem}.`;
    return leReturn;
  };
  return (
    <section className="section-a-propos">
      {language === "fr" ? <h2>À propos</h2> : <h2>About me</h2>}

      <div className="content">
        <img
          src="/Joan_big.jpg"
          alt="joan travaillant portrait"
          loading="lazy"
        />

        <div className="infos-container">
          {language === "fr" ? (
            <p>
              <strong>Joan Vigne</strong>, professionnel de 33 ans passionné par
              le monde du <strong>développement web</strong> et de l'
              <strong>informatique</strong>, et engagé à apporter une{" "}
              <strong>valeur ajoutée</strong> à chaque projet.
              <br />
              Ayant un très bon niveau de français, d'anglais, et des notions
              avancées en italien et en portugais, je suis ouvert aux{" "}
              <strong>opportunités professionnelles</strong> partout dans le
              monde.
            </p>
          ) : (
            <p>
              <strong>Joan Vigne</strong>, a 33-year-old professional passionate
              about the world of <strong>web development</strong> and{" "}
              <strong>computer science</strong>, committed to bringing{" "}
              <strong>added value</strong> to each project.
              <br />
              With a very good level of French, English, and advanced knowledge
              of Italian and Portuguese, I am open to{" "}
              <strong>professional opportunities</strong> anywhere in the world.
            </p>
          )}

          <div className="matrisise-et-decouverte">
            {language === "fr" ? (
              <h3>Les langages et applications maitrisé</h3>
            ) : (
              <h3>Mastered languages and applications</h3>
            )}

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
            {language === "fr" ? (
              <h3>Les langages et applications que j'ai apprécié découvrir</h3>
            ) : (
              <h3>Languages and applications I've enjoyed exploring</h3>
            )}

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
