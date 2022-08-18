import React, { useState } from "react";
import {
  IconCheck,
  IconEdit,
  IconTrash,
  IconArrowUp,
  IconArrowDown,
} from "@tabler/icons";

export default function Todo(props) {
  const [isMouseOver, setIsMouseOver] = useState(false);

  const mouseOverHandler = () => {
    setIsMouseOver(true);
  };

  const mouseOutHandler = () => {
    setIsMouseOver(false);
  };

  return (
    <div
      className="border-bottom p-1 py-2 fs-2 d-flex gap-2"
      onMouseOver={mouseOverHandler}
      onMouseOut={mouseOutHandler}
    >
      <span
        className="me-auto"
        style={props.completed ? { textDecoration: "line-through" } : {}}
      >
        {props.title}
      </span>

      {isMouseOver && (
        <>
          <button className="btn btn-success" onClick={props.markFn}>
            <IconCheck />
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => props.onMoveUp()}
          >
            <IconArrowUp />
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => props.onMoveDown()}
          >
            <IconArrowDown />
          </button>
          <button className="btn btn-danger" onClick={props.deleteFn}>
            <IconTrash />
          </button>
        </>
      )}
    </div>
  );
}
