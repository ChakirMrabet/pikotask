import React from "react";
import { ThemeProvider } from "./providers/theme.provider";
import { ModalProvider } from "./providers/modal.provider";
import { HomePage } from "./pages/Home.page";

export function App() {
  return (
    <ThemeProvider>
      <ModalProvider>
        <HomePage />
      </ModalProvider>
    </ThemeProvider>
  );
}
