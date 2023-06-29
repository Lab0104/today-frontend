import React, { useEffect } from "react";
import styled from "@emotion/styled";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "reducer/UserSlice";
import { useNavigate } from "react-router-dom";

import SpinnerPlaceHolder from "components/Skeleton/placeholders/SpinnerPlaceHolder";

import { TypeUser } from "userTypes";

const Container = styled.div`
  width: 100vh;
  height: 100vh;
`;

export default function DeleteProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user_id, login_method, access_token } = useSelector(
    (state: { user: TypeUser }) => state.user
  );

  // 로그아웃, 엑세스 토큰과 리프레시 토큰 만료 처리
  const kakaoUserDelete = async () => {
    const req = await fetch("https://kapi.kakao.com/v1/user/unlink", {
      method: "POST",
      headers: { Authorization: `Bearer ${access_token}` },
    });
    const res = await req.json();
    console.log(res);
  };

  const localUserDelete = async () => {
    const req = await fetch(`/api/users/${user_id}`, {
      method: "DELETE",
    });
    const res = await req.json();
    console.log(res);
  };

  useEffect(() => {
    if (login_method === "kakao") {
      kakaoUserDelete();
    } else if (login_method === "local") {
      console.log("local delete");
      localUserDelete();
    }
    dispatch(logout());
    alert("떠나신다니 아쉽습니다..");
    navigate("/");
  }, []);

  return (
    <Container>
      <SpinnerPlaceHolder />
    </Container>
  );
}
