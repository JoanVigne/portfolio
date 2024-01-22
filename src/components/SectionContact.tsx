import { useProfileContext } from "@/context/ProfileContext";
import React, { useState, FormEvent, useRef } from "react";
import "./sectionContact.css";
import { collection, doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/config";

/* interface ProfileData {
  telephone?: string;
  email?: string;
  nom?: string;
  prenom?: string;
  naissance?: string;
  autresDecouverte?: string;
  autresMaitrise?: string;
  langagesDecouverte?: string;
  langagesMaitrise?: string;
} */

const SectionContact = () => {
  const { profile } = useProfileContext();

  const [formStatus, setFormStatus] = useState("Send");

  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formStatus == "Message envoyé !") {
      setFormStatus(
        "Vous avez deja envoyé un message, renvoyer un nouveau message?"
      );
      return;
    }
    setFormStatus("Envoi du message...");

    const formData = new FormData(e.target as HTMLFormElement);

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;
    if (!name || !email || !message) {
      setFormStatus("Veuillez remplir tous les champs.");
      return;
    }
    console.log({ name, email, message });
    const dataAEnvoyer = { name, email, message };
    try {
      const docRef = doc(collection(db, "messages"));
      await setDoc(docRef, dataAEnvoyer);
      console.log("Message envoyé avec succès !");
      setFormStatus("Message envoyé !");
      // formRef.current.reset();
    } catch (error) {
      console.error("Erreur lors de la mise à jour du document :", error);
      setFormStatus("Erreur lors de l'envoi du message. Veuillez réessayer.");
    }
  };

  return (
    <section id="contact">
      <h2>Me contacter</h2>
      <div className="contact-container">
        {profile && (
          <div className="contact-direct">
            <h3>
              Par email :{" "}
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </h3>
            <h3>
              Par téléphone :{" "}
              <a href={`tel:${profile.telephone.replace(/\s/g, "")}`}>
                {profile.telephone}
              </a>
            </h3>
          </div>
        )}
        <div className="form-container">
          <h3>Ou au moyen de ce formulaire :</h3>
          <form ref={formRef} onSubmit={onSubmit}>
            <div className="">
              <label className="" htmlFor="name">
                Nom
              </label>
              <input className="" type="text" id="name" name="name" required />
            </div>
            <div className="mb-3">
              <label className="" htmlFor="email">
                Email
              </label>
              <input
                className=""
                type="email"
                id="email"
                name="email"
                required
              />
            </div>
            <div className="">
              <label className="" htmlFor="message">
                Message
              </label>
              <textarea className="" id="message" name="message" required />
            </div>
            <button className="" type="submit">
              {formStatus}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SectionContact;
