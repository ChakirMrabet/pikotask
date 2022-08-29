import React from "react";
import { classNames } from "../../utils/classNames";
import { TasksConsumer } from "../../providers/tasks.provider";
import { UiIconButton } from "../UI/UiIconButton.component";

export interface ITasksListItemProps {
  id: string;
  text: string;
  done: boolean;
  show: boolean;
}

export function TasksListItem(props: ITasksListItemProps) {
  const { id, done, show } = props;

  const className = classNames({
    "tasks-list__item": true,
    "tasks-list__item--isDone": done,
    hidden: done && show,
  });

  return (
    <li className={className}>
      {ActionButtons({ id, done })}
      <div>{props.text}</div>
    </li>
  );
}

interface IActionButtonsProps {
  id: string;
  done: boolean;
}

function ActionButtons(props: IActionButtonsProps) {
  const { id, done } = props;
  const tasksConsumer = TasksConsumer();

  function handleDelete() {
    tasksConsumer?.delete(id);
  }

  function handleDone() {
    tasksConsumer?.done(id, true);
  }

  function handleUndo() {
    tasksConsumer?.done(id, false);
  }

  return (
    <div className="tasks-list__item__buttons">
      <UiIconButton iconName="delete" color="danger" onClick={handleDelete} />
      <UiIconButton
        show={!done}
        iconName="done"
        color="ok"
        onClick={handleDone}
      />
      <UiIconButton
        show={done}
        iconName="remove_done"
        color="ok"
        onClick={handleUndo}
      />
    </div>
  );
}
