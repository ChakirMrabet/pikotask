import React from "react";

export interface IUiFrame {
  children: JSX.Element[];
}

export function UiFrame(props: IUiFrame) {
  return <div className="ui-frame">{props.children}</div>;
}
