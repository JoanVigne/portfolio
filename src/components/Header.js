import { getAuth, signOut } from "firebase/auth";
import Link from "next/link";
import React from "react";
import "./header.css";

const Header = () => {
  function logOut() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  }
  return (
    <header>
      <Link href="/">home page</Link>
      <Link href="/admin">Admin</Link>
      <Link href="/signin">sign in</Link>
      <Link href="/signup">sign up</Link>
      <Link href="/" onClick={logOut}>
        Log out
      </Link>
      {/*       <input type="button" value="Logout" onClick={logOut} /> */}
    </header>
  );
};

export default Header;
