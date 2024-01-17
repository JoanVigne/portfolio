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
import SectionAPropos from "@/components/SectionAPropos";

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
      <SectionAPropos />
    </main>
  );
}
