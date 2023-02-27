import { setPriority } from "os";
import React, { useState } from "react";
import { text } from "stream/consumers";
import { ITask } from "./Interfaces";
// import EditTask from "./EditTask";

interface Props {
  task: ITask;
  TaskId?: number;
  handleDeletetask: (taskId: string) => void;
  handleUpdateTask: (task: ITask) => void;
}

export default function TodoTask({
  task,
  handleDeletetask,
  handleUpdateTask,
}: Props) {
  const [dateSelected, setDateSelected] = useState(task.TaskDueDate); // to select date
  const [disable, setDisable] = useState(true); // to enable/disable input
  const [priority, setPriority] = useState(task.TaskPriority); // to set input as task priority
  const [name, setName] = useState(task.TaskName); // to set input as task name

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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

  const EditTask = () => {
    setDisable(!disable); //
  };

  return (
    <>
      <div className="Task">
        <div className="flex-row">
          <h1 className="heading3"> {name}</h1>
          <h1> Task: </h1>
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
          <h1> Due Date:</h1>
          <input
            type="date"
            name="date"
            disabled={disable}
            value={dateSelected}
            onChange={handleChange}
          ></input>
        </div>
        <div className="flex-row">
          <h1> Priority:</h1>
          <input
            name="Priority"
            type="text"
            disabled={disable}
            value={priority}
            onChange={handleChange}
          ></input>
        </div>
        <button onClick={EditTask} className="btn btn-primary">
          Edit
        </button>

        <button
          onClick={() => {
            handleDeletetask(task.TaskID);
          }}
          className="btn btn-primary"
        >
          X
        </button>
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
