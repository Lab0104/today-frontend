import { useDispatch } from "react-redux";
import { closeModal } from "reducer/ModalSlice";
import { toggleButtons } from "reducer/ToggleSlice";
import { useState } from "react";

import "./FilterModal.scss";

import DatePicker from "components/Assest/DataPIcker";
import ReactRange from "components/Assest/ReactRange";
import { categories } from "components/CategoryList/CategoryList";

const BtnList = ["모두", "2", "3", "4", "5", "6+"];
const FilterModal = () => {
  const dispatch = useDispatch();
  const [categorySelect, setCategorySelect] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [BtnSelect, setBtnSelect] = useState("모두");

  const handleCategoryClick = (idx: number) => {
    let list = categorySelect;
    list[idx] = !list[idx];
    setCategorySelect([...list]);
  };

  const handleButtonClick = (text: string) => {
    setBtnSelect(text);
  };

  const handleResetClick = () => {
    setCategorySelect([false, false, false, false, false, false, false, false]);
    setBtnSelect("모두");
  };

  const handleDisplayClick = () => {
    dispatch(closeModal());
    dispatch(toggleButtons({ idx: 4 }));
  };

  return (
    <div className="container-box">
      <div className="modalTitle">
        <h4>필터</h4>
        <button
          className="exit-button"
          onClick={() => {
            dispatch(closeModal());
            dispatch(toggleButtons({ idx: 4 }));
          }}
        >
          <i className="bi bi-x-lg"></i>
        </button>
      </div>
      <div className="content-box_filter">
        <div className="content-category">
          <h3>카테고리</h3>
          <div className="category">
            {categories &&
              categories.map((category, idx) => (
                <div
                  key={idx}
                  className={
                    categorySelect[idx]
                      ? "category-item selected"
                      : "category-item"
                  }
                  onClick={() => handleCategoryClick(idx)}
                >
                  <div className="item-icon">{category.icon}</div>
                  <span className="item-name">{category.name}</span>
                </div>
              ))}
          </div>
        </div>
        <div className="content-date">
          <h3>날짜</h3>
          <div className="date">
            <DatePicker
              time="yyyy. M. d"
              placeholder="시작 날짜"
              includeTime
            ></DatePicker>
            <p>~</p>
            <DatePicker
              time="yyyy. M. d"
              placeholder="종료 날짜"
              includeTime
            ></DatePicker>
          </div>
        </div>
        <div>
          <h3>거리</h3>
          <ReactRange></ReactRange>
        </div>
        <div className="number">
          <h3>모임 인원</h3>
          <div className="number-buttons">
            {BtnList.map((data, idx) => {
              return (
                <button
                  key={idx}
                  onClick={() => handleButtonClick(data)}
                  className={BtnSelect === data ? "clicked" : ""}
                >
                  {data}
                </button>
              );
            })}
          </div>
        </div>
        <div className="options">
          <h3>검색 옵션</h3>
          <div className="check-boxs">
            <div>
              <input type="checkbox" name="full" id="full" />
              <label htmlFor="full">가득찬 모임</label>
              <input type="checkbox" name="outdated" id="outdated" />
              <label htmlFor="outdated">마감된 모임</label>
              <input type="checkbox" name="empty" id="empty" />
              <label htmlFor="empty">준비물 없음</label>
            </div>
            <div>
              <input type="checkbox" name="" id="" />
              <label htmlFor="">가득찬 모임</label>
              <input type="checkbox" name="" id="" />
              <label htmlFor="">가득찬 모임</label>
              <input type="checkbox" name="" id="" />
              <label htmlFor="">가득찬 모임</label>
            </div>
          </div>
        </div>
      </div>
      <div className="bottom-box">
        <div>
          <p onClick={handleResetClick}>초기화</p>
          <button onClick={handleDisplayClick}>모임 표시</button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
