"use client";
import "./globals.css";
import { AuthContextProvider } from "@/context/AuthContext";
import Header from "../components/Header";
import { ProfileProvider } from "@/context/ProfileContext";
import { LanguageProvider } from "@/context/LanguageContext";
import Head from "@/components/Head";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LanguageProvider>
      <html lang="fr">
        {/* <head>
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
          {/* twitter : 
          <meta name="twitter:card" content="summary_large_image" />
          {/*  <meta name="twitter:site" content="@VOTRE_COMPTE_TWITTER" /> 
          <meta
            name="twitter:title"
            content="Portfolio Joan Vigne - Développeur Web"
          />
          <meta
            name="twitter:description"
            content="Découvrez les compétences, projets et expériences de Joan Vigne, Développeur Web."
          />
          <meta name="twitter:image" content="/Joan.jpg" />
        </head> */}
        <Head />
        <body>
          <AuthContextProvider>
            <Header />
            <ProfileProvider>{children}</ProfileProvider>
          </AuthContextProvider>
        </body>
      </html>
    </LanguageProvider>
  );
}
