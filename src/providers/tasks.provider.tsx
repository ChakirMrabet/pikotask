import React, { useContext } from "react";
import { Task } from "../models/Task";

export interface ITasksCtx {
  tasks: Task[];
  showDone: boolean;
  add: (text: string) => void;
  delete: (id: string) => void;
  done: (id: string, value: boolean) => void;
  empty: () => void;
  pending: () => number;
  toggleShowDone: () => void;
}

const TasksCtx = React.createContext<ITasksCtx | null>(null);

export interface ITasksProviderProps {
  value: ITasksCtx;
  children: JSX.Element | JSX.Element[];
}

export function TasksProvider(props: ITasksProviderProps) {
  const { value, children } = props;
  return <TasksCtx.Provider value={value}>{children}</TasksCtx.Provider>;
}

export function TasksConsumer() {
  return useContext(TasksCtx);
}
