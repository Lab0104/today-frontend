/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useState } from "react";

import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
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
} from "react-icons/bs";
import DatePicker from "components/DropDown/DataPIcker";
import { categories } from "components/CategoryList/CategoryList";

const AddModal = () => {
  const dispatch = useDispatch();
  // const [inputData, setInputData] = useState({
  //   postId: "",
  //   title: "",
  //   subTitle: "",
  //   category: "",
  //   currentMember: "",
  //   recruitments: "",
  //   address: "",
  //   date: "",
  //   deadLine: "",
  //   content: "",
  //   user: "",
  //   boardHits: 0,
  //   position: "",
  // });

  const [address, setAddress] = useState("주소");

  const [view, setView] = useState(false);

  // const handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { value, className } = e.target;
  //   setInputData({ ...inputData, [className]: value });
  // };

  const Dropdown = (): JSX.Element => {
    return (
      <div css={dropbox}>
        <ul>
          {categories.map((data) => {
            return (
              <div className="wrapper">
                <li className="data-name">{data.name}</li>
                <div className="data-list">
                  {data.list.map((list) => {
                    return <li>{list}</li>;
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
    left: 70px;
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
      cursor: pointer;
      background-color: #eee;
    }
    .wrapper {
      position: relative;
    }

    .data-list {
      position: absolute;
      background-color: #fff;
      border: 1px solid black;

      top: 0;
      left: 100%;
      display: none;
      width: 200px;
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
          <div className="input-category">
            <div className="category large">
              <p>모임 카테고리</p>
              <BsChevronDown
                className="drop-down"
                onClick={() => {
                  setView(!view);
                }}
              />
              {view && <Dropdown></Dropdown>}
            </div>
            <div className="category sub">
              <p>모임 카테고리</p>
              <BsChevronDown className="drop-down" />
            </div>
          </div>
          <div className="input-info">
            <div className="people info-box">
              <BsPeopleFill />
              <input placeholder="인원 수" type="number"></input>
            </div>
            <div className="date info-box">
              <BsCalendar2 />
              <DatePicker />
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
              <DatePicker />
            </div>
          </div>
          <div className="input-content">
            <textarea placeholder="모임 내용"></textarea>
            <div className="tag">
              <p>#태그</p>
              <p>#태그</p>
              <p>#태그</p>
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

  & .input-category {
    display: flex;
    gap: 10px;
  }

  & .input-category input::placeholder,
  .input-title input::placeholder {
    color: #000;
    font-weight: 500;
  }
  & .input-category .category {
    position: relative;
    background-color: #fff;
    width: 50%;
    border-radius: 5px;
    padding: 0 30px;
  }
  & .input-category .category p {
    color: #000;
  }
  & .input-category .drop-down {
    position: absolute;

    width: 16px;
    height: 16px;
    right: 16px;
    top: 0;
    bottom: 0;
    margin: auto;
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

  & .input-content .tag p {
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

/* 
# 카테고리

1. 학문/스터디
    - 프로그래밍 언어 스터디
    - 영어 회화 스터디
    - 디자인 스터디
    - 수학 스터디
    - 과학 실험 스터디
2. 비즈니스
    - 창업 컨설팅 그룹
    - 경영 전략 모임
    - 마케팅 교육 모임
    - 취업 멘토링 그룹
    - 글로벌 비즈니스 네트워크 그룹
3. 예술/문화
    - 문학 작품 독서 그룹
    - 미술 전시 관람 그룹
    - 콘서트, 연극 관람 모임
    - 필름, 영화 관람 그룹
    - 문화유산 탐방 모임
4. 스포츠/게임
    - 축구 클럽
    - 테니스 동호회
    - 보드 게임 그룹
    - 카드 게임 모임
    - 게임 개발 동아리
5. 사회활동/자선
    - 장애인 돕기 봉사 모임
    - 동물보호 활동 그룹
    - 청소년 지원 봉사 모임
    - 글로벌 기아 해결 운동
    - 지역 사회 문제 해결 그룹
6. 요리/음식
    - 베이킹 동호회
    - 쿠킹 클래스 그룹
    - 다양한 음식 맛보기 모임
    - 정기적인 레스토랑 방문 그룹
    - 지역 푸드 투어 그룹
7. 여행/문화 탐방
    - 해외 여행 그룹
    - 국내 여행 그룹
    - 여행사 투어 그룹
    - 유적지 탐방 모임
    - 문화 축제 탐방 그룹
8. 수공예
    - 뜨개질 동호회
    - 도예 작업실 그룹
    - 목공 예술 동아리
    - 수채화, 디자인 스케치 모임
    - 섬유 미술 작업실 그룹
*/
