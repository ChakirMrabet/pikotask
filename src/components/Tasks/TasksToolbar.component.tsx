import React, { useContext, Fragment } from "react";
import { TasksCtx } from "../../contexts/tasks.ctx";
import { UiIconButton } from "../UI";

export interface ITasksToolbarStatsProps {
  pendingTasks: number;
}

function TasksToolbarStats(props: ITasksToolbarStatsProps) {
  return (
    <Fragment>
      <li>{props.pendingTasks}</li>
    </Fragment>
  );
}

export interface ITasksToolbarProps {}

export function TasksToolbar(props: ITasksToolbarProps) {
  const tasksCtx = useContext(TasksCtx);

  function handleEmpty() {
    tasksCtx?.empty();
  }

  return (
    <ul className="tasks-toolbar">
      {TasksToolbarStats({ pendingTasks: 12 })}
      <li>
        <UiIconButton iconName="delete" onClick={handleEmpty} />
      </li>
    </ul>
  );
}
