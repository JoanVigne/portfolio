"use client";
import React, { useState } from "react";
import signIn from "@/firebase/auth/signin";
import { useRouter } from "next/navigation";
import { useProfileContext } from "@/context/ProfileContext";
import Loading from "@/components/Loading";

function Page() {
  const { profile, updateProfile } = useProfileContext();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const router = useRouter();
  const [erreur, setErreur] = useState(false);
  const [messageErreur, setMessageErreur] = useState("");

  const handleForm = async (event) => {
    event.preventDefault();
    const { result, error } = await signIn(email, password);
    if (error) {
      setErreur(true);
      setMessageErreur(error.message);
      return console.log(error);
    }
    console.log(result);
    setErreur(false);
    setMessageErreur("");
    return router.push("/admin");
  };

  return (
    <div className="wrapper">
      <div className="form-wrapper">
        <h1 className="mt-60 mb-30">Sign in</h1>
        <form onSubmit={handleForm} className="form">
          <label htmlFor="email">
            <p>Email</p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              name="email"
              id="email"
              placeholder="example@mail.com"
            />
          </label>
          <label htmlFor="password">
            <p>Password</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              required
              type="password"
              name="password"
              id="password"
              placeholder="password"
            />
          </label>
          <button type="submit">Sign in</button>
        </form>
      </div>
      <Loading />
      {erreur && messageErreur}
    </div>
  );
}

export default Page;
