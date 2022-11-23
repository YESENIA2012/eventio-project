import Login from "./Components/login/Login";
import React from "react";
import { Routes, Route } from "react-router-dom";
import SignUp from "./Components/signUp/SignUp";
import "./styles/app.scss";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="sign-up" element={<SignUp />} />
        {/* <Route path="contact" element={<Contact />} /> */}
      </Routes>
    </div>
  );
}

export default App;
