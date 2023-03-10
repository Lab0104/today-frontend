/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../store/ModalSlice";
import { ExitButton } from "./CommonStyles";

function InfoModal() {
  const dispatch = useDispatch();
  const handleCloseModal = () => {
    dispatch(closeModal());
  };
  const meetingData = useSelector((state) => state.meetingCard);

  return (
    <div css={container}>
      <div css={content}>
        {/* 제목 & 종료 버튼 시작 */}
        <div css={title}>
          <i className="bi bi-person-fill icon"></i>
          <div className="wrapper">
            <h4>{meetingData.title}</h4>
            <p>{meetingData.subTitle}</p>
          </div>
          <ExitButton onClick={handleCloseModal}>
            <i className="bi bi-x-lg"></i>
          </ExitButton>
        </div>
        {/* 제목 & 종료 버튼 종료*/}

        {/* 세부 내용 시작 */}
        <div css={subContent}>
          <div className="wrapper">
            <p>{meetingData.address}</p>
            <p>
              {meetingData.startDate} ~ {meetingData.endDate}
            </p>
          </div>
          <div className="wrapper">
            <p>
              <span>{meetingData.status ? "모집중" : "모집종료"}</span> |
              {meetingData.closedDate} - 모집마감
            </p>
          </div>
          <p className="tag">준비물 없음 | 초보자 환영 | 모임 시간 준수</p>
          <p className="time">30분 전</p>
        </div>
        <hr></hr>
        <div className="detail" css={detail}>
          <p>{meetingData.content}</p>
        </div>
        {/* 세부 내용 종료 */}
      </div>

      <div css={buttons}>
        <button className="heart">
          <i className="bi bi-heart"></i>
        </button>
        <button className="enter" onClick={handleCloseModal}>
          참가하기
        </button>
        <button className="chat">
          <i className="bi bi-chat-dots"></i>
        </button>
      </div>
    </div>
  );
}

const container = css`
  position: absolute;
  left: 500px;
  top: 20px;
  width: 500px;
  height: 677px;
  z-index: 10;

  background: #eee;
  border-radius: 5px;
  padding: 15px;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.3);
`;

const content = css`
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 5px;
  margin-bottom: 10px;
  height: 92%;
`;

const subContent = css`
  position: relative;
  text-align: left;
  margin: 0 25.5px;
  & .wrapper {
    display: flex;
    gap: 10px;
  }
  & span {
    color: #227b3d;
  }
  & p {
    margin: 8px 0;
  }
  & p.time {
    position: absolute;
    width: auto;
    left: 90%;
    top: 90%;
    margin: 0;
    font-size: 12.8px;
    white-space: nowrap;
  }
`;
const title = css`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0;

  & .icon {
    position: absolute;
    display: flex;
    font-size: 40px;
    height: 40px;
    left: 20px;
    padding: 0;
    color: #aaa;
  }
  & h4 {
    margin: 5px 0;
  }

  & p {
    margin: 5px 0;
    font-size: 14px;
  }

  & .wrapper {
    display: flex;
    flex-direction: column;
  }
`;

const detail = css`
  padding: 10px;
  line-height: 30px;
  overflow-y: scroll;

  -ms-overflow-style: none; /* 인터넷 익스플로러 */
  scrollbar-width: none; /* 파이어폭스 */

  &::-webkit-scrollbar {
    display: none; /* 크롬, 사파리, 오페라, 엣지 */
  }
`;

const buttons = css`
  display: flex;
  height: 48px;
  gap: 5px;
  font-size: 18px;

  & .heart {
    flex-grow: 1;
    font-size: inherit;
  }
  & .enter {
    flex-grow: 7;
    font-size: inherit;
  }
  & .chat {
    flex-grow: 1;
    font-size: inherit;
  }
`;
export default InfoModal;
