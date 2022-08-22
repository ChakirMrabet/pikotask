import React, { useEffect, useState } from "react";
import { UiFrame, UiNavbar } from "../components/UI";
import { Task } from "../models/Task";
import { TasksList } from "../components/Tasks";
import { TasksAddForm } from "../components/Tasks/TasksAddForm.component";
import { TasksCtx } from "../contexts/tasks.ctx";
import { TasksService } from "../services/Tasks.service";
import { TasksToolbar } from "../components/Tasks";

export function HomePage(): JSX.Element {
  const [tasks, setTasks] = useState<Task[] | null>(null);

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
      // TODO: replace with custom dialog
      if (confirm("Are you sure you want to delete this task?")) {
        const newTasks = tasks?.filter((task) => task.id !== id);
        setTasks(newTasks);
        TasksService.save(newTasks);
      }
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
    if (confirm("Are you sure that you want to empty your task list?")) {
      setTasks([]);
      TasksService.save([]);
    }
  }

  if (!tasks) {
    return (
      <UiFrame>
        <UiNavbar left={<h1>PicoDesk!!</h1>} />
        <p>Loading..</p>
      </UiFrame>
    );
  }

  return (
    <TasksCtx.Provider
      value={{
        tasks,
        add: handleAdd,
        delete: handleDelete,
        done: handleDone,
        empty: handleEmpty,
      }}
    >
      <UiFrame>
        <UiNavbar left={<h1>PicoDesk!!</h1>} right={<TasksToolbar />} />
        <TasksAddForm />
        <TasksList />
      </UiFrame>
    </TasksCtx.Provider>
  );
}
