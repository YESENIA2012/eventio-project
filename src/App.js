import Login from "./components/login/Login";
import React from "react";
import { Routes, Route } from "react-router-dom";
import "./styles/app.scss";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
