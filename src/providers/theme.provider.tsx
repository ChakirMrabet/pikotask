import React, { useContext, useState } from "react";

interface IThemeContext {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const themeCtx = React.createContext<IThemeContext>({
  isDarkMode: false,
  toggleDarkMode: () => {},
});

export interface IThemeProviderProps {
  children: JSX.Element | JSX.Element[];
}

export function ThemeProvider(props: IThemeProviderProps) {
  const { children } = props;
  const [isDarkMode, setDarkMode] = useState(false);

  function toggleDarkMode() {
    setDarkMode(!isDarkMode);
  }

  return (
    <themeCtx.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </themeCtx.Provider>
  );
}

export function useTheme() {
  return useContext(themeCtx);
}
