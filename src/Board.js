import React from "react";
import Column from "./Column";

const Board = ({ data, addTask, editTask, deleteTask }) => {
  return (
    <div style={{ display: "flex", gap: 16 }}>
      {data.columnOrder.map((columnId) => {
        const column = data.columns[columnId];
        const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);

        return (
          <Column
            key={column.id}
            column={column}
            tasks={tasks}
            addTask={addTask}
            editTask={editTask}
            deleteTask={deleteTask}
          />
        );
      })}
    </div>
  );
};

export default Board;
