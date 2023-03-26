import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/login";
import Dashboard from "./components/dashboard";
import EditEvent from "./components/dashboard/EditEvents";
import Profile from "./components/profile/profile";
import DetailEvent from "./components/events/DetailEvent";
import SignUp from "./components/signUp/SignUp";
import NewEvent from "./components/events/NewEvent";
import "./styles/app.scss";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/editEvent" element={<EditEvent />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/detailEvent" element={<DetailEvent />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/createEvent" element={<NewEvent />} />
      </Routes>
    </div>
  );
}

export default App;
