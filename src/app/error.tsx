"use client";
import React from "react";

function error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div>
      <h1>Une erreur est survenue</h1>
      <h2>Nom de l'erreur: {error.name}</h2>
      <h3>{error.message}</h3>

      <button onClick={reset}>reset ! </button>
    </div>
  );
}

export default error;
