/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { closeModal, openModal } from "../../../reducer/ModalSlice";
import { toggleButtons } from "../../../reducer/ToggleSlice";
import { Container, Content, ExitButton, Icon } from "../CommonStyles.js";
import { chatsData } from "../ModalData.js";

import "./ChatModal.scss";

const ChatModal = () => {
  const dispatch = useDispatch();
  const [chat, setChat] = useState(chatsData);

  const handleOpenChat = () =>
    dispatch(
      openModal({
        modalType: "ChatInModal",
        isOpen: true,
      })
    );

  return (
    <div className="container-box">
      <div className="modalTitle">
        <h4>채팅</h4>
        <button
          className="exit-button"
          onClick={() => {
            dispatch(closeModal());
            dispatch(toggleButtons({ idx: 1 }));
          }}
        >
          <i className="bi bi-x-lg"></i>
        </button>
      </div>
      <div className="content-box">
        {chat.map((data, idx) => {
          return (
            <ChatBox key={idx} onClick={handleOpenChat}>
              <i className="bi bi-person icon"></i>
              <div className="row">
                <p className="title">
                  {data.title}({data.current}/{data.max})
                </p>
                <p className="time">{data.time}</p>
              </div>
              <div className="row">
                <p className="chat">{data.lastChat}</p>
                <Notification>{data.notification}</Notification>
              </div>
            </ChatBox>
          );
        })}
      </div>
    </div>
  );
};

const ChatBox = styled.div`
  position: relative;
  background: #fff;
  margin-bottom: 10px;
  padding: 15px;
  border-radius: 10px;

  :hover {
    background: #eff7ff;
    cursor: pointer;
  }

  & p {
    margin: 5px 0;
  }
  & .row {
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
    font-size: 12px;
  }
`;

const Notification = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #ff2c2c;
  color: #fff;
  font-size: 14px;
`;

export default ChatModal;
