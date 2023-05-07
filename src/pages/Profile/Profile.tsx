import React, { useState, useRef } from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import NavigationBar from "components/NavigationBar/NavigationBar";
import { IoMdSettings } from "react-icons/io";
import { CiEdit } from "react-icons/ci";

import { useSelector } from "react-redux";
import { TypeUser } from "userTypes";
import { Event } from "eventType";
import "./Profile.scss";

const profiles = [
  { label: "닉네임", value: "아름다운 스시초밥" },
  { label: "이메일", value: "example@gmail.com" },
  { label: "주소", value: "경기도 용인시 기흥구 강남서로 20" },
  { label: "상세주소", value: "이공관 505호" },
];

const ProfileImage = styled.div<{ imgUrl: any }>`
  position: relative;
  width: 170px;
  height: 170px;
  border-radius: 50%;
  background-color: #eee;
  background-image: url(${({ imgUrl }) => imgUrl});
  background-repeat: no-repeat;
  background-size: cover;
`;

export default function Profile() {
  const { user_id: userId } = useSelector(
    (state: { user: TypeUser }) => state.user
  );
  const navigate = useNavigate();
  const fileInput = useRef<HTMLInputElement>(null);
  const [imgProfile, setImgProfile] = useState<any>();

  const onEditProfileClick = () => navigate("/profile/check_password");
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
          setImgProfile(reader.result);
        }
      };
    }
  };

  return (
    <>
      <NavigationBar />
      <div className="profile-container">
        <h3>프로필 정보</h3>
        <hr />
        <h4>프로필</h4>
        <div className="profile-header">
          <input
            type="file"
            style={{ display: "none" }}
            accept="image/*"
            onChange={profileImageChange}
            ref={fileInput}
          />
          <ProfileImage imgUrl={imgProfile}>
            <div className="image-icon">
              <IoMdSettings
                onClick={() => fileInput.current && fileInput.current.click()}
              />
            </div>
          </ProfileImage>
          <div className="profile-content">
            <span>아름다운 스시초밥</span>
            <span>tasda@gmail.com</span>
          </div>
        </div>
        <div className="info-header">
          <h4>유저 정보</h4>
          <CiEdit onClick={onEditProfileClick} />
        </div>
        <div className="profile-info">
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
                  <span key={idx}>{item.value}</span>
                  <hr />
                </div>
              ))}
          </div>
        </div>
        <div className="profile-submit">
          <button onClick={() => navigate(-1)}>뒤로 가기</button>
          <button onClick={onEditProfileClick}>회원정보 수정</button>
        </div>
      </div>
    </>
  );
}
