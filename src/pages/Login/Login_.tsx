/** @jsxImportSource @emotion/react */
import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login } from "../../reducer/userSlice";

import { Link, useNavigate } from "react-router-dom";

import { REDIRECT_URI, REST_API_KEY } from "./dataKakaoLogin";

type FormValues = {
  email: string;
  password: string;
  isSaved: boolean;
};

export default function Login_() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

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
      const isLogin = await req.json();

      if (isLogin) {
        dispatch(
          login({
            email: data.email,
            password: data.password,
            isSaved: data.isSaved,
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
    <Container>
      <Link to="/" css={Title}>
        오늘 하루
      </Link>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputBox
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
          <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
        )}

        <InputBox
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
          <FormErrorMessage>{errors?.password?.message}</FormErrorMessage>
        )}

        <CheckboxContainer>
          <input type="checkbox" id="loginSaved" {...register("isSaved")} />
          <label id="loginSaved">아이디 저장하기</label>
        </CheckboxContainer>

        <LoginButton type="submit" disabled={isSubmitting}>
          로그인
        </LoginButton>
      </Form>

      <SearchInfo>
        <Link to="/search/id">아이디 찾기</Link>|
        <Link to="/search/password">비밀번호 찾기</Link>
      </SearchInfo>
      <LineContainer>
        <Line />
        <Span>또는</Span>
        <Line />
      </LineContainer>
      <Img
        src="/images/kakao_login_buttons/kakao_login_large_wide.png"
        alt="카카오 로그인"
        onClick={kakaoLoginHandler}
      />
      <NaverButton>
        <Icon
          src={"images/naver_login_buttons/btnG_아이콘원형.png"}
          alt="icon"
        />
        <NaverSpan>네이버 로그인</NaverSpan>
      </NaverButton>
      <SearchInfo>
        <span>아직 회원이 아니신가요?</span>
        <Link to="/signUp">회원가입</Link>
      </SearchInfo>
    </Container>
  );
}

const inputError = css`
  border: 2px solid red;
`;

const Container = styled.div`
  width: 350px;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
`;

const Form = styled.form`
  width: 350px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Title = css`
  font-size: 30px;
  font-weight: 700;
  color: #000;
  margin-bottom: 10px;
`;

const InputBox = styled.input`
  outline: none;
`;

const FormErrorMessage = styled.p`
  font-size: 10px;
  color: red;
  text-align: left;
  margin: -10px 0 0 0;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  height: 14px;
  font-size: 11px;
  gap: 2px;
`;

const SearchInfo = styled.div`
  display: flex;
  gap: 7px;
  align-items: center;
  font-size: 12px;
`;

const LineContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
  font-size: 12px;
`;

const LoginButton = styled.button`
  font-size: 12px;
`;
const Line = styled.hr`
  width: 45%;
  height: 0;
  border-top: 1px solid #000;
  outline: none;
`;
const Span = styled.span`
  width: 10%;
  cursor: default;
`;

const Img = styled.img`
  display: block;
  width: 100%;
  cursor: pointer;
`;

const NaverButton = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 52.5px;
  background-color: #03c75a;
  border-radius: 6px;
  color: white;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
`;
const Icon = styled.img`
  width: 45px;
  height: 45px;
  margin-left: 3px;
`;
const NaverSpan = styled.span`
  padding-left: 90px;
  font-size: 15px;
`;
