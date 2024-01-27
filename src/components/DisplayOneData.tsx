import React, { useEffect, useState } from "react";
import Loading from "./Loading";
interface DisplayOneDataProps {
  data: string | Record<string, string | Record<string, string>>;
}
const DisplayOneData: React.FC<DisplayOneDataProps> = ({ data }) => {
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
        <Loading />
      ) : (
        <>
          {typeof data === "string" && <p>{data}</p>}
          {typeof data === "object" && (
            <ul>
              {Object.values(data).map((element, index) => (
                <li key={index + String(element)}>
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
