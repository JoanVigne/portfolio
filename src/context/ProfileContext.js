// context/ProfileContext.js
import { createContext, useContext, useState } from "react";

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState([]);
  console.log("profile dans le profileProvider, DEBUT ", profile);
  const updateProfile = (newProfile) => {
    setProfile(newProfile);
  };

  console.log("profile dans le profileProvider, FIN ", profile);
  return (
    <ProfileContext.Provider value={{ profile, updateProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfileContext = () => {
  return useContext(ProfileContext);
};
