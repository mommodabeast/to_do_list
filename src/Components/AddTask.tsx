// React functional component for adding a task

import { Console } from "console";
import React, { useState } from "react";
import ".././App.css";
import { ITask } from "./Interfaces";


// Declaring the IAddTaskProps interface, which contains a function for adding a task
interface IAddTaskProps {
  onAddTask: (task: ITask) => void;
}

// Exporting the AddTask component
export default function AddTask(props: IAddTaskProps) {
  const [taskName, setTaskname] = useState("");
  const [taskPriority, setTaskPriority] = useState("");
  const [taskDueDate, setTaskDueDate] = useState("");

  // A function to clear the form by setting all of the state variables to empty strings
  const clearForm = () => {
    setTaskname("");
    setTaskPriority("");
    setTaskDueDate("");
  };

  // A function to handle the form submission
  const handleSubmit = (e: any) => {

    // Preventing the default form submission behavior
    e.preventDefault();

    // Generating a random task ID
    const Id: number = Math.floor(Math.random() * 100440);

    // Creating a new task object using the values from the form and the generated ID
    const newTask = {
      TaskName: taskName,
      TaskPriority: taskPriority,
      TaskDueDate: taskDueDate,
      TaskID: String(Id),
    };

    // Logging the new task object to the console
    console.log(newTask);

    // Calling the onAddTask function passed in through props, passing in the new task object
    props.onAddTask(newTask);

    // Clearing the form by calling the clearForm function
    clearForm();
  };


  return (
    <>
      <div>
        {/* Header element */}
        {/* <h1 className="heading">Add Task</h1> */}

        {/* Form to add a new task */}
        <form className="form-style-5" onSubmit={handleSubmit}>
          
          {/* This is a legend for the form */}
          <legend className="heading"> Add Task</legend>

          {/* Label for the task name input */}
          <label> Name </label>

          {/* Input for the user to enter the task name */}
          <input
            type="text"
            data-testid="taskNameInput"
            value={taskName}
            onChange={(e) => {
              setTaskname(e.target.value);
            }}
          ></input>

          {/* Label for the task priority input */}
          <label>Priority</label>

          {/* A select element for the user to choose the task priority */}
          <select
            value={taskPriority}
            onChange={(e) => {
              setTaskPriority(e.target.value);
            }}
            data-testid="task-priority-select"
          >
            {/* This is an option element for the user to choose no priority */}
            <option value="">Choose Priority</option>
            <option value="blue">Blue</option>
            <option value="red">Red</option>
            <option value="yellow">Yellow</option>
          </select>

          {/* Label for the task due date input */}
          <label>TaskDueDate</label>

          {/* Input for the user to enter the task due date */}
          <input
            type="date"
            value={taskDueDate}
            onChange={(e) => {
              setTaskDueDate(e.target.value);
            }}
          />
          {/* Line break element */}
          <br></br>

          {/* Submit button for the form */}
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}
