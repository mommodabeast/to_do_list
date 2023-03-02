import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import App from "./App";


// Creating a new root for the React application using the createRoot() method
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

// Rendering the App component into the newly created root using the render() method
root.render(<App />);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();