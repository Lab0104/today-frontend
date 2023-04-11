import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.scss";

import GlobalModal from "./components/Modal/GlobalModal";
import Main from "./pages/Main/Main";
import Login from "./pages/Login/Login_";
import KakaoLogin from "./pages/Login/KakaoLogin";
import NaverLogin from "./pages/Login/NaverLogin";
import Signup from "./pages/Signup/Signup_";
import SignupCategory from "./pages/Signup/SignupCategory";
import IdSearch from "./pages/IdSearch/IdSearch";
import PasswordSearch from "./pages/PasswordSearch/PasswordSearch";
import MapPage from "./pages/MapPage/MapPage";
import Notice from "pages/Notice/Notice";

const App: React.FC = () => {
  return (
    <div className="App">
      <GlobalModal />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/kakaoLogin" element={<KakaoLogin />} />
        <Route path="/naverLogin" element={<NaverLogin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signup/category" element={<SignupCategory />} />
        <Route path="/search/id" element={<IdSearch />} />
        <Route path="/search/password" element={<PasswordSearch />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/notice" element={<Notice />} />
      </Routes>
    </div>
  );
};

export default App;
