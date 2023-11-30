// ThemeContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from "react";
import "../index.css";

interface ThemeContextProps {
  theme: string;
  toggleTheme: () => void;
}
interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);


export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState("theme-light");

   useEffect(() => {
     document.body.className = theme;
   }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === "theme-dark" ? "theme-light" : "theme-dark"
    );
  };

  const contextValue: ThemeContextProps = {
    theme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
 
};


