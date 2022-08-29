import React, { useEffect, useState } from "react";
import { useTheme } from "../providers/theme.provider";
import { UiPage } from "../components/UI";
import { Task } from "../models/Task";
import { TasksList } from "../components/Tasks";
import { TasksAddForm } from "../components/Tasks/TasksAddForm";
import { TasksProvider } from "../providers/tasks.provider";
import { TasksService } from "../services/Tasks.service";
import { TasksNavbarMenu } from "../components/Tasks";

import { useModal } from "../providers/modal.provider";

export function HomePage(): JSX.Element {
  const [tasks, setTasks] = useState<Task[] | null>(null);
  const [showDone, setShowDone] = useState<boolean>(true);
  const { isDarkMode } = useTheme();

  const modal = useModal();

  useEffect(() => {
    setTasks(TasksService.load());
  }, []);

  function handleAdd(text: string) {
    const task = new Task(text, 1);
    if (tasks) {
      setTasks([task, ...tasks]);
      TasksService.save(tasks);
    }
  }

  function handleDelete(id: string) {
    if (tasks) {
      modal.show(
        "confirm",
        "Are you sure you want to delete this task?",
        () => {
          const newTasks = tasks?.filter((task) => task.id !== id);
          setTasks(newTasks);
          TasksService.save(newTasks);
        }
      );
    }
  }

  function handleDone(id: string, value: boolean) {
    if (tasks) {
      tasks.forEach((task) => {
        if (task.id === id) {
          task.done = value;
        }
      });

      setTasks([...tasks]);
      TasksService.save(tasks);
    }
  }

  function handleEmpty() {
    modal.show(
      "confirm",
      "Are you sure that you want to empty your task list?",
      () => {
        setTasks([]);
        TasksService.save([]);
      }
    );
  }

  function getPending() {
    if (tasks) {
      return tasks.filter((task) => !task.done).length;
    }

    return 0;
  }

  function handleToggleShowDone() {
    setShowDone(!showDone);
  }

  if (!tasks) {
    return (
      <UiPage>
        <p>Loading..</p>
      </UiPage>
    );
  }

  return (
    <TasksProvider
      value={{
        tasks,
        showDone,
        add: handleAdd,
        delete: handleDelete,
        done: handleDone,
        empty: handleEmpty,
        pending: getPending,
        toggleShowDone: handleToggleShowDone,
      }}
    >
      <UiPage
        title="Your tasks"
        darkMode={isDarkMode}
        menu={<TasksNavbarMenu />}
      >
        <TasksAddForm />
        <TasksList />
      </UiPage>
    </TasksProvider>
  );
}
