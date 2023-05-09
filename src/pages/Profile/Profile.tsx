import React, { useRef } from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import NavigationBar from "components/NavigationBar/NavigationBar";
import { IoMdSettings } from "react-icons/io";
import { CiEdit } from "react-icons/ci";

import { useSelector, useDispatch } from "react-redux";
import { profileUpload, backgroundUpload } from "../../reducer/UserSlice";
import { useGetPostQuery } from "services/postApi";
import { TypeUser } from "userTypes";
import { Event } from "eventType";
import "./Profile.scss";
import ProfilePlaceHolder from "components/Skeleton/placeholders/ProfilePlaceHolder";

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
  const dispatch = useDispatch();
  const {
    user_id: userId,
    profile_image,
    background_image,
  } = useSelector((state: { user: TypeUser }) => state.user);
  const {
    data: userData,
    isLoading: profileLoading,
    error: profileError,
  } = useGetPostQuery({
    name: `profile?user_id=${userId}`,
  });

  const navigate = useNavigate();
  const kindOfImage = useRef<String>("");
  const fileInput = useRef<HTMLInputElement>(null);

  const onEditProfileClick = () =>
    navigate("/profile/check_password", { state: { user_id: userId } });
  const onImageSettingClick: Event<"div", "onClick"> = (e) => {
    kindOfImage.current = e.currentTarget.id;
    console.log(e.currentTarget.id);
    return fileInput.current && fileInput.current.click();
  };
  const profileImageChange: Event<"input", "onChange"> = async (e) => {
    const formData = new FormData();
    if (e.target.files) {
      formData.append("file", e?.target.files[0]);
    }
    for (const data of formData) console.log(data);

    const reader = new FileReader();
    if (fileInput.current) {
      fileInput.current.files &&
        reader.readAsDataURL(fileInput.current.files[0]);
      reader.onloadend = () => {
        if (reader.result) {
          if (kindOfImage.current === "profile") {
            dispatch(
              profileUpload({
                profileImage: reader.result,
              })
            );
          } else if (kindOfImage.current === "background") {
            dispatch(
              backgroundUpload({
                backgroundImage: reader.result,
              })
            );
          }
        }
      };
    }
  };

  if (profileLoading) {
    return <ProfilePlaceHolder />;
  }

  if (profileError) {
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
                <span>{notFoundProfiles[0].value}</span>
              </div>
            </div>
            <div className="profile-info">
              <div className="info-header">
                <h4>유저 정보</h4>
                <CiEdit onClick={onEditProfileClick} />
              </div>
              <div className="info-user">
                <div className="info-category">
                  {notFoundProfiles &&
                    notFoundProfiles.map((item, idx) => (
                      <div key={idx}>
                        <span key={idx}>{item.label}</span>
                        <hr />
                      </div>
                    ))}
                </div>
                <div className="info-content">
                  {notFoundProfiles &&
                    notFoundProfiles.map((item, idx) => (
                      <div key={idx}>
                        <span key={idx}>{item.value}</span>
                        <hr />
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
          <div className="user-activity">
            <h4>활동 내역</h4>
          </div>
          <div className="profile-submit">
            <button onClick={() => navigate(-1)}>뒤로 가기</button>
            <button onClick={onEditProfileClick}>회원정보 수정</button>
          </div>
        </div>
      </>
    );
  }

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
              <span>{userData.nickname}</span>
            </div>
          </div>
          <div className="profile-info">
            <div className="info-header">
              <h4>유저 정보</h4>
              <CiEdit onClick={onEditProfileClick} />
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
                      <span key={idx}>{userData[item.value]}</span>
                      <hr />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
        <div className="user-activity">
          <h4>활동 내역</h4>
        </div>
        <div className="profile-submit">
          <button onClick={() => navigate(-1)}>뒤로 가기</button>
          <button onClick={onEditProfileClick}>회원정보 수정</button>
        </div>
      </div>
    </>
  );
}
