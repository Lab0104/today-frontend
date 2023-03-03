/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import React from "react";
import { useDispatch } from "react-redux";
import { closeModal } from "../../store/ModalSlice";

const AddModal = () => {
  const dispatch = useDispatch();
  return (
    <div css={container}>
      <div className="modalTitle">
        <h4>모임 추가하기</h4>
        <button css={exitButton} onClick={() => dispatch(closeModal())}>
          <i className="bi bi-x-lg"></i>
        </button>
      </div>
      <div className="content" css={content}>
        <input className="title" placeholder="모임 제목"></input>
        <input
          className="titleAlt"
          placeholder="모임 소 제목(10글자 이내로 입력해 주세요.)"
        ></input>
        <input className="category" placeholder="모임 종류"></input>
        <input
          className="location"
          placeholder="모임 인원 / 위치 / 시간"
        ></input>
        <input className="deadLine" placeholder="모임 신청 마감 기한"></input>
        <input className="description" placeholder="모임 내용"></input>
        <button>개설 하기</button>
      </div>
    </div>
  );
};

const container = css`
  position: absolute;
  width: 25vw;
  height: 75vh;
  right: 102px;
  top: 20px;
  z-index: 10;
  border-radius: 10px;
  display: flex;
  flex-direction: column;

  background: #fff;
`;

const exitButton = css`
  position: absolute;
  height: 22.4px;
  width: 22.4px;
  right: 0;
  top: 0;
  margin: 21.28px;
  background: #fff;
  color: black;
  padding: 0;
  font-size: 16px;
`;

const content = css`
  display: flex;
  height: inherit;
  flex-direction: column;
  justify-content: space-between;
  background: #eeeeee;
  padding: 10px;

  & input {
    border-radius: 15px;
  }

  & .description {
    height: 150px;
  }

  & button {
    height: 35px;
    border-radius: 15px;
  }
`;

export default AddModal;
