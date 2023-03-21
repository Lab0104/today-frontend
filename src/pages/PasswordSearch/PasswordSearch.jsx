import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function PasswordSearch() {
  const navigate = useNavigate();
  const {
    register,
    formState: { isSubmitting, errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    // 회원가입 비동기 처리 -> 서버로 데이터 보내는 로직 작성하기
    await new Promise((dummy) => setTimeout(dummy, 1000));
    console.log(data);
  };
  return (
    <Container>
      <h2>비밀번호 찾기</h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Label id="email">이메일</Label>
        <Input
          id="email"
          type="text"
          placeholder="이메일(ID)"
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
        <SearchButton type="submit" disabled={isSubmitting}>
          비밀번호 찾기
        </SearchButton>
        <BackButton type="button" onClick={() => navigate("/login")}>
          돌아가기
        </BackButton>
      </Form>
    </Container>
  );
}

const inputError = css`
  border: 2px solid red;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  gap: 20px;
`;
const Form = styled.form`
  width: 350px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;
const Label = styled.label`
  font-size: 12px;
  text-align: left;
`;
const Input = styled.input`
  outline: none;
`;
const FormErrorMessage = styled.p`
  font-size: 10px;
  color: red;
  text-align: left;
  margin: 0;
`;
const SearchButton = styled.button`
  font-size: 12px;
`;
const BackButton = styled.button`
  background-color: gray;
`;
