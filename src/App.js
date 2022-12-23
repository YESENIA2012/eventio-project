import Login from "./components/login/Login";
import React from "react";
import { Routes, Route } from "react-router-dom";
import SignUp from "./components/signUp/SignUp";
import DashboardComponent from "./components/dashboard/Dashboard";
import NewEvent from "./components/newEvent/NewEvent";
import "./styles/app.scss";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/dashboard" element={<DashboardComponent />} />
        <Route path="/createEvent" element={<NewEvent />} />
      </Routes>
    </div>
  );
}

export default App;
