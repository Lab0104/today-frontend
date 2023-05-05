import { useState } from "react";
import { useDispatch } from "react-redux";
import { closeModal, openModal } from "../../../reducer/ModalSlice";
import { toggleButtons } from "../../../reducer/ToggleSlice";
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
            dispatch(toggleButtons({ idx: 2 }));
          }}
        >
          <i className="bi bi-x-lg"></i>
        </button>
      </div>
      <div className="content-box_chat">
        {chat.map((data, idx) => {
          return (
            <div className="chat-box" key={idx} onClick={handleOpenChat}>
              <i className="bi bi-person icon"></i>
              <div className="row">
                <p className="title">
                  {data.title}({data.current}/{data.max})
                </p>
                <p className="time">{data.time}</p>
              </div>
              <div className="row">
                <p className="chat">{data.lastChat}</p>
                <div className="notification">{data.notification}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChatModal;
