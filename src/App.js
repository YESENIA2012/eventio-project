import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/login/Login";
import SignUp from "./components/signUp/SignUp";
import Dashboard from "./components/dashboard/Dashboard";
import NewEvent from "./components/newEvent/NewEvent";
import EditEvent from "./components/editEvent/EditEvents";
import "./styles/app.scss";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/createEvent" element={<NewEvent />} />
        <Route path="/EditEvent" element={<EditEvent />} />
      </Routes>
    </div>
  );
}

export default App;
