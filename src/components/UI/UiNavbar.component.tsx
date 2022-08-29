import React from "react";

export interface IUiNavbar {
  left: JSX.Element;
  right?: JSX.Element;
}

export function UiNavbar(props: IUiNavbar) {
  const { left, right } = props;

  return (
    <nav className="ui-navbar">
      {left}
      {right}
    </nav>
  );
}
