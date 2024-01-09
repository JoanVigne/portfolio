"use client";
import React, { useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase/config";

const ModifyDB = () => {
  const [title, setTitle] = useState("");
  const colRef = collection(db, "test");
  const addSmt = async (e) => {
    e.preventDefault();
    try {
      await addDoc(colRef, {
        title: title,
      });
      console.log("Document ajouté avec succès !");
    } catch (error) {
      console.error("Erreur lors de l'ajout du document :", error);
    }
  };
  const deleteSmt = async (e) => {
    e.preventDefault();
    try {
      const titleToDelete = e.target.titleToDelete.value;
      const querySnapshot = await getDocs(
        query(collection(db, "test"), where("title", "==", titleToDelete))
      );

      if (!querySnapshot.empty) {
        const docToDelete = querySnapshot.docs[0];
        console.log(docToDelete);
        await deleteDoc(docToDelete.ref);
        console.log("Document supprimé avec succès !");
      } else {
        console.log("Aucun document trouvé !");
      }
    } catch (error) {
      console.error("Erreur lors de la suppression du document :", error);
      console.error("Détails de l'erreur :", error);
      if (error.code) {
        console.error("Code d'erreur Firebase :", error.code);
      }
      if (error.message) {
        console.error("Message d'erreur Firebase :", error.message);
      }
    }
  };
  return (
    <div>
      <form action="" className="add" onSubmit={addSmt}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button>ADD</button>
      </form>
      <form action="" className="delete" onSubmit={deleteSmt}>
        <label htmlFor="titleToDelete">Document title:</label>
        <input type="text" name="titleToDelete" id="titleToDelete" />
        <button>Delete</button>
      </form>
    </div>
  );
};

export default ModifyDB;
