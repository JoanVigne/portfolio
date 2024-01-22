"use client";
import React, { useEffect, useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import DisplayOneData from "../../components/DisplayOneData";
import { fetchDataDB, newFetchDataDB } from "@/firebase/config";
import "./admin.css";
import MyModal from "@/components/MyModal";
import { useProfileContext } from "@/context/ProfileContext";
import Loading from "@/components/Loading";
import Image from "next/image";

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

  const [modalEditProfile, setmodalEditProfile] = useState(false);
  const toggleModal = () => {
    setmodalEditProfile(!modalEditProfile);
  };
  const [modalEditProjets, setModalEditProjets] = useState(false);
  const toggleEditProjetsModal = () => {
    setModalEditProjets(!modalEditProjets);
  };
  // peut etre inutile
  useEffect(() => {
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setLoading(false);
    };
    fetchData();
  }, []);

  // MESSAGES
  const [messages, setMessages] = useState(false);

  useEffect(() => {
    const fetchMessages = async () => {
      const fetchedMessges = await fetchDataDB("messages");
      setMessages(fetchedMessges);
    };
    fetchMessages();
  }, []);
  // PROJETS
  const [projets, setProjets] = useState(false);
  useEffect(() => {
    const sessionStorageProjets = sessionStorage.getItem("projets");
    setProjets(JSON.parse(sessionStorageProjets));
  }, []);

  // FORMATIONS
  const [formations, setFormations] = useState<Formations[]>([]);
  useEffect(() => {
    const fetchFormations = async () => {
      const fetchedFormations = await fetchDataDB("formations");
      setFormations(fetchedFormations);
    };
    fetchFormations();
  }, []);
  // PROFILE
  const { profile, updateProfile } = useProfileContext() || {};

  useEffect(() => {
    if (profile) {
      console.log("il y a le profile dans le context", profile);
      return;
    }
    console.log("Dans le useEffect du RootLayout, ProfileProvider :", profile);

    const fetchProfile = async () => {
      try {
        const fetchedProfile = await newFetchDataDB("profile");
        console.log(fetchedProfile);
        updateProfile(fetchedProfile[0]);
      } catch (error) {
        console.error("Erreur lors du fetch du profil :", error);
      }
    };
    fetchProfile();
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
    return <Loading />;
  }

  const { formationsGeneral, formationsCoding } = (formations[0] ??
    {}) as Formations;

  return (
    <>
      <h1>You are connected, {user.email}</h1>
      <h2>Messages reçu : </h2>
      <div className="messages-container">
        {messages &&
          messages.map((mess, index) => (
            <div key={mess.id}>
              {index == 0 ? (
                <h3>Dernier message :</h3>
              ) : (
                <h3>Ancien message</h3>
              )}

              <p>de {mess.name}</p>
              <p>Email: {mess.email}</p>
              <p>{mess.message}</p>
            </div>
          ))}
      </div>
      <h2>
        Image reçu directement depuis le storage de firebase avec un token qui
        expire potentiellement
      </h2>
      <img
        className="photo-joan"
        width="200px"
        src="https://firebasestorage.googleapis.com/v0/b/portfolio-nextjs-e43b8.appspot.com/o/Joan_big.jpg?alt=media&token=a9c57198-af36-42eb-bdf3-09272d8f3dd7"
        alt="photo Joan"
      />
      <div className="edits-container">
        {profile && user.email === "joan.vigne.pro@gmail.com" && (
          <div className="profile-edit-container">
            <h3>edit Profile</h3>
            <div className="edit-card">
              <Image
                src={"/" + profile.prenom + ".jpg"}
                alt="joan photo"
                width={199}
                height={133}
              />
              <DisplayOneData data={profile.prenom} />
              <DisplayOneData data={profile.nom} />
              <DisplayOneData data={profile.email} />
              <DisplayOneData data={profile.naissance} />
              <DisplayOneData data={profile.telephone} />
              <Image
                className="edit-icon"
                src="/edit.png"
                alt="edit icon"
                width={14}
                height={14}
                priority
                onClick={toggleModal}
              />
              <MyModal
                title="Edit profile"
                subtitle=""
                contentP=""
                contentForm={"editProfile"}
                isOpen={modalEditProfile}
                closeModal={toggleModal}
              />
            </div>
          </div>
        )}
        <div className="projets-edit-container">
          <h3>edit Projets</h3>
          <div className="edit-card">
            {projets &&
              projets.map((projet) => {
                const projectValues = Object.values(projet);
                return projectValues.map((project) => (
                  <div key={project.nom + project.date}>
                    <h3>{project.nom}</h3>
                  </div>
                ));
              })}
            <Image
              className="edit-icon"
              src="/edit.png"
              alt="edit icon"
              width={14}
              height={14}
              priority
              onClick={toggleEditProjetsModal}
            />
            <MyModal
              title="Edit projets"
              subtitle=""
              contentP=""
              contentForm={"editProjets"}
              isOpen={modalEditProjets}
              closeModal={toggleEditProjetsModal}
            />
          </div>
        </div>
      </div>
      <h3>Langages, frameworks et apps maitrisés :</h3>
      <DisplayOneData data={profile.langagesMaitrise} />
      <DisplayOneData data={profile.autresMaitrise} />
      <h3>Connaissances de base :</h3>
      <DisplayOneData data={profile.langagesDecouverte} />
      <DisplayOneData data={profile.autresDecouverte} />

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
  );
}

export default Page;
