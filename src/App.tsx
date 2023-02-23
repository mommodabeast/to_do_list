import React from "react";
import "./App.css";
import Navbar from "./Components/Nav";
import MainArea from "./Components/MainArea";

// Defining the main app component

function App() {
  // Returning JSX markup for the component's render output
    return (
      // Wrapping the Navbar and MainArea components in a parent div element
      <div>
        <Navbar></Navbar>
  
        <div className="App">
          <MainArea></MainArea> 
        </div>
      </div>
    );
  }
  
  // Exporting the App component as the default export of this file
  export default App;