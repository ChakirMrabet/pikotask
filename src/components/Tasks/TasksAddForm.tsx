import React, { ChangeEvent, FormEvent, useState } from "react";
import { TasksConsumer } from "../../providers/tasks.provider";

export function TasksAddForm() {
  const [text, setText] = useState("");

  const tasksConsumer = TasksConsumer();

  function handleTextChange(e: ChangeEvent) {
    const target = e.target as HTMLInputElement;
    setText(target.value);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (text !== "") {
      tasksConsumer?.add(text);
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
