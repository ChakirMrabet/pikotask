import React, { ChangeEvent, FormEvent, useContext, useState } from "react";
import { TasksCtx } from "../../contexts/tasks.ctx";

export function TasksAddForm() {
  const [text, setText] = useState("");

  const tasksCtx = useContext(TasksCtx);

  function handleTextChange(e: ChangeEvent) {
    const target = e.target as HTMLInputElement;
    setText(target.value);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (text !== "") {
      tasksCtx?.add(text);
      setText("");
    }
  }

  return (
    <form className="tasks-list__form" onSubmit={handleSubmit}>
      <input
        className="tasks-list__form__text"
        value={text}
        placeholder="Describe your next task here"
        onChange={handleTextChange}
      />
    </form>
  );
}
