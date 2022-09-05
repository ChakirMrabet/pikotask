import React, { useEffect } from "react";
import { UiFrame } from "./UiFrame.component";
import { UiNavbar } from "./UiNavbar.component";

// TODO: move this to a configuration provider
const APP_NAME = "PikoTask";

export interface IUiPageProps {
  title?: string;
  menu?: JSX.Element;
  darkMode?: boolean;
  children: JSX.Element | JSX.Element[];
}

export function UiPage(props: IUiPageProps) {
  const { title, menu, darkMode, children } = props;

  useEffect(() => {
    document.title = title ? `${APP_NAME} - ${title}` : APP_NAME;
  }, []);

  function renderLogo(): JSX.Element {
    return <h1 className="ui-page__title">{APP_NAME}</h1>;
  }

  return (
    <UiFrame darkMode={darkMode === true}>
      <UiNavbar left={renderLogo()} right={menu}></UiNavbar>
      <div>{children}</div>
    </UiFrame>
  );
}
