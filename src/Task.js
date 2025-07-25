import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";

const Task = ({ task, index, editTask, deleteTask }) => {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(task.content);

  const handleEdit = () => {
    if (editing) {
      editTask(task.id, value);
    }
    setEditing(!editing);
  };

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            background: snapshot.isDragging ? "#90caf9" : "#fff",
            padding: 10,
            marginBottom: 8,
            borderRadius: 4,
            boxShadow: "0 1px 2px rgba(0,0,0,0.15)",
            ...provided.draggableProps.style,
          }}
        >
          {editing ? (
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              style={{ width: "100%" }}
            />
          ) : (
            <div>{task.content}</div>
          )}
          <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
            <button onClick={handleEdit}>{editing ? "Save" : "Edit"}</button>
            <button onClick={deleteTask} style={{ color: "red" }}>
              Delete
            </button>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Task;
