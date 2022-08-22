import { Task } from "../models/Task";

const STORE_KEY = "picodesk-tasks";

export const TasksService = {
  load: (): Task[] => {
    const storedTasks = localStorage.getItem(STORE_KEY);
    return storedTasks ? JSON.parse(storedTasks) : [];
  },

  save: (items: Task[]) => {
    const serializedTasks = JSON.stringify(items);
    localStorage.setItem(STORE_KEY, serializedTasks);
  },
};
