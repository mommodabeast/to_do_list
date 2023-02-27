import React from "react";
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

   const handleUpdateTask = (taskName: ITask): void => {
    // Get the existing tasks from local storage, if any
    const storedTasks = localStorage.getItem("tasks");
    const tasks = storedTasks ? JSON.parse(storedTasks) : [];

    // Delete the task from the array
    const newTaskList = tasks.filter(
      (t: { TaskID: string }) => t.TaskID !== taskName.TaskID
    );
    // Add the updated task to the array
    newTaskList.push(taskName);

    localStorage.setItem("tasks", JSON.stringify(newTaskList));
    loadTasks();
  };

  const loadTasks = () => {
    const storedTasks = localStorage.getItem("tasks");
    const tasksArray = storedTasks ? JSON.parse(storedTasks) : [];

    // Create a new instance of the HashTable class to store the tasks
    const taskMap = new HashTable<string, ITask>(tasksArray.length);

    // Add each task to the hash map with its task ID as the key
    tasksArray.forEach((task: ITask) => {
      taskMap.set(task.TaskID, task);
    });

    // Create a new type using the KeyValuePair class
    type TaskKeyValuePair = KeyValuePair<string, ITask>;

    const priorityOrder: string[] = ["yellow", "blue", "red"];

    // Create a new instance of the Stack class to store the prioritized tasks
    const prioritizedTaskStack = new Stack<ITask>();

    priorityOrder.forEach((priority: string) => {
      // Get all the tasks with the given priority
      const allTasks = taskMap.getAllEntries();
      allTasks.forEach((task: TaskKeyValuePair) => {
        if (task.value.TaskPriority === priority) {
          prioritizedTaskStack.push(task.value);
        }
      });
    });
    // Pop the tasks from the stack to create the prioritized task list
    const prioritizedTaskList: ITask[] = [];
    while (!prioritizedTaskStack.isEmpty()) {
      const task = prioritizedTaskStack.pop();
      if (task) {
        prioritizedTaskList.push(task);
      }
    }

    setListTask(prioritizedTaskList);
    console.log("Prioritized Task List 2", prioritizedTaskList);
  };

  const loadData = () => {
    loadTasks();
  };

  useEffect(() => {
    loadData();
    console.log("useEffect is called");
  }, []);

  // TODO : Conditional rendering based on tasks being completed or not

  return (
    <>
      <div className="main-area">
        {/* AddTask is a child component, which receives a prop called "onAddTask" */}
        <AddTask onAddTask={handleAddTask}></AddTask>

        {/* This div displays the list of tasks */}
        <div className="task-list">
          {/* If there are tasks in the ListTask array, display the heading "Task List" */}
          {ListTask.length !== 0 ? (
            <h1>Task List</h1>
          ) : (
            // If there are no tasks in the array, display the heading "No Task Added"
            <h1 className="heading2">No Task Added</h1>
          )}

          {/* Map through the ListTask array, and display a TodoTask component for each task */}
          {ListTask.map((task, key: number) => (
            <TodoTask
              task={task}
              key={task.TaskID}
              handleDeletetask={handleDeleteTask}
              handleUpdateTask={handleUpdateTask}
            ></TodoTask>
          ))}
        </div>
      </div>
    </>
  );
}