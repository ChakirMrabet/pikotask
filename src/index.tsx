import ReactDOM from "react-dom/client";
import React from "react";
import { App } from "./app";

const rootElement = document.getElementById("root");

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<App />);
}
