import React, { useRef } from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import NavigationBar from "components/NavigationBar/NavigationBar";
import { IoMdSettings } from "@react-icons/all-files/io/IoMdSettings";
import { AiOutlineEdit } from "@react-icons/all-files/ai/AiOutlineEdit";

import { useSelector, useDispatch } from "react-redux";
import { profileUpload, backgroundUpload } from "../../reducer/UserSlice";
import { TypeUser } from "userTypes";
import { Event } from "eventType";
import "./Profile.scss";

const profiles = [
  { label: "닉네임", value: "nickname" },
  { label: "이메일", value: "email" },
  { label: "주소", value: "address" },
  { label: "평점", value: "score" },
];
const notFoundProfiles = [
  { label: "닉네임", value: "호기로운 강남대생" },
  { label: "이메일", value: "kangnam@kangnam.ac.kr" },
  { label: "주소", value: "경기도 용인시 기흥구 강남서로 20" },
  { label: "평점", value: 5 },
];

const ProfileImage = styled.div<{ imgUrl: any }>`
  position: relative;
  width: 170px;
  height: 170px;
  border-radius: 50%;
  background-color: #eee;
  background-image: url(${({ imgUrl }) => imgUrl});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  z-index: 1;

  @media (max-width: 768px) {
    & {
      width: 120px;
      height: 120px;
    }
  }
`;

const BackgroundImage = styled.div<{ imgUrl: any }>`
  position: absolute;
  top: 0;
  width: 100%;
  height: 70%;
  background-color: pink;
  border-radius: 5px 5px 0 0;
  background-image: url(${({ imgUrl }) => imgUrl});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;

export default function Profile() {
  const userData = useRef<any>([]);
  const dispatch = useDispatch();
  const {
    user_id: userId,
    nickname,
    email,
    address,
    score,
    profile_image,
    background_image,
  } = useSelector((state: { user: TypeUser }) => state.user);

  userData.current = [nickname, email, address, score];

  const navigate = useNavigate();
  const kindOfImage = useRef<String>("");
  const fileInput = useRef<HTMLInputElement>(null);

  const imageFetch = async (url: string, type: string) => {
    try {
      const req = await fetch("/api/users/image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          url: url,
          type: type,
        }),
      });
      const res = await req.json();
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const onEditProfileClick = () => {
    navigate("/profile/check_password", { state: { user_id: userId } });
  };
  const onImageSettingClick: Event<"div", "onClick"> = (e) => {
    kindOfImage.current = e.currentTarget.id;
    console.log(e.currentTarget.id);
    return fileInput.current && fileInput.current.click();
  };
  const profileImageChange: Event<"input", "onChange"> = async (e) => {
    if (fileInput.current?.files) {
      const url = URL.createObjectURL(fileInput.current.files[0]);
      console.log(url);

      if (kindOfImage.current === "profile") {
        await imageFetch(url, "profile");
        dispatch(
          profileUpload({
            profile_image: url,
          })
        );
      } else {
        await imageFetch(url, "background");
        dispatch(
          backgroundUpload({
            background_image: url,
          })
        );
      }
      // Base64 인코딩까지 처리하는 FileReader 방식
      // const reader = new FileReader();
      // reader.readAsDataURL(fileInput.current.files[0]);
      // reader.onloadend = () => {
      //   console.log(reader.result);
      //   if (reader.result) {
      //     if (kindOfImage.current === "profile") {
      //       console.log("profile upload!");
      //       dispatch(
      //         profileUpload({
      //           profile_image: reader.result,
      //         })
      //       );
      //     } else if (kindOfImage.current === "background") {
      //       console.log("background upload!");
      //       dispatch(
      //         backgroundUpload({
      //           background_image: reader.result,
      //         })
      //       );
      //     }
      //   }
      // };
    }
  };

  return (
    <>
      <NavigationBar />
      <div className="profile-container">
        <h3>프로필 정보</h3>
        <hr />
        <div className="headers">
          <div className="profile-header">
            <div
              className="background-icon"
              id="background"
              onClick={onImageSettingClick}
            >
              <IoMdSettings />
            </div>
            <BackgroundImage imgUrl={background_image} />
            <input
              type="file"
              style={{ display: "none" }}
              accept="image/*"
              onChange={profileImageChange}
              ref={fileInput}
            />
            <ProfileImage imgUrl={profile_image}>
              <div
                className="profile-icon"
                id="profile"
                onClick={onImageSettingClick}
              >
                <IoMdSettings />
              </div>
            </ProfileImage>
            <div className="profile-content">
              <span>{nickname}</span>
            </div>
          </div>
          <div className="profile-info">
            <div className="info-header">
              <h4>유저 정보</h4>
              <AiOutlineEdit onClick={onEditProfileClick} />
            </div>
            <div className="info-user">
              <div className="info-category">
                {profiles &&
                  profiles.map((item, idx) => (
                    <div key={idx}>
                      <span key={idx}>{item.label}</span>
                      <hr />
                    </div>
                  ))}
              </div>
              <div className="info-content">
                {profiles &&
                  profiles.map((item, idx) => (
                    <div key={idx}>
                      <span>{userData.current[idx]}</span>
                      <hr />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
        {/* <div className="user-activity">
          <h4>활동 내역</h4>
        </div> */}
        <div className="profile-submit">
          <button
            aria-label="move to previous page"
            onClick={() => navigate(-1)}
          >
            뒤로 가기
          </button>
          <button aria-label="profile edit" onClick={onEditProfileClick}>
            회원정보 수정
          </button>
        </div>
      </div>
    </>
  );
}
