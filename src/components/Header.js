import { getAuth, signOut } from "firebase/auth";
import Link from "next/link";
import React from "react";
import "./header.css";
import ToggleCSS from "../components/ToggleCSS";

const Header = () => {
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
    <header>
      <div className="logo-container">J-V</div>
      <nav>
        {" "}
        <Link href="/">home page</Link>
        <Link href="/admin">Admin</Link>
        <Link href="/signin">sign in</Link>
        <Link href="/signup">sign up</Link>
        <Link href="/" onClick={logOut}>
          Log out
        </Link>
      </nav>

      {/*   <ToggleCSS /> */}
      {/*       <input type="button" value="Logout" onClick={logOut} /> */}
    </header>
  );
};

export default Header;
