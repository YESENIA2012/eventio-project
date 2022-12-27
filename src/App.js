import React from "react";
import Login from "./components/login/Login";
import Dashboard from "./components/Dashboard";
import SignUp from "./components/SignUp";
import { Routes, Route } from "react-router-dom";
import "./styles/app.scss";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
