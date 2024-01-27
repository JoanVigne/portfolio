import React, { createContext, useContext, ReactNode, useState } from "react";

interface ProfileContextValue {
  profile: any; // Replace 'any' with the actual type of your profile data
  updateProfile: (newProfile: any) => void; // Replace 'any' with the actual type of your profile data
}

interface ProfileProviderProps {
  children: ReactNode;
}

const ProfileContext = createContext<ProfileContextValue | undefined>(
  undefined
);

export const ProfileProvider: React.FC<ProfileProviderProps> = ({
  children,
}) => {
  const [profile, setProfile] = useState<any | null>(null); // Replace 'any' with the actual type of your profile data

  const updateProfile = (newProfile: any) => {
    setProfile(newProfile); // Replace 'any' with the actual type of your profile data
  };

  const value: ProfileContextValue = {
    profile,
    updateProfile,
  };

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
};

export const useProfileContext = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfileContext must be used within a ProfileProvider");
  }
  return context;
};
