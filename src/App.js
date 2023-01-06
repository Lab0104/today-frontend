import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import Login from "./pages/Login/Login";
import SignUp from "./pages/Signup/Signup";
import IdSearch from "./pages/IdSearch/IdSearch";
import PasswordSearch from "./pages/PasswordSearch/PasswordSearch";

function App() {
  return (
    <div className="App">
      <div className="header">헤더영역</div>
      <div className="container">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/search/id" element={<IdSearch />} />
          <Route path="/search/password" element={<PasswordSearch />} />
        </Routes>
      </div>
      <div className="footer">푸터영역</div>
    </div>
  );
}

export default App;
