/** @jsxImportSource @emotion/react */
import React, { useState, useRef, useEffect } from "react";
import { css } from "@emotion/react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FcCheckmark } from "react-icons/fc";
import { useDaumPostcodePopup } from "react-daum-postcode";
import { useSelector, useDispatch } from "react-redux";
import {
  setEmailSendClick,
  setLimitTime,
  setIsTimeout,
} from "../../reducer/EmailVerify";

import { emailCheck } from "../../utils/regexCheck";
import SpinnerPlaceHolder from "components/Skeleton/placeholders/SpinnerPlaceHolder";
import TimeLimit from "components/TimeLimit/TimeLimit";
import "./Signup.scss";

type FormValues = {
  nickname: string;
  email: string;
  inputVerifyNum: number;
  password: string;
  confirmPassword: string;
  address: string;
  detail_address: string;
};

export default function Signup() {
  const dispatch = useDispatch();
  const { emailSendClick, isTimeout } = useSelector(
    (state: { emailVerify: any }) => state.emailVerify
  );

  const verifyNumber = useRef<number>(0);
  const emailVerifyForm = useRef<HTMLDivElement>(null);
  const [isVerify, setIsVerify] = useState(false);
  const [isClick, setIsClick] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const {
    register,
    setValue,
    setError,
    getValues,
    clearErrors,
    formState: { isSubmitting, errors },
    handleSubmit,
  } = useForm<FormValues>();

  useEffect(() => {
    dispatch(setLimitTime({ limitTime: 0 }));
    dispatch(setEmailSendClick({ emailSendClick: true }));
    dispatch(setIsTimeout({ isTimeout: false }));
  }, []);

  const onSubmit = async (data: FormValues) => {
    console.log(data);
    if (!isVerify) {
      setError("inputVerifyNum", {
        type: "invalid verify email",
        message: "인증번호를 받아 이메일을 인증해주세요",
      });
      return;
    }
    try {
      const req = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const isSignup = await req.json();
      if (isSignup) {
        navigate("/signup/category");
      }
    } catch (err) {
      alert(err);
    }
  };

  const open = useDaumPostcodePopup();
  const POPUPWIDTH = 500;
  const POPUPHEIGHT = 400;
  const handleComplete = (data: {
    sigungu: string;
    address: string;
    addressType: string;
    bname?: string | undefined;
    buildingName?: string | undefined;
  }) => {
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

  const checkSignupEmail = async (email: string) => {
    const req = await fetch("/api/selectAllUserData", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ param: [email] }),
    });
    const res = await req.json();

    return res;
  };

  const onEmailSendClick = async () => {
    if (isVerify) return;
    const email = getValues("email");
    if (emailCheck(email)) {
      if (emailSendClick) {
        const isPossible = await checkSignupEmail(email);
        if (isPossible.length) {
          setError("email", {
            type: "already assigned email",
            message: "이미 가입 된 이메일입니다.",
          });
          return;
        }
        setIsClick(false);
        try {
          setLoading(true);
          const req = await fetch("/api/signup/email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
          });
          const isValid = await req.json();
          console.log(isValid);
          verifyNumber.current = isValid?.authNumber;
          if (emailVerifyForm.current) {
            emailVerifyForm.current.style.display = "flex";
          }
          clearErrors("email");
          dispatch(setLimitTime({ limitTime: 180 }));
          dispatch(setIsTimeout({ isTimeout: false }));
          setLoading(false);
          setIsClick(true);
        } catch (err) {
          console.log(err);
        }
      } else {
        alert("인증번호를 받은 시간의 10초 뒤에 다시 눌러주세요");
      }
    } else {
      setError("email", {
        type: "email invalid",
        message: "유효한 이메일 형식이 아닙니다.",
      });
    }
  };

  const onVerifyClick = () => {
    if (isVerify) return;
    if (!isTimeout) {
      alert(
        "이메일 검증 유효 시간이 만료되었습니다. 인증번호를 다시 받아주세요"
      );
      return;
    }
    const inputValue = Number(getValues("inputVerifyNum"));
    if (inputValue !== verifyNumber.current) {
      setError("inputVerifyNum", {
        type: "invalid verify number",
        message: "인증번호가 일치하지 않습니다.",
      });
    } else {
      clearErrors("inputVerifyNum");
      setIsVerify(true);
      alert("인증번호가 일치합니다.");
    }
  };

  return (
    <div className="signup-container">
      <h2 className="title">회원가입</h2>
      <form className="signupForm" onSubmit={handleSubmit(onSubmit)}>
        <div className="buttonForm">
          <input
            disabled={isVerify ? true : false}
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
          <button id="verify-button" type="button" onClick={onEmailSendClick}>
            {loading ? (
              <SpinnerPlaceHolder size={30} top={23} />
            ) : (
              <span>
                인증번호
                <br />
                받기
              </span>
            )}
          </button>
        </div>
        {errors?.email && (
          <p className="errorMessage">{errors?.email?.message}</p>
        )}
        {isClick && (
          <div className="email-verify-form" ref={emailVerifyForm}>
            <div className="buttonForm" id="email-verify-input">
              <input
                disabled={isVerify ? true : false}
                type="text"
                placeholder="인증번호"
                css={errors?.inputVerifyNum && inputError}
                {...register("inputVerifyNum", {
                  required: "인증번호를 입력해주세요",
                })}
              />
              {!isVerify && <TimeLimit />}
              <button
                type="button"
                onClick={onVerifyClick}
                css={isVerify && vefifyTrue}
              >
                {isVerify ? (
                  <FcCheckmark />
                ) : (
                  <span>
                    인증번호
                    <br />
                    확인
                  </span>
                )}
              </button>
            </div>
            {errors?.inputVerifyNum && (
              <p className="errorMessage">{errors?.inputVerifyNum?.message}</p>
            )}
          </div>
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
        <input
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
          <p className="errorMessage">{errors?.confirmPassword?.message}</p>
        )}
        <div className="buttonForm">
          <input
            type="text"
            placeholder="주소"
            css={errors?.address && inputError}
            readOnly
            {...register("address", {
              required: "주소지를 입력해주세요.",
            })}
          />
          <button type="button" onClick={onAddressClick}>
            주소
            <br />
            찾기
          </button>
        </div>
        {errors?.address && (
          <p className="errorMessage">{errors?.address?.message}</p>
        )}
        <input
          type="text"
          placeholder="상세주소"
          {...register("detail_address")}
        />
        <button type="submit" disabled={isSubmitting}>
          회원가입
        </button>
        <button
          type="button"
          onClick={() => navigate("/login")}
          css={css`
            background-color: gray;
          `}
        >
          뒤로가기
        </button>
      </form>
    </div>
  );
}

const vefifyTrue = css`
  background-color: #ccc;
  border: 1px solid #000;
  cursor: default;
`;

const inputError = css`
  border: 2px solid red;
`;
