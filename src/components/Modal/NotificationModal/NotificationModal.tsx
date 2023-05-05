import React from "react";
import { useDispatch } from "react-redux";
import { closeModal } from "reducer/ModalSlice";
import { toggleButtons } from "reducer/ToggleSlice";

const NotificationModal = () => {
  const dispatch = useDispatch();

  return (
    <div className="container-box">
      <div className="modalTitle">
        <h4>알림 창</h4>
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
      <div className="content-box"></div>
    </div>
  );
};

export default NotificationModal;
