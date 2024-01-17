import { useProfileContext } from "@/context/ProfileContext";
import React, { useEffect } from "react";
import DisplayOneData from "./DisplayOneData";
import "./sectionAPropos.css";

interface ProfileData {
  telephone?: string;
  email?: string;
  nom?: string;
  prenom?: string;
  naissance?: string;
  autresDecouverte?: string;
  autresMaitrise?: string;
  langagesDecouverte?: string;
  langagesMaitrise?: string;
}
const SectionAPropos = () => {
  const { profile } = useProfileContext();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          }
        });
      },
      { threshold: 0.2 } // Ajuste la valeur en fonction de tes besoins
    );

    const infos = document.querySelector(".infos-container") as HTMLElement;
    observer.observe(infos);

    return () => {
      observer.unobserve(infos);
    };
  }, []);
  return (
    <section className="section-a-propos">
      <h2>À propos ...</h2>
      <div className="content">
        <div className="image-container">
          <img src="/Joan_big.jpg" alt="joan photo" />
        </div>

        <div className="infos-container">
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Temporibus
            veritatis sapiente nemo placeat, culpa eveniet dignissimos molestiae
            molestias suscipit, ratione voluptate, omnis modi. Qui optio velit
            quam laudantium laborum soluta.
          </p>
        </div>
        {Array.isArray(profile) && profile.length > 0 && (
          <>
            <DisplayOneData data={profile[0].prenom} />
            <DisplayOneData data={profile[0].nom} />
            <DisplayOneData data={profile[0].email} />
            <DisplayOneData data={profile[0].naissance} />
            <DisplayOneData data={profile[0].telephone} />
          </>
        )}
      </div>
    </section>
  );
};

export default SectionAPropos;
