import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import EditEvent from "./components/editEvent/EditEvents";
import "./styles/app.scss";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/EditEvent" element={<EditEvent />} />
      </Routes>
    </div>
  );
}

export default App;
