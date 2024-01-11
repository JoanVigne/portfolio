import React from "react";

const FormEditProfile = () => {
  // boucler chaque data
  return (
    <form action="">
      <input type="text" value={a} />
      <Image
        className="edit-icon"
        src="/edit.png"
        alt="edit icon"
        width={14}
        height={14}
        priority
        onClick={() => console.log("pour modifier l'element profile")}
      />
    </form>
  );
};

export default FormEditProfile;
