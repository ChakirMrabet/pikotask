import React from "react";

export interface IUiButton {
  visible?: boolean;
  onClick?: () => void;
  children: string | JSX.Element | JSX.Element[];
}

export function UiButton(props: IUiButton) {
  const { visible, onClick, children } = props;
  const isVisible = visible && true;

  function handleClick() {
    onClick && onClick();
  }

  if (!isVisible) {
    return null;
  }

  return (
    <button className="ui-button" onClick={handleClick}>
      {children}
    </button>
  );
}
