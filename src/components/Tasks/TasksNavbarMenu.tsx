import React, { Fragment } from "react";
import { useTheme } from "../../providers/theme.provider";
import { TasksConsumer } from "../../providers/tasks.provider";
import { UiIconButton } from "../UI";

export interface ITasksNavbarMenuStatsProps {
  pendingTasks: number;
}

function TasksNavbarMenuStats(props: ITasksNavbarMenuStatsProps) {
  return (
    <Fragment>
      <li className="tasks-navbar-menu__stat">{props.pendingTasks}</li>
    </Fragment>
  );
}

export function TasksNavbarMenu() {
  const tasksConsumer = TasksConsumer();
  const pendingTasks = tasksConsumer?.pending() || 0;
  const showDone = tasksConsumer!.showDone;
  const { isDarkMode, toggleDarkMode } = useTheme();

  function handleEmpty() {
    tasksConsumer?.empty();
  }

  function handleShowDone() {
    tasksConsumer!.toggleShowDone();
  }

  function handleToogleDarkMode() {
    toggleDarkMode();
  }

  return (
    <ul className="tasks-navbar-menu">
      {TasksNavbarMenuStats({ pendingTasks })}
      <li className="tasks-navbar-menu__action">
        <UiIconButton
          show={!showDone}
          iconName="checklist"
          onClick={handleShowDone}
        />
        <UiIconButton
          show={showDone}
          iconName="reorder"
          onClick={handleShowDone}
        />
        <UiIconButton iconName="calendar_month" />
        <UiIconButton
          show={isDarkMode}
          iconName="light_mode"
          onClick={handleToogleDarkMode}
        />
        <UiIconButton
          show={!isDarkMode}
          iconName="dark_mode"
          onClick={handleToogleDarkMode}
        />
        <UiIconButton iconName="delete" onClick={handleEmpty} />
      </li>
    </ul>
  );
}
