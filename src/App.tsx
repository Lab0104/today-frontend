import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.scss";

import GlobalModal from "./components/Modal/GlobalModal";
import Main from "./pages/Main/Main";
import Article from "pages/Article/Article";
import Login from "./pages/Login/Login";
import Redirect from "pages/Redirect/Redirect";
import KakaoLogin from "./pages/Login/KakaoLogin";
import KakaoLogout from "pages/Login/KakaoLogout";
import NaverLogin from "./pages/Login/NaverLogin";
import Signup from "./pages/Signup/Signup";
import SignupCategory from "./pages/Signup/SignupCategory";
import IdSearch from "./pages/IdSearch/IdSearch";
import PasswordSearch from "./pages/PasswordSearch/PasswordSearch";
import Profile from "pages/Profile/Profile";
import MapPage from "./pages/MapPage/MapPage";
import Notice from "pages/Notice/Notice";
import CheckPassword from "pages/Profile/CheckPassword";
import EditProfile from "pages/Profile/EditProfile";

const App: React.FC = () => {
  return (
    <div className="App">
      <GlobalModal />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/article" element={<Article />} />
        <Route path="/login" element={<Login />} />
        <Route path="/redirect" element={<Redirect />} />
        <Route path="/kakaoLogin" element={<KakaoLogin />} />
        <Route path="/kakaoLogout" element={<KakaoLogout />} />
        <Route path="/naverLogin" element={<NaverLogin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signup/category" element={<SignupCategory />} />
        <Route path="/search/id" element={<IdSearch />} />
        <Route path="/search/password" element={<PasswordSearch />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/check_password" element={<CheckPassword />} />
        <Route path="/profile/edit" element={<EditProfile />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/notice" element={<Notice />} />
      </Routes>
    </div>
  );
};

export default App;
