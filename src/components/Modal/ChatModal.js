/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { closeModal, openModal } from "../../store/ModalSlice";
import { Container, Content, ExitButton, Icon } from "./CommonStyles";
import { chatsData } from "./ModalData";

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
    <Container>
      <div className="modalTitle">
        <h4>채팅</h4>
        <ExitButton onClick={() => dispatch(closeModal())}>
          <i className="bi bi-x-lg"></i>
        </ExitButton>
      </div>
      <Content>
        {chat.map((data, idx) => {
          return (
            <ChatBox key={idx} onClick={handleOpenChat}>
              <Icon className="bi bi-person"></Icon>
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
      </Content>
    </Container>
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
