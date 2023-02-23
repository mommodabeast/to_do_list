// react component

import { Console } from "console";
import React, { useState } from "react";
import ".././App.css";
import { ITask } from "./Interfaces";

interface IAddTaskProps {
  onAddTask: (task: ITask) => void;
}

export default function AddTask(props: IAddTaskProps) {
  const [taskName, setTaskname] = useState("");
  const [taskPriority, setTaskPriority] = useState("");
  const [taskDueDate, setTaskDueDate] = useState("");

  const clearForm = () => {
    setTaskname("");
    setTaskPriority("");
    setTaskDueDate("");
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const Id: number = Math.floor(Math.random() * 100440);
    const newTask = {
      TaskName: taskName,
      TaskPriority: taskPriority,
      TaskDueDate: taskDueDate,
      TaskID: String(Id),
    };

    console.log(newTask);

    props.onAddTask(newTask);

    clearForm();
  };

  return (
    <>
      <div>
        {/* <h1 className="heading">Add Task</h1> */}
        <form className="form-style-5" onSubmit={handleSubmit}>
          <legend className="heading"> Add Task</legend>
          <label> Name </label>
          <input
            type="text"
            data-testid="taskNameInput"
            value={taskName}
            onChange={(e) => {
              setTaskname(e.target.value);
            }}
          ></input>
          <label>Priority</label>
          <select
            value={taskPriority}
            onChange={(e) => {
              setTaskPriority(e.target.value);
            }}
            data-testid="task-priority-select"
          >
            <option value="">Choose Priority</option>
            <option value="blue">Blue</option>
            <option value="red">Red</option>
            <option value="yellow">Yellow</option>
          </select>

          <label>TaskDueDate</label>
          <input
            type="date"
            value={taskDueDate}
            onChange={(e) => {
              setTaskDueDate(e.target.value);
            }}
          />
          <br></br>
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}
