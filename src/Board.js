import React from "react";
import Column from "./Column";

const Board = ({ data }) => {
  return (
    <div style={{ display: "flex", gap: "16px" }}>
      {data.columnOrder.map((columnId) => {
        const column = data.columns[columnId];
        const tasks = column.taskIds
          .map((taskId) => data.tasks[taskId])
          .filter(Boolean); // Prevent undefined

        return <Column key={column.id} column={column} tasks={tasks} />;
      })}
    </div>
  );
};

export default Board;
