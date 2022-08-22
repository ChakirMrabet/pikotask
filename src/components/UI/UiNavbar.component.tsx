import React from "react";

export interface IUiNavbar {
  left: JSX.Element;
  right?: JSX.Element;
}

export function UiNavbar(props: IUiNavbar) {
  const { left, right } = props;

  return (
    <nav className="ui-nav">
      {left}
      {right}
    </nav>
  );
}
