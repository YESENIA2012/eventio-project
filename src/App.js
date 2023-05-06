import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/login/Login";
import Dashboard from "./components/dashboard";
import EditEvent from "./components/events/EditEvents";
import Profile from "./components/profile/Profile";
import DetailEvent from "./components/events/DetailEvent";
import SignUp from "./components/signUp/SignUp";
import NewEvent from "./components/events/NewEvent";
import "./styles/app.scss";
import { UserProvider } from "./components/globalState";

function App() {
  return (
    <div className="App">
      <UserProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/editEvent/:id" element={<EditEvent />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/detailEvent/:id" element={<DetailEvent />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/createEvent" element={<NewEvent />} />
        </Routes>
      </UserProvider>
    </div>
  );
}

export default App;
