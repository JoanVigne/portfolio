// context/ProfileContext.js
import { createContext, useContext, useState } from "react";

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState([]);
  console.log("profile dans le profileProvider, DEBUT ", profile);
  if (
    Array.isArray(profile) &&
    profile.length > 0 &&
    typeof profile[0] === "object"
  ) {
    console.log("profile deja fetched, pas besoin de le refaire !");
    return;
  }
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
