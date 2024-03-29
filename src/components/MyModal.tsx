import React, { ReactNode, useEffect, useState } from "react";
import Modal from "react-modal";
import "./myModal.css";
import FormEditProfile from "./FormEditProfile";
import FormEditProjets from "./FormEditProjets";
interface MyModalProps {
  title: string;
  subtitle: string;
  contentP: string;
  contentForm: string;
  isOpen: boolean;
  closeModal: () => void;
}

const MyModal: React.FC<MyModalProps> = ({
  title,
  subtitle,
  contentP,
  contentForm,
  isOpen,
  closeModal,
}) => {
  // les differents forms
  const [thisForm, setThisForm] = useState<ReactNode | null>(null);
  useEffect(() => {
    if (contentForm === "editProfile") {
      setThisForm(<FormEditProfile />);
    } else if (contentForm === "editProjets") {
      setThisForm(<FormEditProjets />);
    } else if (contentForm === "editFormations") {
      console.log("edit formations modal");
    } else if (contentForm === "editThisProjet") {
      closeModal();
      return;
      console.log("editThisProjet");
      setThisForm(<FormEditProjets />);
    } else {
      setThisForm("");
    }
  }, [contentForm]);

  return (
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
      <h3>{subtitle}</h3>
      <p>{contentP}</p>
      {thisForm}
    </Modal>
  );
};

export default MyModal;
