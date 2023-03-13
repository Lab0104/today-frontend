/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { css } from "@emotion/react";
import { Link } from "react-router-dom";

import { useDaumPostcodePopup } from "react-daum-postcode";

import "./Signup.css";

const title = css`
  font-size: 30px;
  font-weight: 700;
  color: #000;
`;
const backButton = css`
  background-color: gray;
`;

export default function SignUp() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    name: { val: "", stat: false },
    birth: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    detailAddress: "",
  });

  const open = useDaumPostcodePopup();
  const POPUPWIDTH = 500;
  const POPUPHEIGHT = 400;
  const handleComplete = (data) => {
    // 향후 매칭에 활용 될 시군 데이터
    console.log(data.sigungu);
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    setInputs((inputs) => ({
      ...inputs,
      address: fullAddress,
    }));
  };

  const onSignupFormChange = (e) => {
    const value = e.target.value;
    const id = e.target.id;
    if (id === "name") {
      setInputs((inputs) => ({
        ...inputs,
        name: {
          ...inputs.name,
          val: value,
          stat: value.length > 2 ? true : false,
        },
      }));
    } else {
      setInputs((inputs) => ({
        ...inputs,
        [id]: value,
      }));
    }
  };

  const onAddressClick = () => {
    open({
      onComplete: handleComplete,
      width: POPUPWIDTH,
      height: POPUPHEIGHT,
      left: document.body.offsetWidth / 2 - POPUPWIDTH / 2,
      top: window.screen.height / 2 - POPUPHEIGHT / 2,
    });
  };
  const onSignupClick = () => {
    console.log(inputs);
    navigate("/login");
  };
  const onReturnClick = () => {
    navigate("/login");
  };

  return (
    <div className="signUp">
      <Link to="/" css={title}>
        오늘 하루
      </Link>
      <h2>회원가입</h2>
      <div className="user-info">
        <span>사용자 정보</span>
        <input
          type="text"
          id="name"
          value={inputs.name.val}
          onChange={onSignupFormChange}
          placeholder="이름"
        ></input>
        <input
          type="text"
          id="birth"
          value={inputs.birth}
          onChange={onSignupFormChange}
          placeholder="생년월일(yyyymmdd)"
        ></input>
        <input
          type="text"
          id="phone"
          value={inputs.phone}
          onChange={onSignupFormChange}
          placeholder="전화번호( - 없이)"
        ></input>
      </div>
      <hr />
      <div className="signUp-form">
        <input
          type="email"
          id="email"
          value={inputs.email}
          onChange={onSignupFormChange}
          placeholder="이메일"
        ></input>
        <input
          type="password"
          id="password"
          value={inputs.password}
          onChange={onSignupFormChange}
          placeholder="비밀번호"
        ></input>
        <input
          type="password"
          id="confirmPassword"
          value={inputs.confirmPassword}
          onChange={onSignupFormChange}
          placeholder="비밀번호 확인"
        ></input>
        <div className="search-address">
          <input
            type="text"
            id="address"
            value={inputs.address}
            onChange={onAddressClick}
            placeholder="주소"
            readOnly
          ></input>
          <button onClick={onAddressClick}>주소찾기</button>
        </div>
        <input
          type="text"
          id="detailAddress"
          value={inputs.detailAddress}
          onChange={onSignupFormChange}
          placeholder="상세주소"
        ></input>
        <button onClick={onSignupClick}>회원가입</button>
        <button onClick={onReturnClick} css={backButton}>
          뒤로가기
        </button>
      </div>
    </div>
  );
}
