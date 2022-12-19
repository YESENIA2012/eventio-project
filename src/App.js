import Login from "./components/login/Login";
import React from "react";
import { Routes, Route } from "react-router-dom";
import SignUp from "./components/signUp/SignUp";
import DashboardComponent from "./components/dashboard/Dashboard";
import "./styles/app.scss";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="dashboard" element={<DashboardComponent />} />
      </Routes>
    </div>
  );
}

export default App;
