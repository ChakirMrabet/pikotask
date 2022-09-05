import ReactDOM from "react-dom/client";
import React from "react";
import { App } from "./app";

const rootElement = document.getElementById("root");

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<App />);
}

window.addEventListener("load", async () => {
  if ("serviceWorker" in navigator) {
    try {
      await navigator.serviceWorker.register(
        new URL("./service-worker.ts", import.meta.url),
        { type: "module" }
      );
    } catch (error) {
      console.error(
        `There was an error registering the service worker: ${error}`
      );
    }
  }
});
