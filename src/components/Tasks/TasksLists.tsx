import React, { useState, useRef, useEffect } from "react";
import { TasksConsumer } from "../../providers/tasks.provider";
import { TasksListItem } from "./TasksListItem";

export function TasksList() {
  const [height, setHeight] = useState<number>(0);
  const ulEl = useRef<HTMLUListElement>(null);
  const tasksConsumer = TasksConsumer();
  const items = tasksConsumer!.tasks;
  const showDone = tasksConsumer!.showDone;

  useEffect(() => {
    function handleWindowResize() {
      setHeight(window.innerHeight);
    }

    window.addEventListener("resize", handleWindowResize);
    handleWindowResize();

    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  function renderItems(): JSX.Element[] {
    return items.map((item) => (
      <TasksListItem
        key={item.id}
        id={item.id}
        text={item.text}
        done={item.done}
        show={showDone}
      />
    ));
  }

  function calculateHeight() {
    if (ulEl.current) {
      const topPosition = ulEl.current.offsetTop;
      return height - topPosition - 25;
    }
    return 0;
  }

  if (items.length) {
    return (
      <ul
        ref={ulEl}
        className="tasks-list"
        style={{ height: calculateHeight() }}
      >
        {renderItems()}
      </ul>
    );
  }

  return <p>You don't have any tasks!!!</p>;
}
