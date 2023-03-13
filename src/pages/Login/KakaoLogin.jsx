// import React, { useCallback, useEffect } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { REST_API_KEY, REDIRECT_URI, CLIENT_SECRET } from "./dataKakaoLogin";

import { useDispatch } from "react-redux";
import { kakaoLogin } from "../../store/userSlice";

// 인가 코드를 백엔드로 보내서 토큰 받아와야함
export default function KakaoLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const location = useLocation();
  // const code = location.search.split("=")[1];

  const goToHome = () => {
    dispatch(kakaoLogin());
    navigate("/");
    // navigate("/", { state: { logOn: "kakao" } });
  };

  useEffect(() => {
    console.log("아쉽지만 토큰 받아와서 로그인은 다음에..!");
    goToHome();
  }, []);
  // const getKakaoToken = () => {
  //   fetch(
  //     `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}
  //   &code=${code}&client_secret=${CLIENT_SECRET}`,
  //     {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/x-www-form-urlencoded",
  //       },
  //     }
  //   )
  //     .then((res) => {
  //       console.log(res);
  //       res.json();
  //     })
  //     .then((data) => {
  //       console.log(data);
  //       if (data.access_token) {
  //         localStorage.setItem("token", data.access_token);
  //         dispatch(kakaoLogin());
  //       } else {
  //         Navigate("/");
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  // useEffect(() => {
  //   if (!location.search) return;
  //   getKakaoToken();
  // }, []);

  return (
    <>
      <h1>카카오 로그인 페이지 로딩중...</h1>
    </>
  );
}
