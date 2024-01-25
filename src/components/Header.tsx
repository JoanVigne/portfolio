import { getAuth, signOut } from "firebase/auth";
import Link from "next/link";
import React, { useEffect } from "react";
import "./header.css";
import ToggleCSS from "./ToggleCSS";
import { useAuthContext } from "@/context/AuthContext";
import ChangerCSS from "./ChangerCSS";

interface UserData {
  email: string;
}
const Header = () => {
  const { user } = useAuthContext() as { user: UserData };

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
        <Link href="/">Page d'accueil</Link>
        <Link href="/#projets">Projets</Link>
        <Link href="/#contact">Contact</Link>
        {user === null && (
          <>
            <Link href="/signin">sign in</Link>
            <Link href="/signup">sign up</Link>
          </>
        )}
        {user !== null && (
          <>
            {user?.email === "joan.vigne.pro@gmail.com" && (
              <Link href="/admin">Admin</Link>
            )}
            <Link href="/" onClick={logOut}>
              Log out
            </Link>
          </>
        )}
        <div className="styles-container">
          <Link href="">Changer le style</Link>
          <ul className="menu-deroulant">
            {/*             <li>

              <ToggleCSS />
            </li> */}
            <li>
              <ChangerCSS annee="90" />
            </li>
            <li>
              <ChangerCSS annee="00" />
            </li>
            <li>
              <ChangerCSS annee="10" />
            </li>
            <li>
              <ChangerCSS annee="20" />
            </li>
            <li>autre</li>
            <li>autre</li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
