import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import "./myModal.css";
import FormEditProfile from "../components/FormEditProfile";
const MyModal = ({
  title,
  subtitle,
  contentP,
  contentForm,
  isOpen,
  closeModal,
}) => {
  const [thisForm, setThisForm] = useState(null);

  useEffect(() => {
    if (contentForm === "editProfile") {
      setThisForm(<FormEditProfile />);
    }
    if (contentForm === "editFormations") {
      console.log("edit formations modal");
    }
  }, [contentForm]);

  if (!thisForm) {
    return null; // Renvoyer quelque chose de valide ou rien selon votre logique
  }

  return (
    <>
      <Modal
        className="my-modal-container"
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        ariaHideApp={false}
      >
        <h2 ref={(titleRef) => (titleRef = titleRef)}>{title}</h2>
        <button onClick={closeModal} className="close-modal">
          x
        </button>
        <h2>{subtitle}</h2>
        <p>{contentP}</p>
        {thisForm}
      </Modal>
    </>
  );
};

export default MyModal;
