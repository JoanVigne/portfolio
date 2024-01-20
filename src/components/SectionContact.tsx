import { useProfileContext } from "@/context/ProfileContext";
import React, { useState, FormEvent } from "react";
import "./sectionContact.css";

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

const SectionContact = () => {
  const { profile } = useProfileContext();

  const [formStatus, setFormStatus] = useState("Send");
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("Submitting...");
    const { name, email, message } = e.target.elements;
    let conFom = {
      name: name.value,
      email: email.value,
      message: message.value,
    };
    console.log(conFom);
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
          <form onSubmit={onSubmit}>
            <div className="">
              <label className="" htmlFor="name">
                Name
              </label>
              <input className="" type="text" id="name" required />
            </div>
            <div className="mb-3">
              <label className="" htmlFor="email">
                Email
              </label>
              <input className="" type="email" id="email" required />
            </div>
            <div className="">
              <label className="" htmlFor="message">
                Message
              </label>
              <textarea className="" id="message" required />
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
