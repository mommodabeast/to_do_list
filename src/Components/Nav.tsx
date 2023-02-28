import React from "react";
import { saveAs } from "file-saver";
import * as Papa from "papaparse";


export default function Navbar() {
  const ConvertWeekly = () => {
    console.log("Weekly");

    // get the current date
    const today = new Date();
    // calculate the first day of the current week
    const firstDayOfWeek = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - today.getDay()
    );
    // calculate the last day of the current week
    const lastDayOfWeek = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + (6 - today.getDay())
    );

    const taskStorage = localStorage.getItem("tasks");
    const tasks = taskStorage ? JSON.parse(taskStorage) : [];
    // filter the tasks for the current week
    console.log("tasks", tasks);
    const weeklyTasks = tasks.filter(
      (task: { TaskDueDate: string | number | Date }) =>
        new Date(task.TaskDueDate) >= firstDayOfWeek &&
        new Date(task.TaskDueDate) <= lastDayOfWeek
    );

    console.log("==>", weeklyTasks);

    // convert the daily tasks to a CSV string
    const csv = Papa.unparse(weeklyTasks, {
      header: true,
      quotes: true,
    });

    // create a new Blob object with the CSV data
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });

    // use the FileSaver.js library to save the file
    saveAs(blob, "Weekly-tasks.csv");
  };

  const ConvertDaily = () => {
    console.log("Daily");

    // get the current date
    const today = new Date();
    // calculate the first day of the current week

    const taskStorage = localStorage.getItem("tasks");
    const tasks = taskStorage ? JSON.parse(taskStorage) : [];
    // filter the tasks for the current week
    console.log("tasks", tasks);

    const DailyTasks = tasks.filter(
      (task: { TaskDueDate: string | number | Date }) => {
        const taskDate = new Date(task.TaskDueDate);
        return (
          taskDate.getFullYear() === today.getFullYear() &&
          taskDate.getMonth() === today.getMonth() &&
          taskDate.getDate() === today.getDate()
        );
      }
    );

    // convert the daily tasks to a CSV string
    const csv = Papa.unparse(DailyTasks, {
      header: true,
      quotes: true,
    });

    // create a new Blob object with the CSV data
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });

    // use the FileSaver.js library to save the file
    saveAs(blob, "Daily-tasks.csv");
  };

  return (
    <>
    {/* Main navbar container */}
      <nav className="navbar">
        {/*  Container that holds the contents of the navbar */}
        <div className="navbar-container container">
          {/* This input is used for the mobile menu */}
          <input type="checkbox" name="" id="" />

          {/* This div contains the hamburger menu icon */}
          <div className="hamburger-lines">
            <span className="line line1"></span>
            <span className="line line2"></span>
            <span className="line line3"></span>
          </div>

          {/* This is the main menu, which contains the download links */}
          <ul className="menu-items">
            <li>
              <a onClick={ConvertWeekly}>Download Weekly</a>
            </li>
            <li>
              <a onClick={ConvertDaily}>Download Daily</a>
            </li>
          </ul>
          <h1 className="heading">My Todo</h1>
        </div>
      </nav>
    </>
  );
}
