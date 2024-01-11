import React, { useEffect, useState } from "react";
import editIcon from "../../public/edit.png";
const DisplayOneData = ({ data }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      setLoading(false);
    };

    fetchData();
  }, []);

  // pour mettre des virgules entres les elements : {index !== e.length - 1 && ", "}
  return (
    <>
      {loading ? (
        <p>Chargement en cours...</p>
      ) : (
        <>
          {typeof data === "string" && <p>{data}</p>}
          {typeof data === "object" && (
            <ul>
              {Object.values(data).map((element, index) => (
                <li key={index + element}>
                  {typeof element === "object" ? (
                    Object.values(element).map((e, subIndex) => (
                      <div key={subIndex + e}>
                        <p>{e}</p>
                      </div>
                    ))
                  ) : (
                    <>
                      <p>{element}</p>
                    </>
                  )}
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </>
  );
};

export default DisplayOneData;
