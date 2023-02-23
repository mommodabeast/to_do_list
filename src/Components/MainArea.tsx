import { useEffect, useState } from "react";
import AddTask from "./AddTask";
import { ITask } from "./Interfaces";
import TodoTask from "./Task";
import { Stack, HashTable, KeyValuePair } from "../Utils.ts/DataStructures";

export default function MainArea() {
  const [ListTask, setListTask] = useState<ITask[]>([]);

  const handleAddTask = (newTask: ITask) => {
    // Get the existing tasks from local storage, if any
    const storedTasks = localStorage.getItem("tasks");
    const tasks = storedTasks ? JSON.parse(storedTasks) : [];
    // Add the new task to the array
    tasks.push(newTask);

    // Save the updated tasks to local storage
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // Update the state
    loadTasks();
  };

  const handleDeleteTask = (taskID: string): void => {
    // Get the existing tasks from local storage, if any
    const storedTasks = localStorage.getItem("tasks");
    const tasks = storedTasks ? JSON.parse(storedTasks) : [];
    const newTaskList = tasks.filter(
      (t: { TaskID: string }) => t.TaskID !== taskID
    );
    localStorage.setItem("tasks", JSON.stringify(newTaskList));

    // Update the state
    loadTasks();
  };