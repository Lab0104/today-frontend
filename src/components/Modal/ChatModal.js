/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { closeModal, openModal } from "../../store/ModalSlice";

const chats = [
  {
    icons: "default",
    title: "자바 스터디",
    current: 4,
    max: 4,
    time: "오후 5:48",
    lastChat: "넵 그때 뵙겠습니다.",
    notification: 1,
  },
  {
    icons: "default",
    title: "한국 문화역사",
    current: 2,
    max: 4,
    time: "오후 4:48",
    lastChat: "안녕하세요~",
    notification: 15,
  },
  {
    icons: "default",
    title: "한국 문화역사",
    current: 2,
    max: 4,
    time: "오후 4:48",
    lastChat: "안녕하세요~",
    notification: 15,
  },
  {
    icons: "default",
    title: "한국 문화역사",
    current: 2,
    max: 4,
    time: "오후 4:48",
    lastChat: "안녕하세요~",
    notification: 15,
  },
  {
    icons: "default",
    title: "한국 문화역사",
    current: 2,
    max: 4,
    time: "오후 4:48",
    lastChat: "안녕하세요~",
    notification: 15,
  },
  {
    icons: "default",
    title: "한국 문화역사",
    current: 2,
    max: 4,
    time: "오후 4:48",
    lastChat: "안녕하세요~",
    notification: 15,
  },
  {
    icons: "default",
    title: "한국 문화역사",
    current: 2,
    max: 4,
    time: "오후 4:48",
    lastChat: "안녕하세요~",
    notification: 15,
  },
];

const ChatModal = () => {
  const dispatch = useDispatch();
  const [chat, setChat] = useState(chats);
  return (
    <div css={container}>
      <div className="modalTitle">
        <h4>채팅</h4>
        <button css={exitButton} onClick={() => dispatch(closeModal())}>
          <i className="bi bi-x-lg"></i>
        </button>
      </div>
      <div className="content" css={content}>
        {chat.map((data, idx) => {
          return (
            <div
              key={idx}
              className="box"
              onClick={() =>
                dispatch(
                  openModal({
                    modalType: "ChatInModal",
                    isOpen: true,
                  })
                )
              }
            >
              <i className="bi bi-person icon"></i>
              <div className="row">
                <p className="title">
                  {data.title}({data.current}/{data.max})
                </p>
                <p className="time">{data.time}</p>
              </div>
              <div className="row">
                <p className="chat">{data.lastChat}</p>
                <p className="notification">{data.notification}</p>
              </div>
            </div>
          );
        })}
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
  height: 100%;
  flex-direction: column;
  background: #eee;
  overflow-y: scroll;
  padding: 5px 5px 0;

  -ms-overflow-style: none; /* 인터넷 익스플로러 */
  scrollbar-width: none; /* 파이어폭스 */

  &::-webkit-scrollbar {
    display: none; /* 크롬, 사파리, 오페라, 엣지 */
  }

  & .icon {
    position: absolute;
    left: 10px;
    font-size: 30px;
    top: 50%;
    transform: translate(0%, -50%);
  }

  & p {
    margin: 4px 0;
  }

  & div.box {
    position: relative;
    background: #fff;
    margin-bottom: 5px;
    padding: 10px;
    border-radius: 10px;
  }

  & div.box:hover {
    background: #eff7ff;
    cursor: pointer;
  }

  & div.row {
    display: flex;
    justify-content: space-between;
    margin-left: 50px;
    align-items: center;
  }
  & .title {
    font-weight: bold;
  }
  & .chat {
    font-size: 14px;
  }
  & .time {
    color: gray;
    font-size: 10px;
  }
  & .notification {
    height: 18px;
    width: 18px;
    font-size: 10px;
    color: #fff;
    background: red;
    border-radius: 9px;
  }
`;

export default ChatModal;
