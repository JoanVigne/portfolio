"use client";
import Loading from "@/components/Loading";
import { useLanguage } from "@/context/LanguageContext";
import { useProfileContext } from "@/context/ProfileContext";
import { newFetchDataDB } from "@/firebase/config";
import React, { useEffect, useState } from "react";

const Page = () => {
  // langue :
  const { language } = useLanguage();
  // PROFILE
  const { profile, updateProfile } = useProfileContext() || {};
  useEffect(() => {
    if (profile) {
      console.log("profile dans context");
      return;
    }
    fetchProfile();
  }, []);
  async function fetchProfile() {
    const fetchedProfile = await newFetchDataDB("profile");
    if (fetchedProfile) {
      updateProfile(fetchedProfile[0]);
    }
  }

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setLoading(false);
    };
    fetchData();
  }, []);
  return (
    <div>
      {language === "fr" ? (
        <div className="mentions-legales">
          <h1>Mentions Légales</h1>

          <p>
            Conformément aux dispositions des Articles 6-III et 19 de la Loi
            n°2004-575 du 21 juin 2004 pour la Confiance dans l'économie
            numérique, dite L.C.E.N., il est porté à la connaissance des
            utilisateurs et visiteurs du site [Nom de votre site] les présentes
            mentions légales.
          </p>

          <p>
            Le site [Nom de votre site] est accessible à l'adresse suivante :{" "}
            [URL de votre site]. L'accès et l'utilisation du site sont soumis
            aux présentes "Mentions légales" détaillées ci-après ainsi qu'aux
            lois et/ou règlements applicables.
          </p>

          <h2>Éditeur du site:</h2>
          {loading && <Loading />}
          {profile && (
            <p>
              {profile.prenom} {profile.nom}
              <br />
              {profile.telephone}
              <br />
              {profile.email}
              <br />
            </p>
          )}
        </div>
      ) : (
        <div className="mentions-legales">
          <h1>Legal Notice</h1>

          <p>
            In accordance with the provisions of Articles 6-III and 19 of Law
            No. 2004-575 of June 21, 2004 on Confidence in the Digital Economy,
            known as the LCEN, users and visitors of the website [Your Website
            Name] are informed of the following legal notices.
          </p>

          <p>
            The website [Your Website Name] is accessible at the following
            address: [Your Website URL]. Access to and use of the website are
            subject to the following "Legal Notices" detailed below as well as
            applicable laws and/or regulations.
          </p>

          <h2>Website Publisher:</h2>
          {loading && <Loading />}
          {profile && (
            <p>
              {profile.prenom} {profile.nom}
              <br />
              {profile.email}
              <br />
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Page;
