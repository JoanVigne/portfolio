"use client";
import "./globals.css";
import { AuthContextProvider } from "@/context/AuthContext";
import Header from "../components/Header";
import { ProfileProvider, useProfileContext } from "@/context/ProfileContext";
import {
  FormationsProvider,
  useFormationsContext,
} from "@/context/FormationsContext";
import { useEffect } from "react";
import { fetchDataDB, newFetchDataDB } from "@/firebase/config";
import { FetchData } from "@/data/FetchData";

//

//

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { profile, setProfile } = useProfileContext() || {};

  useEffect(() => {
    console.log("Dans le useEffect du RootLayout, ProfileProvider :", profile);

    const fetchProfile = async () => {
      try {
        const fetchedProfile = await newFetchDataDB("profile");
        setProfile(fetchedProfile);
      } catch (error) {
        console.error("Erreur lors du fetch du profil :", error);
      }
    };
    fetchProfile();
  }, [profile, setProfile]);

  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.js. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />

      <body>
        <Header />
        <AuthContextProvider>
          <ProfileProvider>{children}</ProfileProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}

/* const TheFetchedProfileData = ({ children }: { children: React.ReactNode }) => {
  const { profile, updateProfile } = useProfileContext();
  useEffect(() => {
    // Vérifiez si profile est un tableau vide
    if (Array.isArray(profile) && profile.length === 0) {
      const fetchProfile = async () => {
        try {
          const fetchedProfile = await fetchDataDB("profile");
          updateProfile(fetchedProfile);
        } catch (error) {
          console.error("Erreur lors du fetch du profil :", error);
        }
      };
      fetchProfile();
    }
  }, [profile]);

  return <>{children}</>;
};

const FetchAllData = ({ children }: { children: React.ReactNode }) => {
  // profile :
  const { profile, updateProfile } = useProfileContext();
  useEffect(() => {
    // Vérifiez si profile est un tableau vide
    if (Array.isArray(profile) && profile.length === 0) {
      const fetchProfile = async () => {
        try {
          const fetchedProfile = await fetchDataDB("profile");
          updateProfile(fetchedProfile);
        } catch (error) {
          console.error("Erreur lors du fetch du profil :", error);
        }
      };
      fetchProfile();
    }
  }, [profile, updateProfile]);

  // formations :
  const { formations, updateFormations } = useFormationsContext();
  useEffect(() => {
    // Vérifiez si formations est un tableau vide
    if (Array.isArray(formations) && formations.length === 0) {
      const fetchFormations = async () => {
        try {
          const fetchedFormations = await fetchDataDB("formations");
          updateFormations(fetchedFormations);
        } catch (error) {
          console.error("Erreur lors du fetch du formations :", error);
        }
      };
      fetchFormations();
    }
  }, [formations, updateFormations]);

  return <>{children}</>;
};
 */
