import React, { useEffect, useState } from "react";
import { profile } from "@/firebase/config";

const DisplayDataDB = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <p>Chargement en cours...</p>
      ) : (
        profile &&
        profile.length > 0 && (
          <ul>
            <li>Tel: {profile[0].telephone}</li>
            <ul>
              {profile[0].autresDecouverte &&
                profile[0].autresDecouverte.map((e, index) => (
                  <li key={index}>
                    {e}
                    {index !== profile[0].autresDecouverte.length - 1 && ", "}
                  </li>
                ))}
            </ul>
          </ul>
        )
      )}
    </>
  );
};

export default DisplayDataDB;
