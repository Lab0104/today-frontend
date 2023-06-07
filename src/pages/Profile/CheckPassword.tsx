import React, { useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import NavigationBar from "components/NavigationBar/NavigationBar";

import { Event } from "eventType";
import "./Profile.scss";

export default function CheckPassword() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const userPassword = useRef("");

  const onPasswordChange: Event<"input", "onChange"> = (e) => {
    userPassword.current = e.currentTarget.value;
  };

  const onSubmitClick = async () => {
    console.log(userPassword.current);
    console.log(state.user_id);
    try {
      const req = await fetch("/api/auth/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: state.user_id,
          password: userPassword.current,
        }),
      });
      const res = await req.json();
      console.log(res);

      if (res.status === "Success") {
        if (state.type === "delete") {
          navigate("/redirect", { state: { type: "delete" } });
        } else {
          navigate("/profile/edit");
        }
      } else {
        alert("잘못 된 비밀번호입니다.");
      }
    } catch (err) {
      navigate("/profile/edit");
      console.log(err);
    }
  };

  useEffect(() => {
    if (!state) {
      alert("잘못 된 접근입니다.");
      navigate("/");
    }
  }, []);

  return (
    <>
      <NavigationBar />
      <div className="profile-container">
        <h3>비밀번호 확인</h3>
        <hr />
        <label id="pw">비밀번호</label>
        <input type="password" id="pw" onChange={onPasswordChange} />
        <div className="profile-submit">
          <button onClick={() => navigate(-1)}>뒤로가기</button>
          <button onClick={onSubmitClick}>확인</button>
        </div>
      </div>
    </>
  );
}
