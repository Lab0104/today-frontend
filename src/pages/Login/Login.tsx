/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login } from "../../reducer/UserSlice";

import { Link, useNavigate } from "react-router-dom";

import "./Login.scss";

type FormValues = {
  email: string;
  password: string;
  isSaved: boolean;
};

export default function Login() {
  console.log("login");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_LOGIN_API_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_KAKAO_LOGIN_API_REDIRECT_URI}&response_type=code`;

  const {
    register,
    formState: { isSubmitting, errors },
    handleSubmit,
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    console.log(data);
    try {
      const req = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const res = await req.json();
      console.log(res);

      if (res.isSuccess) {
        dispatch(
          login({
            user_id: res.user_id,
            nickname: res.nickname,
            email: res.email,
            address: res.address,
            score: res.score,
            profile_image: res.profile_image,
            background_image: res.background_image,
            isSaved: res.isSaved,
            login_method: res.login_method,
            isLogged: res.isSuccess,
          })
        );
        navigate("/");
      } else {
        throw new Error("잘못된 아이디 혹은 비밀번호입니다.");
      }
    } catch (err) {
      alert(err);
    }
  };

  const kakaoLoginHandler = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <div className="login-container">
      <Link className="title" to="/">
        오늘 하루
      </Link>
      <form className="loginForm" onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="ID(이메일)"
          css={errors?.email && inputError}
          {...register("email", {
            required: "이메일을 입력해주세요.",
            pattern: {
              value: /\w{4,}@\w{2,}\.\w{2,}/g,
              message: "유효한 이메일 형식이 아닙니다.",
            },
          })}
        />
        {errors?.email && (
          <p className="errorMessage">{errors?.email?.message}</p>
        )}

        <input
          type="password"
          placeholder="비밀번호"
          css={errors?.password && inputError}
          {...register("password", {
            required: "비밀번호를 입력해주세요.",
            minLength: {
              value: 6,
              message: "6자 이상 입력해주세요.",
            },
          })}
        />
        {errors?.password && (
          <p className="errorMessage">{errors?.password?.message}</p>
        )}

        <div className="loginCheckbox">
          <input type="checkbox" id="loginSaved" {...register("isSaved")} />
          <label id="loginSaved">아이디 저장하기</label>
        </div>

        <button aria-label="login button" type="submit" disabled={isSubmitting}>
          로그인
        </button>
      </form>

      <div className="loginOptions">
        <Link to="/search/id">아이디 찾기</Link>|
        <Link to="/search/password">비밀번호 찾기</Link>
      </div>
      <div className="line">
        <hr />
        <span>또는</span>
        <hr />
      </div>
      <img
        className="kakaoLoginImage"
        src="/images/kakao_login_buttons/kakao_login_large_wide.png"
        alt="카카오 로그인"
        onClick={kakaoLoginHandler}
      />
      <div className="naverLoginButton">
        <img
          className="naverLoginImage"
          src={"images/naver_login_buttons/btnG_아이콘원형.png"}
          alt="네이버 로그인"
        />
        <span>네이버 로그인</span>
      </div>
      <div className="loginOptions">
        <span>아직 회원이 아니신가요?</span>
        <Link to="/signUp">회원가입</Link>
      </div>
    </div>
  );
}

const inputError = css`
  border: 2px solid red;
`;
