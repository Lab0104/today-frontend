import React from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

import NavigationBar from "components/NavigationBar/NavigationBar";

import "./Profile.scss";

export default function CheckPassword() {
  const navigate = useNavigate();

  return (
    <>
      <NavigationBar />
      <div className="profile-container">
        <h3>비밀번호 확인</h3>
        <hr />
        <label id="pw">비밀번호</label>
        <input type="text" id="pw" />
        <div className="profile-submit">
          <button onClick={() => navigate(-1)}>뒤로가기</button>
          <button>확인</button>
        </div>
      </div>
    </>
  );
}
