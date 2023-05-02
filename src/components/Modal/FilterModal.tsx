import React from "react";
import { useDispatch } from "react-redux";
import { closeModal } from "reducer/ModalSlice";
import { toggleButtons } from "reducer/ToggleSlice";

import "./FilterModal.scss";

const FilterModal = () => {
  const dispatch = useDispatch();

  return (
    <div className="container-box">
      <div className="modalTitle">
        <h4>모임 추가하기</h4>
        <button
          className="exit-button"
          onClick={() => {
            dispatch(closeModal());
            dispatch(toggleButtons({ idx: 3 }));
          }}
        >
          <i className="bi bi-x-lg"></i>
        </button>
      </div>
      <div className="content-box">
        <div>
          <p>카테고리</p>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
