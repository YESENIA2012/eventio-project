import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/login/Login";
import Dashboard from "./components/dashboard";
import EditEvent from "./components/dashboard/EditEvents";
import Profile from "./components/profile/Profile";
import DetailEvent from "./components/dashboard/DetailEvent";
import SignUp from "./components/signUp/SignUp";
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
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
