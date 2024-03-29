"use client";

import { newFetchDataDB } from "@/firebase/config";
import { useEffect } from "react";
import { useProfileContext } from "@/context/ProfileContext";

import SectionBanniere from "@/components/SectionBanniere";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useLanguage } from "@/context/LanguageContext";

const LazySectionProjets = dynamic(
  () => import("@/components/SectionProjets"),
  {
    loading: () => <p>Loading...</p>,
  }
);

const LazySectionAPropos = dynamic(
  () => import("@/components/SectionAPropos"),
  {
    loading: () => <p>Loading...</p>,
  }
);

const LazySectionFormations = dynamic(
  () => import("@/components/SectionFormations"),
  {
    loading: () => <p>Loading...</p>,
  }
);

const LazySectionContact = dynamic(
  () => import("@/components/SectionContact"),
  {
    loading: () => <p>Loading...</p>,
  }
);

export default function Home() {
  const { language } = useLanguage();
  const { profile, updateProfile } = useProfileContext() || {};

  useEffect(() => {
    if (profile) {
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
      <LazySectionProjets />
      <LazySectionAPropos />
      <LazySectionFormations />
      <LazySectionContact />
      <footer>
        <Link href="/mentionsLegales">
          {language === "fr" ? "Mentions légales" : "Legal notices"}
        </Link>
      </footer>
    </main>
  );
}
