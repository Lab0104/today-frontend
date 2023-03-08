import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.scss";

import NavigationBar from "./components/NavigationBar/NavigationBar";
import Login from "./pages/Login/Login";
import KakaoLogin from "./pages/Login/KakaoLogin";
import NaverLogin from "./pages/Login/NaverLogin";
import SignUp from "./pages/Signup/Signup";
import IdSearch from "./pages/IdSearch/IdSearch";
import PasswordSearch from "./pages/PasswordSearch/PasswordSearch";
import Main from "./pages/Main/Main";

function App() {
  return (
    <div className="App">
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/kakaoLogin" element={<KakaoLogin />} />
        <Route path="/naverLogin" element={<NaverLogin />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/search/id" element={<IdSearch />} />
        <Route path="/search/password" element={<PasswordSearch />} />
      </Routes>
    </div>
  );
}

export default App;
