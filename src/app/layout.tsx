'use client'
import './globals.css'
import { AuthContextProvider } from '@/context/AuthContext'
import Header from '../components/Header'
import { ProfileProvider, useProfileContext } from "@/context/ProfileContext";
import { useEffect } from 'react';
import { fetchDataDB } from '@/firebase/config';

//

//

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
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
          <ProfileProvider>
            <TheFetchedProfileData>
            {children}
            </TheFetchedProfileData>
          </ProfileProvider>
        </AuthContextProvider>
      </body>
    </html>
  )
}

const TheFetchedProfileData = ({ children }: { children: React.ReactNode }) => {
  const { profile, updateProfile } = useProfileContext();

  useEffect(() => {
    // Vérifiez si profile est un tableau vide
    if (Array.isArray(profile) && profile.length > 0) {
      console.log("est un tableau qui est superieur a 0")
      return;
    }
    if (Array.isArray(profile) && profile.length === 0) {
      console.log("Dans la condition profile est un tableau vide.");
      console.log("Au moment du fetch");

      const fetchProfile = async () => {
        try {
          const fetchedProfile = await fetchDataDB("profile");
          updateProfile(fetchedProfile);
        } catch (error) {
          console.error('Erreur lors du fetch du profil :', error);
        }
      };
      fetchProfile();
    }
  }, [profile]);

  return <>{children}</>;
};
