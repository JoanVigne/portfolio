"use client";
import React from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import ModifyDB from "../../components/ModifyDB";
import DisplayDataDB from "../../components/DisplayDataDB";
function Page() {
  const { user } = useAuthContext();
  const router = useRouter();

  if (user == null) {
    return (
      <>
        <h1>Only logged in users can view this page, so conntect !</h1>
        <button onClick={() => router.push("/")}>home</button>
      </>
    );
  }
  if (user !== null) {
    return (
      <>
        <h1>You are connected, {user.email}</h1>
        <p>modifier trucs</p>

        {user.email === "joan.vigne.pro@gmail.com" && (
          <>
            <p>"ok c'est le bon mail"</p>
            <ModifyDB />
            <DisplayDataDB />
          </>
        )}
      </>
    );
  }
}

export default Page;
