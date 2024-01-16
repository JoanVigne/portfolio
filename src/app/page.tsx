"use client";
import { collection, doc, updateDoc } from "firebase/firestore";
import { db, fetchDataDB } from "@/firebase/config";
import { useEffect, useState } from "react";
import { useProfileContext } from "@/context/ProfileContext";

import Image from "next/image";
import DisplayOneData from "@/components/DisplayOneData";
import "./page.css";
import SectionBanniere from "@/components/SectionBanniere";
import SectionProjets from "@/components/SectionProjets";

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

export default function Home() {
  const { profile } = useProfileContext();
  console.log("profileData au debut de Home()", profile);

  /*   const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setLoading(false);
    };
    fetchData();
  }, []);
  if (loading) {
    return <p>Loading...</p>;
  } */
  return (
    <main>
      <SectionBanniere />
      <SectionProjets />
      <section className="section-a-propos">
        <div className="content">
          <h2>À propos ...</h2>
          {Array.isArray(profile) && profile.length > 0 && (
            <div className="infos">
              <DisplayOneData data={profile[0].prenom} />
              <DisplayOneData data={profile[0].nom} />
              <DisplayOneData data={profile[0].email} />
              <DisplayOneData data={profile[0].naissance} />
              <DisplayOneData data={profile[0].telephone} />
            </div>
          )}
          <div className="image-container">
            <img src="/Joan_big.jpg" alt="joan photo" />
          </div>
        </div>
      </section>
    </main>
  );
}
