import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/login/Login";
import SignUp from "./components/signUp/SignUp";
import Dashboard from "./components/dashboard/Dashboard";
import NewEvent from "./components/newEvent/NewEvent";
import EditEvent from "./components/editEvent/EditEvents";
import Profile from "./components/profile/Profile";
import DetailEvent from "./components/eventClicked/DetailEvent";
import Error404 from "./components/error/Error404";
import "./styles/app.scss";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/createEvent" element={<NewEvent />} />
        <Route path="/editEvent" element={<EditEvent />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/detailEvent" element={<DetailEvent />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </div>
  );
}

export default App;
