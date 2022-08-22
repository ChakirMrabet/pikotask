import React, { MouseEvent } from "react";
import { classNames } from "../../utils/classNames";

export interface IUiIconButtonProps {
  show?: boolean;
  iconName: string;
  color?: "default" | "ok" | "danger";
  onClick?: () => void;
}

export function UiIconButton(props: IUiIconButtonProps) {
  const { iconName, onClick } = props;
  const color = props.color || "default";
  const isVisbile = props.show === undefined ? true : props.show;

  const className = classNames({
    "ui-icon-button": true,
    "ui-icon-button--isDanger": color === "danger",
    "ui-icon-button--isDefault": color === "default",
    "ui-icon-button--isOk": color === "ok",
  });

  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    onClick && onClick();
  }

  if (!isVisbile) {
    return null;
  }

  return (
    <a className={className} href="" onClick={handleClick}>
      {iconName}
    </a>
  );
}
