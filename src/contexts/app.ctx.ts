import React from "react";

export interface IAppCtx {}

export const AppCtx = React.createContext<IAppCtx | null>(null);
