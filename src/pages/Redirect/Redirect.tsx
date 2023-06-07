import React, { useEffect } from "react";
import styled from "@emotion/styled";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "reducer/UserSlice";
import { useLocation, useNavigate } from "react-router-dom";

import SpinnerPlaceHolder from "components/Skeleton/placeholders/SpinnerPlaceHolder";

import { TypeUser } from "userTypes";

const Container = styled.div`
  width: 100vh;
  height: 100vh;
`;

export default function Redirect() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { user_id, login_method, access_token } = useSelector(
    (state: { user: TypeUser }) => state.user
  );
  const { url } = location.state as { url: string };
  const { type } = location.state as { type: string };

  const kakaoUserDelete = async () => {
    const req = await fetch("https://kapi.kakao.com/v1/user/unlink", {
      method: "POST",
      headers: { Authorization: `Bearer ${access_token}` },
    });
    const res = await req.json();
    console.log(res);

    dispatch(logout());
    navigate("/");
  };

  const localUserDelete = async () => {
    const req = await fetch(`/api/users/${user_id}`, {
      method: "DELETE",
    });
    const res = await req.json();
    console.log(res);

    dispatch(logout());
    navigate("/");
  };

  useEffect(() => {
    if (url) window.location.href = url;
    else {
      if (type === "delete") {
        if (login_method === "kakao") {
          kakaoUserDelete();
        } else if (login_method === "local") {
          console.log("local delete");
          localUserDelete();
        }
      }
    }
  }, []);

  return (
    <Container>
      <SpinnerPlaceHolder size={300} />
    </Container>
  );
}
