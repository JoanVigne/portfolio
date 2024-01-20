"use client";
import "./globals.css";
import { AuthContextProvider } from "@/context/AuthContext";
import Header from "../components/Header";
import { ProfileProvider } from "@/context/ProfileContext";

import Head from "next/head";

//

//

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <Head>
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
        {/* twitter : */}
        <meta name="twitter:card" content="summary_large_image" />
        {/*  <meta name="twitter:site" content="@VOTRE_COMPTE_TWITTER" /> */}
        <meta
          name="twitter:title"
          content="Portfolio Joan Vigne - Développeur Web"
        />
        <meta
          name="twitter:description"
          content="Découvrez les compétences, projets et expériences de Joan Vigne, Développeur Web."
        />
        <meta name="twitter:image" content="/Joan.jpg" />
      </Head>

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
