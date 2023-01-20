import React, { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// 인가 코드를 백엔드로 보내서 토큰 받아와야함
function KakaoLogin() {
  const navigate = useNavigate();
  const code = new URL(window.location.href);
  console.log(code);
  const code_params = code.searchParams.get("code");
  console.log(code_params);

  const goToHome = useCallback(async () => {
    navigate("/", { state: { loginStatus: true, logOn: "kakao" } });
  }, [navigate]);

  useEffect(() => {
    console.log("아쉽지만 토큰 받아와서 로그인은 다음에..!");
    goToHome();
  }, [goToHome]);

  return (
    <>
      <h1>카카오 로그인 페이지 로딩중...</h1>
    </>
  );
}

export default KakaoLogin;
