import { useState } from "react";
import { useDispatch } from "react-redux";
import { closeModal } from "../../../reducer/ModalSlice";
import { toggleButtons } from "../../../reducer/ToggleSlice";

import { useDaumPostcodePopup } from "react-daum-postcode";
import "./AddModal.scss";

import {
  BsAlarm,
  BsMap,
  BsCalendar2,
  BsPeopleFill,
  BsChevronDown,
  BsChevronUp,
} from "react-icons/bs";
import DatePicker from "components/Assest/DataPIcker";

import { categories } from "components/CategoryList/CategoryList";

const AddModal = () => {
  const dispatch = useDispatch();

  const [address, setAddress] = useState("주소");
  const [category, setCategory] = useState(["모임 카테고리", ">", ""]);
  const [view, setView] = useState(false);

  const Dropdown = (): JSX.Element => {
    return (
      <div className="drop-box">
        <ul>
          {categories.map((data, idx1) => {
            return (
              <div className="wrapper" key={"box" + idx1}>
                <li className="data-name" key={"name" + idx1}>
                  {data.name}
                </li>
                <div className="data-list" key={"list" + idx1}>
                  {data.list.map((list, idx2) => {
                    return (
                      <li
                        key={idx2}
                        onClick={() => {
                          setCategory([data.name, " > ", list]);
                        }}
                      >
                        {list}
                      </li>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </ul>
      </div>
    );
  };

  const open = useDaumPostcodePopup();
  const POPUPWIDTH = 500;
  const POPUPHEIGHT = 400;

  const handleComplete = (data: {
    sigungu: string;
    address: string;
    addressType: string;
    bname?: string | undefined;
    buildingName?: string | undefined;
  }) => {
    // 향후 매칭에 활용 될 시군 데이터
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    setAddress(fullAddress);
  };

  const onAddressClick = () => {
    open({
      onComplete: handleComplete,
      width: POPUPWIDTH,
      height: POPUPHEIGHT,
      left: document.body.offsetWidth / 2 - POPUPWIDTH / 2,
      top: window.screen.height / 2 - POPUPHEIGHT / 2,
    });
  };

  return (
    <div className="container-box">
      <div className="modalTitle">
        <h4>모임 추가하기</h4>
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
      <div className="content-box">
        <div className="input-box">
          <div className="input-title">
            <input placeholder="모임 제목"></input>
          </div>
          <div
            className="category"
            onClick={() => {
              setView(!view);
            }}
          >
            <p>{category[2] === "" ? category[0] : category}</p>
            {view ? (
              <div className="drop-down">
                <BsChevronUp />
              </div>
            ) : (
              <div className="drop-down">
                <BsChevronDown />
              </div>
            )}
            {view && <Dropdown></Dropdown>}
          </div>
          <div className="input-info">
            <div className="people info-box">
              <BsPeopleFill />
              <input placeholder="인원 수" type="number" min="2"></input>
            </div>
            <div className="date info-box">
              <div>
                <BsCalendar2 />
              </div>
              <DatePicker text="모임 시작시간" />
              <p>~</p>
              <DatePicker text="모임 종료시간" />
            </div>
            <div className="place info-box">
              <BsMap />
              <input
                type="text"
                placeholder={address}
                readOnly
                onClick={onAddressClick}
              />
              {/* <input type="text" placeholder="상세주소" /> */}
            </div>
            <div className="deadline info-box">
              <BsAlarm />
              <DatePicker text="모집 마감 날짜" />
            </div>
          </div>
          <div className="input-content">
            <textarea placeholder="모임 내용"></textarea>
            <div className="tag">
              <input placeholder="#태그" />
              <input placeholder="#태그" />
              <input placeholder="#태그" />
              <input placeholder="#태그" />
            </div>
          </div>
        </div>
        <button
          className="add"
          onClick={() => {
            dispatch(closeModal());
            dispatch(toggleButtons({ idx: 2 }));
          }}
        >
          개설 하기
        </button>
      </div>
    </div>
  );
};

export default AddModal;
