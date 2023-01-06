import React, { useState } from "react";
import "./Signup.css";

function SignUp() {
  const [inputs, setInputs] = useState({
    name: "",
    birth: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    detailAddress: "",
  });
  const onChange = (e) => {
    const value = e.target.value;
    const id = e.target.id;
    setInputs((inputs) => ({
      ...inputs,
      [id]: value,
    }));
  };
  return (
    <div className="signUp">
      <h3 style={{ marginTop: "0" }}>오늘 하루</h3>
      <h1>회원가입</h1>
      <div className="user-info">
        <span>사용자 정보</span>
        <input
          type="text"
          id="name"
          value={inputs.name}
          onChange={onChange}
          placeholder="이름"
        ></input>
        <input
          type="text"
          id="birth"
          value={inputs.birth}
          onChange={onChange}
          placeholder="생년월일"
        ></input>
        <input
          type="text"
          id="phone"
          value={inputs.phone}
          onChange={onChange}
          placeholder="전화번호"
        ></input>
      </div>
      <hr />
      <div className="signUp-form">
        <input
          type="email"
          id="email"
          value={inputs.email}
          onChange={onChange}
          placeholder="이메일"
        ></input>
        <input
          type="password"
          id="password"
          value={inputs.password}
          onChange={onChange}
          placeholder="비밀번호"
        ></input>
        <input
          type="password"
          id="confirmPassword"
          value={inputs.confirmPassword}
          onChange={onChange}
          placeholder="비밀번호 확인"
        ></input>
        <div className="search-address">
          <input
            type="text"
            id="address"
            value={inputs.address}
            onChange={onChange}
            placeholder="주소"
          ></input>
          <button>주소찾기</button>
        </div>
        <input
          type="text"
          id="detailAddress"
          value={inputs.detailAddress}
          onChange={onChange}
          placeholder="상세주소"
        ></input>
        <button>회원가입</button>
      </div>
    </div>
  );
}

export default SignUp;
