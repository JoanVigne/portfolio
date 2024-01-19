// context/ProfileContext.js
import { createContext, useContext, useState } from "react";

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  console.log("profile dans le profileProvider, DEBUT ", profile);
  const updateProfile = (newProfile) => {
    setProfile(newProfile);
  };

  const value = {
    profile,
    updateProfile,
  };

  console.log("profile dans le profileProvider, FIN ", profile);
  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
};

export const useProfileContext = () => {
  return useContext(ProfileContext);
};
