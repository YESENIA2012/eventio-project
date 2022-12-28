import React from "react";
import { Routes, Route } from "react-router-dom";
import SignUp from "./components/signUp/SignUp";
import Dashboard from "./components/dashboard/Dashboard";
import Error404 from "./components/error/Error404";
import "./styles/app.scss";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </div>
  );
}

export default App;
