import React, { createContext, useState, useContext, ReactNode } from "react";

interface LanguageContextType {
  language: string;
  switchLanguage: (lang: string) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
}) => {
  const userLanguage =
    typeof navigator !== "undefined" && typeof navigator.language === "string"
      ? navigator.language.split("-")[0]
      : "fr";

  const [language, setLanguage] = useState(userLanguage || "fr");

  const switchLanguage = (lang: string) => {
    setLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, switchLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
