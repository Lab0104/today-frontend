/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useState } from "react";

import { useDispatch } from "react-redux";
import { addData } from "../../reducer/DisplayMeetingSlice";
import { closeModal } from "../../reducer/ModalSlice";
import { toggleButtons } from "../../reducer/ToggleSlice";
import { Container, ExitButton, Content } from "./CommonStyles";

import {
  BsAlarm,
  BsMap,
  BsCalendar2,
  BsPeopleFill,
  BsChevronDown,
} from "react-icons/bs";

const AddModal = () => {
  const dispatch = useDispatch();
  const [inputData, setInputData] = useState({
    postId: "",
    title: "",
    subTitle: "",
    category: "",
    currentMember: "",
    recruitments: "",
    address: "",
    date: "",
    deadLine: "",
    content: "",
    user: "",
    boardHits: 0,
    position: "",
  });

  const handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, className } = e.target;
    setInputData({ ...inputData, [className]: value });
  };

  return (
    <Container>
      <div className="modalTitle">
        <h4>모임 추가하기</h4>
        <ExitButton
          onClick={() => {
            dispatch(closeModal());
            dispatch(toggleButtons({ idx: 2 }));
          }}
        >
          <i className="bi bi-x-lg"></i>
        </ExitButton>
      </div>
      <Content css={ContentBox}>
        <div className="input-box">
          <div className="input-title">
            <input placeholder="모임 제목"></input>
          </div>
          <div className="input-category">
            <div className="category large">
              <p>모임 카테고리</p>
              <BsChevronDown className="drop-down" />
            </div>
            <div className="category sub">
              <p>모임 카테고리</p>
              <BsChevronDown className="drop-down" />
            </div>
          </div>
          <div className="input-info">
            <div className="wrapper">
              <div className="people info-box">
                <BsPeopleFill />
                <p>인원 수</p>
              </div>
              <div className="date info-box">
                <BsCalendar2 />
                <p>날짜</p>
              </div>
            </div>
            <div className="place info-box">
              <BsMap />
              <p>장소</p>
            </div>
            <div className="deadline info-box">
              <BsAlarm />
              <p>모집 마감</p>
            </div>
          </div>
          <div className="input-content">
            <textarea placeholder="모임 내용"></textarea>
            <div className="tag">
              <p>#태그</p>
              <p>#태그</p>
              <p>#태그</p>
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            dispatch(closeModal());
            // dispatch(addData({ data: inputData }));
            dispatch(toggleButtons({ idx: 2 }));
          }}
        >
          개설 하기
        </button>
      </Content>
    </Container>
  );
};

const ContentBox = css`
  position: relative;
  height: 100%;
  justify-content: space-between;
  color: #979797;
  font-family: "Noto Sans KR";
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;

  & .input-box {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  & input {
    width: 100%;
    height: 48px;
    padding: 0 30px;
    font-family: "Noto Sans KR";
    font-size: 16px;
    line-height: 16px;
  }

  & .input-category {
    display: flex;
    gap: 10px;
  }

  & .input-category input::placeholder,
  .input-title input::placeholder {
    color: #000;
    font-weight: 500;
  }
  & .input-category .category {
    position: relative;
    background-color: #fff;
    width: 50%;
    border-radius: 5px;
    padding: 0 30px;
  }
  & .input-category .category p {
    color: #000;
  }
  & .input-category .drop-down {
    position: absolute;

    width: 16px;
    height: 16px;
    right: 16px;
    top: 0;
    bottom: 0;
    margin: auto;
  }

  & .input-info {
    background-color: #fff;
    padding: 10px 30px;
    border-radius: 5px 5px 0px 0px;
    border-bottom: 1px solid #979797;
  }

  & .input-info .wrapper {
    display: flex;
    gap: 40px;
  }

  & .input-info .info-box {
    display: flex;
    gap: 8px;
    text-align: center;
    align-items: center;
    height: 38px;
  }

  & .input-info .info-box p {
    font-size: 14px;
    line-height: 16px;
  }

  & .input-content {
    height: 300px;
    box-sizing: border-box;
    background-color: #fff;
    padding: 30px;
    padding-bottom: 16px;
    border-radius: 0px 0px 5px 5px;
  }

  & .input-content textarea {
    font-family: Noto Sans KR;
    font-size: 16px;
    font-weight: 500;
    line-height: 16px;
    resize: none;
    width: 360px;
    height: 200px;
    border: none;
  }

  & .input-content .tag {
    display: flex;
    height: 36px;
    gap: 10px;
  }

  & .input-content .tag p {
    height: 36px;
    font-size: 14px;
    background: #eee;
    border-radius: 10px;
    padding: 10px;
    box-sizing: border-box;
  }

  & button {
    box-sizing: border-box;
    padding: 16px 30px;
    gap: 10px;

    width: 420px;
    height: 52px;

    background: #9747ff;

    border: 1px solid #979797;
    border-radius: 5px;
  }
`;

export default AddModal;
