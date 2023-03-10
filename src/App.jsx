import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.scss";

import Login from "./pages/Login/Login";
import KakaoLogin from "./pages/Login/KakaoLogin";
import NaverLogin from "./pages/Login/NaverLogin";
import SignUp from "./pages/Signup/Signup";
import IdSearch from "./pages/IdSearch/IdSearch";
import PasswordSearch from "./pages/PasswordSearch/PasswordSearch";
import MapPage from "./pages/MapPage/MapPage";
import Main from "./pages/Main/Main";
import GlobalModal from "./components/Modal/GlobalModal";

function App() {
  return (
    <div className="App">
      <GlobalModal />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/kakaoLogin" element={<KakaoLogin />} />
        <Route path="/naverLogin" element={<NaverLogin />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/search/id" element={<IdSearch />} />
        <Route path="/search/password" element={<PasswordSearch />} />
        <Route path="/map" element={<MapPage />} />
      </Routes>
    </div>
  );
}

export default App;
