import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.scss";

import GlobalModal from "./components/Modal/GlobalModal";
import SpinnerPlaceHolder from "components/Skeleton/placeholders/SpinnerPlaceHolder";

const Main = lazy(() => import("./pages/Main/Main"));
const Article = lazy(() => import("./pages/Article/Article"));
const Login = lazy(() => import("./pages/Login/Login"));
const NaverLogin = lazy(() => import("./pages/Login/NaverLogin"));
const KakaoLogin = lazy(() => import("./pages/Login/KakaoLogin"));
const Signup = lazy(() => import("./pages/Signup/Signup"));
const SignupCategory = lazy(() => import("./pages/Signup/SignupCategory"));
const IdSearch = lazy(() => import("./pages/IdSearch/IdSearch"));
const PasswordSearch = lazy(
  () => import("./pages/PasswordSearch/PasswordSearch")
);
const MapPage = lazy(() => import("./pages/MapPage/MapPage"));
const Notice = lazy(() => import("./pages/Notice/Notice"));
const CheckPassword = lazy(() => import("./pages/Profile/CheckPassword"));
const Profile = lazy(() => import("./pages/Profile/Profile"));
const EditProfile = lazy(() => import("./pages/Profile/EditProfile"));
const DeleteProfile = lazy(() => import("./pages/Profile/DeleteProfile"));

const App: React.FC = () => {
  return (
    <div className="App">
      <GlobalModal />
      <Suspense fallback={<SpinnerPlaceHolder />}>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/article" element={<Article />} />
          <Route path="/login" element={<Login />} />
          <Route path="/kakaoLogin" element={<KakaoLogin />} />
          <Route path="/naverLogin" element={<NaverLogin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signup/category" element={<SignupCategory />} />
          <Route path="/search/id" element={<IdSearch />} />
          <Route path="/search/password" element={<PasswordSearch />} />
          <Route path="/profile/check_password" element={<CheckPassword />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/edit" element={<EditProfile />} />
          <Route path="/profile/delete" element={<DeleteProfile />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/notice" element={<Notice />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
