import React from "react";
import { Task } from "../models/Task";

export interface ITasksCtx {
  tasks: Task[];
  add: (text: string) => void;
  delete: (id: string) => void;
  done: (id: string, value: boolean) => void;
  empty: () => void;
}

export const TasksCtx = React.createContext<ITasksCtx | null>(null);
