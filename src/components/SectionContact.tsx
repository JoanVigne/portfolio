import { useProfileContext } from "@/context/ProfileContext";
import React, { useState, FormEvent, useRef, useContext } from "react";
import "./sectionContact.css";
import { collection, doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import { useLanguage } from "@/context/LanguageContext";

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
  // langue :
  const { language } = useLanguage();

  const { profile } = useProfileContext();

  const [formStatus, setFormStatus] = useState("Post");

  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formStatus == "Message envoyé !" || formStatus == "Message sent!") {
      const messagePourButton =
        language === "fr"
          ? "Vous avez deja envoyé un message, renvoyer un nouveau message?"
          : "You already sent a message, again?";
      setFormStatus(messagePourButton);
      return;
    }
    const messagePourButton =
      language === "fr" ? "Envoi du message..." : "Sending...";
    setFormStatus(messagePourButton);

    const formData = new FormData(e.target as HTMLFormElement);

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;
    if (!name || !email || !message) {
      const messagePourButton =
        language === "fr"
          ? "Veuillez remplir tous les champs"
          : "Please fill in all fields";
      setFormStatus(messagePourButton);
      return;
    }

    const dateEnvoi = new Date().toISOString();
    console.log({ name, email, message, dateEnvoi });

    const dataAEnvoyer = { name, email, message, dateEnvoi };
    try {
      const docRef = doc(collection(db, "messages"));
      await setDoc(docRef, dataAEnvoyer);

      const messagePourButton =
        language === "fr" ? "Message envoyé !" : "Message sent!";
      setFormStatus(messagePourButton);
      // formRef.current.reset();
    } catch (error) {
      console.error("Erreur lors de la mise à jour du document :", error);
      const messagePourButton =
        language === "fr"
          ? "Erreur lors de l'envoi du message. Veuillez réessayer"
          : "Error during sending, please try again";
      setFormStatus(messagePourButton);
    }
  };

  return (
    <section id="contact">
      {language === "fr" ? <h2>Me contacter</h2> : <h2>Contact me</h2>}
      <div className="contact-container">
        {profile && (
          <div className="contact-direct">
            <h3>Email : </h3>
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            {language === "fr" && (
              <>
                <h3>Par téléphone : </h3>
                <a href={`tel:${profile.telephone[0].replace(/\s/g, "")}`}>
                  {profile.telephone}
                </a>
              </>
            )}
          </div>
        )}

        <div className="form-container">
          {language === "fr" ? (
            <h3>Ou au moyen de ce formulaire :</h3>
          ) : (
            <h3>Or you can use this form:</h3>
          )}

          <form ref={formRef} onSubmit={onSubmit}>
            <div className="">
              <label className="" htmlFor="name">
                {language === "fr" ? "Nom" : "Name"}
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
