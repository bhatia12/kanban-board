import React from "react";
import { Draggable } from "react-beautiful-dnd";

const Task = ({ task, index }) => {
  const handleCLick = () => {
    console.log("task", task);
  };
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          onClick={handleCLick}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            userSelect: "none",
            padding: 12,
            marginBottom: 8,
            borderRadius: 4,
            backgroundColor: snapshot.isDragging ? "#90caf9" : "#fff",
            boxShadow: "0 1px 2px rgba(0,0,0,0.2)",
            ...provided.draggableProps.style,
          }}
        >
          {task.content}
        </div>
      )}
    </Draggable>
  );
};

export default Task;
