// 비제어 컴포넌트 방식
/** @jsxImportSource @emotion/react */
import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { useDaumPostcodePopup } from "react-daum-postcode";

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
const Input = styled.input`
  outline: none;
`;
const FormErrorMessage = styled.p`
  font-size: 10px;
  color: red;
  text-align: left;
  margin: 0;
`;
const AddressForm = styled.div`
  display: flex;
  gap: 10px;
`;
const AddressInput = styled.input`
  width: calc(80% - 5px);
  outline: none;
`;
const AddressButton = styled.button`
  width: calc(20% - 5px);
  transition: all 0.2s linear;
  &:hover {
    transform: scale(1.1);
  }
`;
const SignupButton = styled.button`
  font-size: 12px;
`;
const BackButton = styled.button`
  background-color: gray;
`;

export default function Signup_() {
  const navigate = useNavigate();
  const {
    register,
    setValue,
    getValues,
    clearErrors,
    formState: { isSubmitting, errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    // 회원가입 비동기 처리 -> 서버로 데이터 보내는 로직 작성하기
    await new Promise((dummy) => setTimeout(dummy, 1000));
    console.log(data);
  };

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
    setValue("address", fullAddress);
    clearErrors("address");
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

  return (
    <Container>
      <h2>회원가입</h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="text"
          placeholder="별명"
          css={errors?.nickname && inputError}
          {...register("nickname", {
            required: "닉네임을 입력해주세요.",
            minLength: {
              value: 2,
              message: "2자 이상 입력해주세요.",
            },
          })}
        />
        {errors?.nickname && (
          <FormErrorMessage>{errors?.nickname?.message}</FormErrorMessage>
        )}
        <Input
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
        <Input
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
        <Input
          type="password"
          placeholder="비밀번호 확인"
          css={errors?.confirmPassword && inputError}
          {...register("confirmPassword", {
            required: "동일한 비밀번호를 입력해주세요.",
            validate: (value, formValues) =>
              value === getValues("password") ||
              "비밀번호가 일치하지 않습니다.",
          })}
        />
        {errors?.confirmPassword && (
          <FormErrorMessage>
            {errors?.confirmPassword?.message}
          </FormErrorMessage>
        )}
        <AddressForm>
          <AddressInput
            type="text"
            placeholder="주소"
            css={errors?.address && inputError}
            readOnly
            {...register("address", {
              required: "주소지를 입력해주세요.",
            })}
          />
          <AddressButton type="button" onClick={onAddressClick}>
            주소
            <br />
            찾기
          </AddressButton>
        </AddressForm>
        {errors?.address && (
          <FormErrorMessage>{errors?.address?.message}</FormErrorMessage>
        )}
        <Input
          type="text"
          placeholder="상세주소"
          {...register("detail_address")}
        />
        <SignupButton type="submit" disabled={isSubmitting}>
          회원가입
        </SignupButton>
        <BackButton type="button" onClick={() => navigate("/login")}>
          뒤로가기
        </BackButton>
      </Form>
    </Container>
  );
}
