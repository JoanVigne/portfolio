import React from "react";
import { test } from "@/firebase/config";

const DisplayDataDB = () => {
  return (
    <div>
      {test &&
        test.map((e, index) => (
          <div key={e.id}>
            <h2>element numero {index + 1}</h2>
            <p>{e.title}</p>
            <p>{e.id}</p>
            <p>{e.test}</p>
          </div>
        ))}
    </div>
  );
};

export default DisplayDataDB;
