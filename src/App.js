import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import NewEvent from "./components/newEvent/NewEvent";
import { EditEvent } from "./components/eventEdit";
import Login from "./components/Login";
import Profile from "./components/Profile";
import "./styles/app.scss";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/createEvent" element={<NewEvent />} />
        <Route path="/editEvent" element={<EditEvent />} />
        <Route path="/profile" element={<EditEvent />} />
      </Routes>
    </div>
  );
}

export default App;
