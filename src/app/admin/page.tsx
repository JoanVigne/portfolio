"use client";
import React, { useEffect, useState } from "react";
import { useAuthContext } from "@/context/AuthContext";

import DisplayOneData from "../../components/DisplayOneData";
import {
  fetchDataFromDBToSessionStorage,
  newFetchDataDB,
} from "@/firebase/config";
import "./admin.css";
import MyModal from "@/components/MyModal";
import { useProfileContext } from "@/context/ProfileContext";
import Loading from "@/components/Loading";
import Image from "next/image";
import {
  AdminOnlyError,
  AuthRequiredError,
} from "../errorExceptions/exceptions";

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
  {
    user &&
      user.email !== "joan.vigne.pro@gmail.com" &&
      (() => {
        throw new AuthRequiredError();
      })();
  }

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
  const [messages, setMessages] = useState<Array<{
    [key: string]: any;
  }> | null>(null);

  useEffect(() => {
    fetchMessages();
  }, []);
  async function fetchMessages() {
    const fetchedMessages = await fetchDataFromDBToSessionStorage("messages");
    setMessages(fetchedMessages);
  }
  function formaterDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return date.toLocaleDateString("fr-FR", options);
  }
  // PROJETS
  const [projets, setProjets] = useState<Array<{ [key: string]: any }> | null>(
    null
  );
  useEffect(() => {
    fetchProjets();
  }, []);
  async function fetchProjets() {
    const fetchedProjets = await fetchDataFromDBToSessionStorage("projets");
    setProjets(fetchedProjets);
  }
  // FORMATIONS
  const [formations, setFormations] = useState<Formations[]>([]);
  useEffect(() => {
    fetchFormations();
  }, []);
  async function fetchFormations() {
    const fetchedFormations = await fetchDataFromDBToSessionStorage(
      "formations"
    );
    setFormations(fetchedFormations);
  }
  // PROFILE
  const { profile, updateProfile } = useProfileContext() || {};
  useEffect(() => {
    if (profile) {
      console.log("profile dans context");
      return;
    }
    fetchProfile();
  }, []);
  async function fetchProfile() {
    const fetchedProfile = await newFetchDataDB("profile");
    if (fetchedProfile) {
      updateProfile(fetchedProfile[0]);
    }
  }
  if (user == null) {
    throw new AuthRequiredError();
  }
  if (loading) {
    return <Loading />;
  }

  const { formationsGeneral, formationsCoding } = (formations[0] ??
    {}) as Formations;

  return (
    <>
      <div className="bienvenue">
        <h1>Welcome {user.email}</h1>
      </div>

      <h2>
        Messages reçus :{" "}
        <button
          onClick={() => {
            sessionStorage.removeItem("messages");
            setMessages([]);

            setTimeout(() => {
              fetchMessages();
            }, 1000);
          }}
        >
          Refresh
        </button>
      </h2>
      <div className="messages-container">
        {messages && messages.length > 0 ? (
          messages
            .slice()
            .sort(
              (a, b) =>
                new Date(b.dateEnvoi).getTime() -
                new Date(a.dateEnvoi).getTime()
            )
            .map((mess, index) => {
              const date = new Date(mess.dateEnvoi);
              const dateFormatee = formaterDate(date);
              return (
                <div key={mess.id} className="message">
                  <h4>reçu le {dateFormatee}</h4>
                  <h4>de {mess.name}</h4>
                  <h4>{mess.email}</h4>
                  <div className="text-message">
                    <p>{mess.message}</p>
                  </div>
                </div>
              );
            })
        ) : (
          <Loading /> // Affiche le composant Loading si messages est un tableau vide
        )}
      </div>
      <div className="edits-container">
        {profile && user.email === "joan.vigne.pro@gmail.com" && (
          <div className="profile-edit-container">
            <h3>
              Edit Profile{" "}
              <Image
                className="edit-icon"
                src="/edit.png"
                alt="edit icon"
                width={14}
                height={14}
                priority
                onClick={toggleModal}
              />
            </h3>
            <div className="edit-card">
              <Image
                src={"/" + profile.prenom + ".jpg"}
                alt="joan photo"
                width={199}
                height={133}
              />
              <DisplayOneData data={profile.email} />
              <DisplayOneData data={profile.naissance} />
              <DisplayOneData data={profile.telephone} />

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
        {projets && user.email === "joan.vigne.pro@gmail.com" && (
          <div className="projets-edit-container">
            <h3>
              Edit Projets{" "}
              <Image
                className="edit-icon"
                src="/edit.png"
                alt="edit icon"
                width={14}
                height={14}
                priority
                onClick={toggleEditProjetsModal}
              />
            </h3>
            <div className="edit-card">
              {projets.map(
                (projet: { [key: string]: { nom: string; date: string } }) => {
                  const projectValues = Object.values(projet);
                  return projectValues.map((project) => (
                    <div key={project.nom + project.date}>
                      <h4>{project.nom}</h4>
                    </div>
                  ));
                }
              )}

              <MyModal
                title="Edit projets"
                subtitle="Les projets déjà dans la base de donnée :"
                contentP=""
                contentForm={"editProjets"}
                isOpen={modalEditProjets}
                closeModal={toggleEditProjetsModal}
              />
            </div>
          </div>
        )}
      </div>

      <h3>Mes tests persos : </h3>

      <h4>
        Image reçu directement depuis le storage de firebase avec un token qui
        expire potentiellement
      </h4>
      <img
        className="photo-joan"
        width="200px"
        src="https://firebasestorage.googleapis.com/v0/b/portfolio-nextjs-e43b8.appspot.com/o/Joan_big.jpg?alt=media&token=a9c57198-af36-42eb-bdf3-09272d8f3dd7"
        alt="photo Joan"
      />
    </>
  );
}

export default Page;
