import React, { useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import NavigationBar from "components/NavigationBar/NavigationBar";

import { Event } from "eventType";
import "./Profile.scss";

export default function CheckPassword() {
  const location = useLocation();
  const navigate = useNavigate();
  const userPassword = useRef("");

  const onPasswordChange: Event<"input", "onChange"> = (e) => {
    userPassword.current = e.currentTarget.value;
  };

  const onSubmitClick = async () => {
    console.log(userPassword.current);
    console.log(location.state.user_id);
    try {
      const req = await fetch("/api/selectIdUserData", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          param: [location.state.user_id, userPassword.current],
        }),
      });
      const res = await req.json();
      console.log(res);

      if (res.length) {
        if (location.state.type === "delete") {
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

  return location.state ? (
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
  ) : (
    <div>잘못 된 접근입니다. Not Found 404</div>
  );
}
