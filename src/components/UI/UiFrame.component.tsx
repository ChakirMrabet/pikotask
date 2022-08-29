import React from "react";

export interface IUiFrame {
  darkMode: boolean;
  children: JSX.Element | JSX.Element[];
}

function toggleDarkMode(isDark: boolean) {
  const htmlEl = document.documentElement;

  if (isDark) {
    htmlEl.classList.add("dark");
    return;
  }

  htmlEl.classList.remove("dark");
}

export function UiFrame(props: IUiFrame) {
  const { darkMode } = props;
  toggleDarkMode(darkMode);
  return <div className="ui-frame">{props.children}</div>;
}
