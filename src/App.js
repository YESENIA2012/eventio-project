import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import NewEvent from "./components/newEvent/NewEvent";
import { EditEvent } from "./components/eventEdit";
import "./styles/app.scss";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/createEvent" element={<NewEvent />} />
        <Route path="/EditEvent" element={<EditEvent />} />
      </Routes>
    </div>
  );
}

export default App;
