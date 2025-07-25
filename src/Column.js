import React from "react";
import { Droppable } from "react-beautiful-dnd";
import Task from "./Task";

const Column = ({ column, tasks }) => {
  return (
    <div
      style={{
        minWidth: 250,
        padding: 8,
        backgroundColor: "#f4f4f4",
        borderRadius: 4,
      }}
    >
      <h3>{column.title}</h3>
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{
              background: snapshot.isDraggingOver ? "#e3f2fd" : "#e0e0e0",
              padding: 8,
              minHeight: 100,
              borderRadius: 4,
            }}
          >
            {tasks.map((task, index) => (
              <Task key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;
