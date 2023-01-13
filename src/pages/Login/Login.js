import React, { useState } from "react";
import { Link } from "react-router-dom";

import { REDIRECT_URI, REST_API_KEY } from "./dataKakaoLogin";
import "./Login.css";

function Login() {
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const [email, setEmail] = useState("");
  const [idStatus, setIdStatus] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordStatus, setPasswordStatus] = useState(false);
  const [loginSaved, setLoginSaved] = useState(false);

  const onEmailHandler = (e) => {
    const value = e.currentTarget.value;
    setEmail((email) => value);
    if (value.match(/\w{4,}@\w{2,}\.\w{2,}/g))
      return setIdStatus((status) => true);
    return setIdStatus((status) => false);
  };
  const onPasswordHandler = (e) => {
    const value = e.currentTarget.value;
    setPassword(value);
    if (value.length < 6) {
      setPasswordStatus(false);
    } else {
      setPasswordStatus(true);
    }
  };
  const onLoginSavedCheckHandler = (e) => {
    if (e.target.checked) {
      setLoginSaved(true);
    } else {
      setLoginSaved(false);
    }
  };
  const onLoginBtnHandler = (e) => {
    // api 로그인 요청이 들어갈 자리
    if (!(idStatus && passwordStatus)) {
      alert("잘못 된 아이디 또는 비밀번호입니다.");
      return;
    }
    console.log("Email: ", email);
    console.log("Password: ", password);
    console.log("checked: ", loginSaved);
    console.log("isIdEmail?: ", idStatus);
  };

  const kakaoLoginHandler = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  /*
  -- style변경 or API 요청에 활용 예정 --
  useEffect(() => {
    if (idStatus) {
      console.log("참!");
    } else {
      console.log("거짓!");
    }
  }, [idStatus]);

  useEffect(() => {
    if (passwordStatus) {
      console.log("참된값!");
    } else {
      console.log("거짓값!");
    }
  }, [passwordStatus]);
  */

  return (
    <div className="login">
      <div className="login-form">
        <label>ID</label>
        <input
          type="email"
          value={email}
          placeholder="이메일"
          onChange={onEmailHandler}
          style={{ border: `${idStatus ? "" : "2px solid red"}` }}
        ></input>
        {idStatus || (
          <label className="input-alert">올바른 이메일 형식이 아닙니다.</label>
        )}

        <label>PW</label>
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={onPasswordHandler}
          style={{ border: `${passwordStatus ? "" : "2px solid red"}` }}
        ></input>
        {passwordStatus || (
          <label className="input-alert" style={{}}>
            비밀번호는 최소 6자 이상입니다.
          </label>
        )}

        <div className="login-checkbox">
          <input
            type="checkbox"
            id="loginSaved"
            value={loginSaved}
            onChange={onLoginSavedCheckHandler}
          />
          <label id="loginSaved">아이디 저장하기</label>
        </div>

        <button className="btn btn-login" onClick={onLoginBtnHandler}>
          로그인
        </button>
      </div>

      <div className="login-options">
        <div className="search-info">
          <Link to="/search/id">아이디 찾기</Link> |&nbsp;
          <Link to="/search/password">비밀번호 찾기</Link>
        </div>
        <div className="line">
          <hr />
          <span>또는</span>
          <hr />
        </div>
        <img
          src="images/kakao_login_buttons/kakao_login_large_wide.png"
          alt="카카오 로그인"
          onClick={kakaoLoginHandler}
        />
        <div className="naver-btn">
          <img
            src="images/naver_login_buttons/btnG_아이콘원형.png"
            alt="icon"
          />
          <span>네이버 로그인</span>
        </div>
        <div className="search-info">
          <span>아직 회원이 아니신가요?</span>&nbsp;
          <Link to="/signUp">회원가입</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
