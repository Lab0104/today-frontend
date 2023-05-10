// import React, { useCallback, useEffect } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../reducer/UserSlice";

import SpinnerPlaceHolder from "../../components/Skeleton/placeholders/SpinnerPlaceHolder";
import "./Login.scss";

export default function KakaoLogout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(logout());
    alert("로그아웃 되었습니다.");
    navigate("/");
  }, []);

  return (
    <>
      <div className="login-container">
        <SpinnerPlaceHolder size={100} />
      </div>
    </>
  );
}
