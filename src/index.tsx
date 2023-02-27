import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import reportWebVitals from "./reportWebVitals";

// Creating a new root for the React application using the createRoot() method
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

// Rendering the App component into the newly created root using the render() method
root.render(<App />);

// reporting the web vitals
reportWebVitals();
