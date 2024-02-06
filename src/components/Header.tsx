import { getAuth, signOut } from "firebase/auth";
import Link from "next/link";
import React from "react";
import "./header.css";

import { useAuthContext } from "@/context/AuthContext";
import ChangerCSS from "./ChangerCSS";
import { useLanguage } from "@/context/LanguageContext";

interface UserData {
  email: string;
}
const Header = () => {
  // langue :
  const { language } = useLanguage();

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

  const { switchLanguage } = useLanguage();

  const handleChangeLanguage = (lang: string) => {
    switchLanguage(lang);
  };
  return (
    <header>
      <div className="logo-container">{/* J-V */}</div>
      <nav>
        {language === "fr" ? (
          <>
            <Link href="/">Accueil</Link>
            <Link href="/#projets">Projets</Link>
          </>
        ) : (
          <>
            <Link href="/">Home</Link>
            <Link href="/#projets">Projects</Link>
          </>
        )}

        <Link href="/#contact">Contact</Link>
        {user === null && (
          <>
            <Link href="/signin">Sign in</Link>
            {/*             <Link href="/signup">Sign up</Link> */}
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
          <Link href="">Change style</Link>
          <ul className="menu-deroulant">
            <li>
              <ChangerCSS annee="00" />
            </li>
            <li>
              <ChangerCSS annee="10" />
            </li>
            <li>
              <ChangerCSS annee="20" />
            </li>
          </ul>
        </div>
        <div className="styles-container">
          <Link href="">{language === "fr" ? "Langue" : "Language"}</Link>
          <ul className="menu-deroulant">
            <li>
              <input
                type="button"
                value="Français"
                onClick={() => handleChangeLanguage("fr")}
              />
              {/*  <button onClick={() => handleChangeLanguage("fr")}>
                Français
              </button> */}
            </li>
            <li>
              <input
                type="button"
                value="English"
                onClick={() => handleChangeLanguage("en")}
              />
              {/*   <button onClick={() => handleChangeLanguage("en")}>
                English
              </button> */}
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
