import { useState } from "react";
import { useDispatch } from "react-redux";
import { openModal } from "../../../reducer/ModalSlice";
import { messagesData } from "../ModalData.js";

import "./ChatInModal.scss";

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
    <div className="container-box">
      <div className="modalTitle">
        <h4>채팅</h4>
        <button className="exit-button" onClick={handleOpenChat}>
          <i className="bi bi-caret-left"></i>
        </button>
      </div>
      <div className="content-box_chat-in">
        <div className="date-box">
          <p>2023년 1월 13일</p>
        </div>
        {message.map((data, idx) => {
          return (
            <div className="chat-in-chat-box" key={idx}>
              {data.userName === "me" ? (
                <div className="row reverse">
                  <p className="text reverse">{data.text}</p>
                  <p className="time reverse">{data.time}</p>
                </div>
              ) : (
                <div className="text-box">
                  <i className="bi bi-person icon"></i>
                  <p className="name">{data.userName}</p>
                  <div className="row">
                    <p className="text">{data.text}</p>
                    <p className="time">{data.time}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="send-box">
        <input />
        <button>전송</button>
      </div>
    </div>
  );
};

export default ChatModal;
