import React, { useContext } from "react";
import { TasksCtx } from "../../contexts/tasks.ctx";
import { TasksListItem } from "./TasksListItem.component";

export function TasksList() {
  const tasksCtx = useContext(TasksCtx);
  const items = tasksCtx ? tasksCtx.tasks : [];

  function renderItems(): JSX.Element[] {
    // TODO: if no ctx, show error instead of using an array
    return items.map((item) => (
      <TasksListItem
        key={item.id}
        id={item.id}
        text={item.text}
        done={item.done}
      />
    ));
  }

  if (items.length) {
    return <ul className="tasks-list">{renderItems()}</ul>;
  }

  return <p>You don't have any tasks!!!</p>;
}
