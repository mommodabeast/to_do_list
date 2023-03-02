import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import MainArea from "./MainArea";
import "@testing-library/jest-dom";



describe("MainArea", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("should render AddTask and Task components", async () => {
    render(<MainArea />);
    const addTaskElement = screen.getByText(/add task/i);
    const taskListElement = screen.getByText(/no task added/i);
    expect(addTaskElement).toBeInTheDocument();
    expect(taskListElement).toBeInTheDocument();
  });

  test("should add a task and render it in the task list", async () => {
    render(<MainArea />);
    const taskName = "NewTask";
    const taskPriority = "yellow";
    const addTaskElement = screen.getByText(/Submit/i);
    fireEvent.change(screen.getByTestId("taskNameInput"), {
      target: { value: taskName },
    });

    fireEvent.change(screen.getByTestId("task-priority-select"), {
      target: { value: taskPriority },
    });
    fireEvent.click(addTaskElement);
    const taskElement = await screen.findByText(taskName);
    expect(taskElement).toBeInTheDocument();
  });

  test("should update a task and render the updated task in the task list", async () => {
    const initialTask = {
      TaskID: "1",
      TaskName: "Initial Task",
      TaskPriority: "yellow",
    };
    localStorage.setItem("tasks", JSON.stringify([initialTask]));
    render(<MainArea />);
    const updatedTaskName = "Updated Task";
    const taskElement = screen.getByText(initialTask.TaskName);
    const updateButton = screen.getByText(/Edit/i);

    // const updateButton = screen.getByRole("button", { name: "Edit" });
    fireEvent.click(updateButton);

    fireEvent.change(screen.getByTestId("task-name-input"), {
      target: { value: updatedTaskName },
    });

    fireEvent.click(screen.getByText(/Submit/i));
    const updatedTaskElement = await screen.findByText(updatedTaskName);
    expect(updatedTaskElement).toBeInTheDocument();
  });

  test("should delete a task and remove it from the task list", async () => {
    const initialTask = {
      TaskID: "1",
      TaskName: "Initial Task",
      TaskPriority: "yellow",
    };
    localStorage.setItem("tasks", JSON.stringify([initialTask]));
    render(<MainArea />);
    const taskElement = screen.getByText(initialTask.TaskName);
    const deleteButton = screen.getByRole("button", { name: "X" });
    fireEvent.click(deleteButton);
    expect(taskElement).not.toBeInTheDocument();
  });
});
