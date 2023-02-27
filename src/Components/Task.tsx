import { setPriority } from "os";
import React, { useState } from "react";
import { text } from "stream/consumers";
import { ITask } from "./Interfaces";
// import EditTask from "./EditTask";

// Props interface, specifies the props that the Todotask component can recieve. 
interface Props {
  task: ITask; // Imported from Interfaces.tsx. Contains the information about the task being edited. 
  TaskId?: number; // Optional TaskId property. Not used in this component. 
  handleDeletetask: (taskId: string) => void; // A function that accepts taskId of type string and returns void, used to delete the task being edited. 
  handleUpdateTask: (task: ITask) => void; // A function that accepts a task of type ITask and returns void, used to update the task being edited. 
}

// TodoTask function, recieves a Props object as an argument. 
export default function TodoTask({ task, handleDeletetask, handleUpdateTask, }: Props) {

  // Defining state variables using the useState hook. 
  const [dateSelected, setDateSelected] = useState(task.TaskDueDate); // to select date
  const [disable, setDisable] = useState(true); // to enable/disable input
  const [priority, setPriority] = useState(task.TaskPriority); // to set input as task priority
  const [name, setName] = useState(task.TaskName); // to set input as task name

  // A function that handles changes to the input files. 
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Update the corresponding state variable based on the input's name attribute
    if (event.target.name === "date") {
      setDateSelected(event.target.value);
    }
    if (event.target.name === "taskname") {
      setName(event.target.value);
    }
    if (event.target.name === "Priority") {
      setPriority(event.target.value);
    }
  };

  // Function that toggles the disable state, which is bound to the Edit button. 
  const EditTask = () => {
    setDisable(!disable); //
  };

  // Returning a JSX template that renders a form for editing the task.
  return (
    <>
      {/* A fragment that groups all the elements inside it, it's a shorthand for React.Fragment */}
      <div className="Task">
        
        {/* Container element for the task */}
        <div className="flex-row">
          
          {/* Container elemnet for the task name and label */}
          <h1 className="heading3"> {name}</h1>
          {/* Label for the task */}
          <h1> Task: </h1>
          {/* Input field for the task name */}
          <input
            id="task_name"
            name="taskname"
            type="text"
            data-testid="task-name-input"
            onChange={handleChange}
            value={name}
            disabled={disable}
          ></input>
        </div>
        <div className="flex-row">

          {/* Label for task due date */}
          <h1> Due Date:</h1>
          {/* Input for the task due date */}
          <input
            type="date"
            name="date"
            disabled={disable}
            value={dateSelected}
            onChange={handleChange}
          ></input>
        </div>
        <div className="flex-row">

          {/* Label for task priority */}
          <h1> Priority:</h1>
          {/* Input field for task priority */}
          <input
            name="Priority"
            type="text"
            disabled={disable}
            value={priority}
            onChange={handleChange}
          ></input>
        </div>

        {/* Button for triggering the edit functionality for the task */}
        <button onClick={EditTask} className="btn btn-primary">
          Edit
        </button>

        {/* Button that triggers the delete functionality for the task */}
        <button
          onClick={() => {
            handleDeletetask(task.TaskID);
          }}
          className="btn btn-primary"
        >
          X
        </button>

        {/* Button that triggers the save functionality for the task when in edit mode */}
        {!disable && (
          <button
            onClick={() => {
              setDisable(!disable);
              handleUpdateTask({
                TaskName: name,
                TaskPriority: priority,
                TaskDueDate: dateSelected,
                TaskID: task.TaskID,
              });
            }}
            disabled={disable}
            className="btn btn-primary"
          >
            Save Edit
          </button>
        )}
      </div>
    </>
  );
}
