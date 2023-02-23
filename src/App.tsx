import React from "react";
import "./App.css";
import Navbar from "./Components/Nav";
import MainArea from "./Components/MainArea";

function App() {
    return (
      <div>
        <Navbar></Navbar>
  
        <div className="App">
          <MainArea></MainArea> 
        </div>
      </div>
    );
  }
  
  export default App;