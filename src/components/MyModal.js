import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import "./myModal.css";
import FormEditProfile from "../components/FormEditProfile";
import FormEditProjets from "./FormEditProjets";
const MyModal = ({
  title,
  subtitle,
  contentP,
  contentForm,
  isOpen,
  closeModal,
}) => {
  // les differents forms
  const [thisForm, setThisForm] = useState(null);
  useEffect(() => {
    if (contentForm === "editProfile") {
      setThisForm(<FormEditProfile />);
    } else if (contentForm === "editProjets") {
      setThisForm(<FormEditProjets />);
    } else if (contentForm === "editFormations") {
      console.log("edit formations modal");
    } else {
      setThisForm("");
    }
  }, [contentForm]);

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
