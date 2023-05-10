/** @jsxImportSource @emotion/react */
import React, { useEffect } from "react";
import { css } from "@emotion/react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDaumPostcodePopup } from "react-daum-postcode";
import { useSelector } from "react-redux";

import NavigationBar from "components/NavigationBar/NavigationBar";

import { useGetPostQuery } from "services/postApi";
import { TypeProfile } from "userTypes";
import "./EditProfile.scss";
import ProfilePlaceHolder from "components/Skeleton/placeholders/ProfilePlaceHolder";

type FormValues = {
  nickname: string;
  password: string;
  confirmPassword: string;
  address: string;
  detail_address: string;
};

export default function EditProfile() {
  const { user_id } = useSelector((state: { user: TypeProfile }) => state.user);
  const {
    data: userData,
    isLoading: EditLoading,
    error: EditError,
  } = useGetPostQuery({
    name: `profile?user_id=${user_id}`,
  });
  const navigate = useNavigate();
  const {
    register,
    setValue,
    getValues,
    clearErrors,
    formState: { isSubmitting, errors },
    handleSubmit,
  } = useForm<FormValues>();

  useEffect(() => {
    setValue("nickname", userData.nickname);
    setValue("address", userData.address);
  }, [setValue, userData]);

  const onSubmit = async (data: FormValues) => {
    console.log(data);
    try {
      const req = await fetch("/api/profile/edit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const isEdit = await req.json();
      console.log(isEdit);
      if (isEdit.edit_status) {
        alert("개인정보 수정이 완료되었습니다.");
        navigate("/profile");
      }
    } catch (err) {
      alert(err);
      navigate("/profile");
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

  const onCancelClick = () => {
    navigate("/");
  };
  const onUserDeleteClick = () => {
    navigate("/profile/check_password", {
      state: { type: "delete", user_id: user_id },
    });
  };

  if (EditLoading) {
    return <ProfilePlaceHolder />;
  }
  if (EditError) {
    return <h1>Not Found 404</h1>;
  }
  return (
    <>
      <NavigationBar />
      <div className="edit-container">
        <h2 className="title">회원정보 수정</h2>
        <form className="signupForm" onSubmit={handleSubmit(onSubmit)}>
          <input
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
            <p className="errorMessage">{errors?.nickname?.message}</p>
          )}
          <input
            type="password"
            placeholder="새 비밀번호"
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
            저장
          </button>
          <button
            type="button"
            onClick={onCancelClick}
            css={css`
              background-color: gray;
            `}
          >
            취소
          </button>
        </form>
        <div className="user-delete">
          <span onClick={onUserDeleteClick}>회원 탈퇴</span>
        </div>
      </div>
    </>
  );
}

const inputError = css`
  border: 2px solid red;
`;
