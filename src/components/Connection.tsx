import { getAuth, signOut } from "firebase/auth";
import React from "react";

const Connection = () => {
  function logOut() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log("LOGGED OUT");
        sessionStorage.clear();
      })
      .catch((error) => {
        // An error happened.
        console.error("this error occured :", error);
      });
  }
  return (
    <div>
      <button onClick={logOut}>Log out</button>
    </div>
  );
};

export default Connection;
