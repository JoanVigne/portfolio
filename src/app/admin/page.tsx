"use client";
import React, { useEffect, useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import DisplayOneData from "../../components/DisplayOneData";
import { fetchDataDB } from "@/firebase/config";
import "./admin.css";
import Image from "next/image";
import MyModal from "@/components/MyModal";
import { useProfileContext } from "@/context/ProfileContext";

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
interface UserData {
  email: string;
}

interface FormationDetails {
  debut: string;
  location: string;
  nom: string;
  duree: string;
  etablissement: string;
  fin: string;
  langages?: string[];
  contenu?: string[];
  autres?: string[];
}
interface FormationsGeneralDetails {
  etablissement: string;
  location: string;
  nom: string;
  fin: string;
  duree: string;
  debut: string;
  langues: string[];
}

interface FormationsCodingDetails {
  [key: string]: FormationDetails;
}
interface Formations {
  formationsGeneral: FormationsGeneralDetails;
  formationsCoding: FormationsCodingDetails;
}


function Page() {
  const { user } = useAuthContext() as { user: UserData };
  const router = useRouter();
  const [loading, setLoading] = useState(true);

const [formations, setFormations] = useState<Formations[]>([]);


  console.log(formations);

  const { profile } = useProfileContext();
  console.log("profile au debut de admin()", profile);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const openModal = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };

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
    fetchFormations();
  }, []);

  if (user == null) {
    return (
      <>
        <h1>Only logged in users can view this page, so connect!</h1>
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
  } = profile[0] || ({} as ProfileData);

  const { formationsGeneral, formationsCoding } = (formations[0] ?? {}) as Formations;
  
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
              onClick={openModal}
            />
            <MyModal
              title="Un titre de test"
              subtitle="Un sous titre"
              contentP="Lorem ipsum osjfds cdsa k ndas "
              contentForm={"editProfile"}
              isOpen={modalIsOpen}
              closeModal={closeModal}
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
          {formationsCoding &&
            Object.entries(formationsCoding).map(([key, formaC], index) => (
              <div key={key + index}>
                <DisplayOneData data={formaC.nom} />
              </div>
            ))}
        </>
      )}
    </>
  );
}

export default Page;
