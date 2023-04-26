/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";

import { useDispatch } from "react-redux";
import { closeModal } from "../../reducer/ModalSlice";
import { toggleButtons } from "../../reducer/ToggleSlice";
import { Container, ExitButton, Content } from "./CommonStyles";
import { useDaumPostcodePopup } from "react-daum-postcode";

import {
  BsAlarm,
  BsMap,
  BsCalendar2,
  BsPeopleFill,
  BsChevronDown,
  BsChevronUp,
} from "react-icons/bs";
import DatePicker from "components/DropDown/DataPIcker";

import { categories } from "components/CategoryList/CategoryList";

const AddModal = () => {
  const dispatch = useDispatch();

  const [address, setAddress] = useState("주소");
  const [category, setCategory] = useState(["모임 카테고리", ">", ""]);

  const [view, setView] = useState(false);

  // const handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { value, className } = e.target;
  //   setInputData({ ...inputData, [className]: value });
  // };

  const tagHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.value);
    // if (e.target.value[0] !== "#") e.target.value = "#" + e.target.value;
  };

  const Dropdown = (): JSX.Element => {
    return (
      <div css={dropbox}>
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

  const dropbox = css`
    position: absolute;
    left: 30px;
    top: 48px;
    background-color: #fff;
    width: 150px;
    height: fit-content;
    z-index: 11;
    border: 1px solid black;

    ul {
      list-style: none;
      padding: 0;
    }
    li {
      padding: 10px;
    }
    li:hover {
      background-color: #eee;
      cursor: pointer;
    }
    .wrapper {
      position: relative;
    }
    .wrapper:hover .data-name {
      background-color: #eee;
    }
    .data-list {
      position: absolute;
      background-color: #fff;
      border: 1px solid black;

      top: 0;
      left: 100%;
      display: none;
      width: 250px;
      padding: 10px 0;
    }

    .wrapper:hover .data-list {
      display: block;
    }
  `;

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
    <Container>
      <div className="modalTitle">
        <h4>모임 추가하기</h4>
        <ExitButton
          onClick={() => {
            dispatch(closeModal());
            dispatch(toggleButtons({ idx: 2 }));
          }}
        >
          <i className="bi bi-x-lg"></i>
        </ExitButton>
      </div>
      <Content css={ContentBox}>
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
              <BsChevronUp className="drop-down" />
            ) : (
              <BsChevronDown className="drop-down" />
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
              <input placeholder="#태그" maxLength={4} onChange={tagHandle} />
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
            // dispatch(addData({ data: inputData }));
            dispatch(toggleButtons({ idx: 2 }));
          }}
        >
          개설 하기
        </button>
      </Content>
    </Container>
  );
};

const ContentBox = css`
  position: relative;
  height: 100%;
  justify-content: space-between;
  color: #979797;
  font-family: "Noto Sans KR";
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;

  & .input-box {
    display: flex;
    flex-direction: column;
    gap: 8px;
    font-size: 16px;
  }
  & input {
    width: 100%;
    padding: 0 30px;
    font-family: "Noto Sans KR";
    font-size: 16px;
    line-height: 16px;
  }

  & .input-title input::placeholder {
    color: #000;
    font-weight: 500;
  }
  & .category {
    position: relative;
    background-color: #fff;
    border-radius: 5px;
    padding: 0 30px;
    cursor: pointer;
  }

  & .category .drop-down {
    position: absolute;

    width: 16px;
    height: 16px;
    right: 16px;
    top: 0;
    bottom: 0;
    margin: auto;
  }
  & .date p {
    padding-right: 10px;
  }

  & .input-info {
    background-color: #fff;
    padding: 10px 30px;
    border-radius: 5px 5px 0px 0px;
    border-bottom: 1px solid #979797;
  }

  & .input-info .wrapper {
    display: flex;
    gap: 40px;
  }

  & .input-info .info-box {
    display: flex;
    gap: 8px;
    text-align: center;
    align-items: center;
    height: 38px;
  }

  & .input-info .info-box p {
    font-size: 14px;
    line-height: 16px;
  }

  & .input-info input {
    border: none;
    height: 32px;
    font-size: 14px;
    padding: 0;
    color: #979797;
  }

  & .input-content {
    height: 250px;
    box-sizing: border-box;
    background-color: #fff;
    padding: 30px;
    padding-bottom: 16px;
    border-radius: 0px 0px 5px 5px;
  }

  & .input-content textarea {
    font-family: Noto Sans KR;
    font-size: 16px;
    font-weight: 500;
    line-height: 16px;
    resize: none;
    width: 360px;
    height: 150px;
    border: none;
  }

  & .input-content .tag {
    display: flex;
    height: 36px;
    gap: 10px;
  }

  & .input-content .tag input {
    height: 36px;
    font-size: 14px;
    background: #eee;
    border-radius: 10px;
    padding: 10px;
    box-sizing: border-box;
  }

  & button.add {
    box-sizing: border-box;
    padding: 16px 30px;
    gap: 10px;

    width: 420px;
    height: 52px;

    background: #9747ff;

    border: 1px solid #979797;
    border-radius: 5px;
  }
`;

export default AddModal;
