"use client";
import React, { useEffect, useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import DisplayOneData from "../../components/DisplayOneData";
import { fetchDataDB } from "@/firebase/config";
import "./admin.css";
import Image from "next/image";
function Page() {
  const { user } = useAuthContext();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [formations, setFormations] = useState();
  const [profile, setProfile] = useState();

  useEffect(() => {
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchFormations = async () => {
      const fetchedFormations = await fetchDataDB("formations");
      setFormations(fetchedFormations);
    };
    const fetchProfile = async () => {
      const fetchedProfile = await fetchDataDB("profile");
      setProfile(fetchedProfile);
    };
    fetchProfile();
    fetchFormations();
  }, []);

  if (user == null) {
    return (
      <>
        <h1>Only logged in users can view this page, so conntect !</h1>
        <button onClick={() => router.push("/")}>home</button>
      </>
    );
  }
  if (loading) {
    return <p>Loading...</p>;
  }
  const {
    telephone,
    email,
    nom,
    prenom,
    naissance,
    autresDecouverte,
    autresMaitrise,
    langagesDecouverte,
    langagesMaitrise,
  } = profile[0] || {};
  const { formationsGeneral, formationsCoding } = formations[0] || {};
  return (
    <>
      <h1>You are connected, {user.email}</h1>

      {user.email === "joan.vigne.pro@gmail.com" && (
        <>
          <h3>Profile</h3>
          <div className="profileCard">
            <Image
              src={"/" + prenom + ".jpg"}
              alt="joan photo"
              width={199}
              height={133}
            />
            <DisplayOneData data={prenom} />
            <DisplayOneData data={nom} />
            <DisplayOneData data={email} />
            <DisplayOneData data={naissance} />
            <DisplayOneData data={telephone} />
            <Image
              className="edit-icon"
              src="/edit.png"
              alt="edit icon"
              width={14}
              height={14}
              priority
              onClick={() => console.log("pour modifier l'element profile")}
            />
          </div>

          <h3>Langages, frameworks et apps maitrisés :</h3>
          <DisplayOneData data={langagesMaitrise} />
          <DisplayOneData data={autresMaitrise} />
          <h3>Connaissances de base :</h3>
          <DisplayOneData data={langagesDecouverte} />
          <DisplayOneData data={autresDecouverte} />
          <h2>Les formations : </h2>
          <h3>Formations générals :</h3>
          <DisplayOneData data={formationsGeneral} />
          <h3>Formations dans le domaine de l'informatique :</h3>
          <DisplayOneData data={formationsCoding} />
          <h3>TEST JUSTE UN TRUC</h3>
          {Object.values(formationsCoding).map((formaC, index) => (
            <div key={formaC + index}>
              <DisplayOneData data={formaC.nom} />
            </div>
          ))}
        </>
      )}
    </>
  );
}
export default Page;
