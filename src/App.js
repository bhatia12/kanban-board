import React, { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Board from "./Board";

const initialData = {
  tasks: {
    "task-1": { id: "task-1", content: "Build UI" },
    "task-2": { id: "task-2", content: "Write logic" },
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "To Do",
      taskIds: ["task-1", "task-2"],
    },
    "column-2": {
      id: "column-2",
      title: "In Progress",
      taskIds: [],
    },
    "column-3": {
      id: "column-3",
      title: "Done",
      taskIds: [],
    },
  },
  columnOrder: ["column-1", "column-2", "column-3"],
};

export default function App() {
  const [data, setData] = useState(initialData);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const start = data.columns[source.droppableId];
    const finish = data.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);
      const newColumn = { ...start, taskIds: newTaskIds };

      setData((prev) => ({
        ...prev,
        columns: {
          ...prev.columns,
          [newColumn.id]: newColumn,
        },
      }));
    } else {
      const startTaskIds = Array.from(start.taskIds);
      startTaskIds.splice(source.index, 1);
      const finishTaskIds = Array.from(finish.taskIds);
      finishTaskIds.splice(destination.index, 0, draggableId);

      setData((prev) => ({
        ...prev,
        columns: {
          ...prev.columns,
          [start.id]: { ...start, taskIds: startTaskIds },
          [finish.id]: { ...finish, taskIds: finishTaskIds },
        },
      }));
    }
  };

  const addTask = (columnId, content) => {
    const newTaskId = `task-${Date.now()}`;
    const newTask = { id: newTaskId, content };

    setData((prev) => ({
      ...prev,
      tasks: {
        ...prev.tasks,
        [newTaskId]: newTask,
      },
      columns: {
        ...prev.columns,
        [columnId]: {
          ...prev.columns[columnId],
          taskIds: [...prev.columns[columnId].taskIds, newTaskId],
        },
      },
    }));
  };

  const editTask = (taskId, newContent) => {
    setData((prev) => ({
      ...prev,
      tasks: {
        ...prev.tasks,
        [taskId]: { ...prev.tasks[taskId], content: newContent },
      },
    }));
  };

  const deleteTask = (columnId, taskId) => {
    setData((prev) => {
      const newTasks = { ...prev.tasks };
      delete newTasks[taskId];

      return {
        ...prev,
        tasks: newTasks,
        columns: {
          ...prev.columns,
          [columnId]: {
            ...prev.columns[columnId],
            taskIds: prev.columns[columnId].taskIds.filter(
              (id) => id !== taskId
            ),
          },
        },
      };
    });
  };

  return (
    <div style={{ padding: 16 }}>
      <h2>Kanban Board</h2>
      <DragDropContext onDragEnd={onDragEnd}>
        <Board
          data={data}
          addTask={addTask}
          editTask={editTask}
          deleteTask={deleteTask}
        />
      </DragDropContext>
    </div>
  );
}
