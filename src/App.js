import React from "react";
import { Routes, Route } from "react-router-dom";

import Dashboard from "./components/dashboard/Dashboard";
import NewEvent from "./components/newEvent/NewEvent";
import EditEvent from "./components/editEvent/EditEvents";
import Profile from "./components/profile/Profile";
import DetailEvent from "./components/eventClicked/DetailEvent";

import "./styles/app.scss";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/createEvent" element={<NewEvent />} />
        <Route path="/editEvent" element={<EditEvent />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/detailEvent" element={<DetailEvent />} />
      </Routes>
    </div>
  );
}

export default App;
