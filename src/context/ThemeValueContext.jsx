import React, { useContext, useState } from "react";

const ThemeValueContext = React.createContext();

export function useThemeValue() {
  return useContext(ThemeValueContext);
}
export default function ThemeValueProivider({ children }) {
  const [mode, setMode] = useState("dark");
  const value = {
    mode,
    setMode,
  };
  return (
    <ThemeValueContext.Provider value={value}>
      {children}
    </ThemeValueContext.Provider>
  );
}
