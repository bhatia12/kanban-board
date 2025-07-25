import React, { useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import Task from "./Task";

const Column = ({ column, tasks, addTask, editTask, deleteTask }) => {
  const [input, setInput] = useState("");

  const handleAdd = () => {
    if (!input.trim()) return;
    addTask(column.id, input.trim());
    setInput("");
  };

  return (
    <div
      style={{
        minWidth: 250,
        background: "#f4f4f4",
        padding: 8,
        borderRadius: 4,
      }}
    >
      <h3>{column.title}</h3>
      <Droppable droppableId={column.id}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{
              background: "#e0e0e0",
              padding: 8,
              minHeight: 100,
              borderRadius: 4,
            }}
          >
            {tasks.map((task, index) => (
              <Task
                key={task.id}
                task={task}
                index={index}
                editTask={editTask}
                deleteTask={() => deleteTask(column.id, task.id)}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="New task"
        style={{ width: "100%", marginTop: 8 }}
      />
      <button onClick={handleAdd} style={{ width: "100%", marginTop: 4 }}>
        Add Task
      </button>
    </div>
  );
};

export default Column;
