/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useState } from "react";

import { useDispatch } from "react-redux";
import { addData } from "../../reducer/DisplayMeetingSlice";
import { closeModal } from "../../reducer/ModalSlice.ts";
import { toggleButtons } from "../../reducer/ToggleSlice";
import { Container, ExitButton, Content } from "./CommonStyles";

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

  const handlerChange = (e) => {
    const { value, className } = e.target;
    setInputData({ ...inputData, [className]: value });
  };

  const inputList = [
    { className: "title", placeholder: "모임 제목" },
    { className: "subTitle", placeholder: "모임 소제목" },
    { className: "category", placeholder: "모임 종류" },
    { className: "address", placeholder: "모임 주소" },
    { className: "deadLine", placeholder: "모임 신청 마감 기한" },
    { className: "content", placeholder: "모임 내용" },
  ];

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
        {inputList.map((data, idx) => {
          return (
            <input
              key={idx}
              className={data.className}
              placeholder={data.placeholder}
              onChange={handlerChange}
            ></input>
          );
        })}
        <button
          onClick={() => {
            dispatch(closeModal());
            dispatch(addData({ data: inputData }));
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
  gap: 10px;
  padding-bottom: 10px;
  position: relative;
  height: 100%;
  justify-content: space-between;

  & input {
    height: 50px;
    border-radius: 15px;
  }

  & .content {
    height: 300px;
  }

  & button {
    height: 50px;
    border-radius: 10px;
  }
`;

export default AddModal;
