/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useState } from "react";

import { useDispatch } from "react-redux";
import { openModal } from "../../store/ModalSlice";
import { Container, Content, ExitButton, Icon } from "./CommonStyles";
import { messagesData } from "./ModalData";

const ChatModal = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState(messagesData);

  const handleOpenChat = () =>
    dispatch(
      openModal({
        modalType: "ChatModal",
        isOpen: true,
      })
    );

  return (
    <Container>
      <div className="modalTitle">
        <h4>채팅</h4>
        <ExitButton onClick={handleOpenChat}>
          <i className="bi bi-caret-left"></i>
        </ExitButton>
      </div>
      <Content>
        <div>2023년 1월 13일</div>
        {message.map((data, idx) => {
          return (
            <ChatBox key={idx}>
              {data.userName === "me" ? (
                <div className="row reverse">
                  <p className="text reverse">{data.text}</p>
                  <p className="time reverse">{data.time}</p>
                </div>
              ) : (
                <div className="chatBox">
                  <Icon className="bi bi-person"></Icon>
                  <p className="name">{data.userName}</p>
                  <div className="row">
                    <p className="text">{data.text}</p>
                    <p className="time">{data.time}</p>
                  </div>
                </div>
              )}
            </ChatBox>
          );
        })}
      </Content>
      <InputBox>
        <input />
        <button>전송</button>
      </InputBox>
    </Container>
  );
};

const ChatBox = styled.div`
  position: relative;
  margin-bottom: 5px;
  padding: 5px;
  text-align: left;

  & p {
    margin: 0;
  }

  & .chatBox {
    margin-left: 50px;
  }

  & .row {
    display: flex;
    align-items: Flex-end;
  }

  & .row.reverse {
    flex-direction: row-reverse;
  }

  & .time {
    color: gray;
    font-size: 12px;
    padding-left: 20px;
    white-space: nowrap;
  }
  & .time.reverse {
    padding-left: 0;
    padding-right: 20px;
  }

  & .text {
    background: #fff;
    padding: 10px 15px;
    border-radius: 10px;
  }

  & .text.reverse {
    background: #8788dd;
  }
`;

const InputBox = styled.div`
  display: flex;
  position: relative;
  align-items: center;

  & input {
    width: 100%;
    height: 65px;
  }
  & button {
    position: absolute;
    right: 10px;
    padding: 10px;
  }
`;

export default ChatModal;
