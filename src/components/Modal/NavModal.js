/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { useDispatch } from "react-redux";
import { closeModal } from "../../reducer/ModalSlice.ts";
import { ExitButton } from "./CommonStyles";

function NavModal() {
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeModal());
  };
  return (
    <div css={container}>
      <div css={tab}>
        <div className="wrapper">
          <h4>오늘 하루</h4>
          <ExitButton onClick={handleClose}>
            <i className="bi bi-x-lg"></i>
          </ExitButton>
        </div>
        <div className="row">
          <i className="bi bi-megaphone"></i>
          <p>공지사항</p>
        </div>
        <div className="row">
          <i className="bi bi-gift"></i>
          <p>이벤트</p>
        </div>
        <div className="row">
          <i className="bi bi-person"></i>
          <p>프로필</p>
        </div>
        <div className="row">
          <i className="bi bi-chat-dots"></i>
          <p>채팅</p>
        </div>
        <p>신규 모임 등록</p>
        <p>고객센터</p>
        <p>설정</p>
        <hr />
        <span>광고 등록하기</span>
        <span>사업 제안</span>
      </div>
      <div css={overlay} onClick={handleClose}></div>
    </div>
  );
}
const container = css`
  position: absolute;
  display: flex;
  width: 100%;
  height: 100%;
`;

const tab = css`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 300px;
  z-index: 11;
  background: #fff;
  padding: 20px;
  text-align: left;

  & h4 {
    font-size: 32px;
    margin: 8px 0;
  }

  & .wrapper {
    display: flex;
    position: relative;
  }

  & .row {
    display: flex;
    align-items: center;
  }

  & p {
    padding: 10px 0;
    margin: 0;
  }
  & p:hover {
    cursor: pointer;
    text-decoration: underline;
  }

  & .row p {
    padding-left: 20px;
  }

  & hr {
    border: 1px solid #efefef;
  }

  & span {
    color: #979797;
    margin: 10px 0;
  }

  & span:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

const overlay = css`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background-color: #000;
  opacity: 0.54;
  z-index: 10;
`;
export default NavModal;
