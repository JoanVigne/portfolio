"use client";

import { newFetchDataDB } from "@/firebase/config";
import { useEffect } from "react";
import { useProfileContext } from "@/context/ProfileContext";

import "./page.css";
import SectionBanniere from "@/components/SectionBanniere";
import SectionProjets from "@/components/SectionProjets";
import SectionAPropos from "@/components/SectionAPropos";
import SectionContact from "@/components/SectionContact";
import SectionFormations from "@/components/SectionFormations";

export default function Home() {
  const { profile, updateProfile } = useProfileContext() || {};

  useEffect(() => {
    if (profile) {
      console.log("il y a le profile dans le context", profile);
      return;
    }
    const fetchProfile = async () => {
      try {
        const fetchedProfile = await newFetchDataDB("profile");
        if (fetchedProfile) {
          updateProfile(fetchedProfile[0]);
        } else {
          console.error("Le profil n'a pas été récupéré correctement");
        }
      } catch (error) {
        console.error("Erreur lors du fetch du profil :", error);
      }
    };
    fetchProfile();
  }, []);

  return (
    <main>
      <SectionBanniere />
      <SectionProjets />
      <SectionAPropos />
      <SectionFormations />
      <SectionContact />
    </main>
  );
}
