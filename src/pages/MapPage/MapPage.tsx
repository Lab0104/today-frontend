import { useEffect, useState, KeyboardEvent, ChangeEvent } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import Map from "./KakaoMapApi";
import { openModal } from "../../reducer/ModalSlice";
import {
  currentLocation,
  moveMap,
  searchMap,
  zoomMap,
} from "../../reducer/KakaoMapSlice";
import { changeData } from "../../reducer/DisplayMeetingSlice";
import { setMeetingCard } from "../../reducer/MeetingCardSlice";
import {
  toggleButtons,
  toggleClose,
  toggleSorts,
} from "../../reducer/ToggleSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";

import "./MapPage.scss";
import { TbCurrentLocation } from "react-icons/tb";
import { closeModal } from "reducer/ModalSlice";
import { setModalContent } from "reducer/MainModalSlice";

const filters = [
  "모두",
  "비어있는 모임방",
  "문화",
  "스터디",
  "사회활동",
  "스포츠",
  "취미",
  "기타",
];
const buttonItems = [
  { type: "ProfileModal", className: "person" },
  { type: "NotificationModal", className: "bell" },
  { type: "ChatModal", className: "chat-text" },
  { type: "AddModal", className: "plus-circle" },
  { type: "LayersModal", className: "funnel" },
];

const sortItems = ["거리순", "조회순", "인기도순", "모임날짜순"];

function MapPage() {
  /** 검색 텍스트(검색 결과 반영) */
  const location = useLocation();
  const searchContext = location.state;
  const [text, setText] = useState(searchContext ? searchContext : "");
  const [toggleIcon, setToggleIcon] = useState(true);
  useEffect(() => {
    dispatch(searchMap({ searchKeyword: text }));
  }, [searchContext]);

  const [vhSize, setVhSize] = useState(window.innerWidth);

  useEffect(() => {
    // 브라우저의 크기가 변할 때마다 vh 크기를 업데이트
    const handleResize = () => setVhSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    // 컴포넌트가 언마운트될 때 리스너 제거
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 토글 배열
  const [toggleLocation, setToggleLocation] = useState(false);
  const [toggleFilter, setToggleFilter] = useState([
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  const dispatch = useAppDispatch();

  /** 검색 결과 */
  const { searchKeyword } = useAppSelector((state) => state.map);

  /** 표시중인 모임들 */
  const { displayMeetings } = useAppSelector((state) => state.display);

  /** 버튼 아이콘 Toggle 설정 -> Modal 창에서 접근 필요 -> RTK */
  const { toggleButton, toggleSort } = useAppSelector((state) => state.toggle);

  /** 입력 값 State로 전달 */
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  /**type 값에 따라서 모달을 염. setMeetingCard를 통해 상세창에 값 전달(address 필요)*/
  const handleOpenModal = (type: string) => {
    dispatch(
      openModal({
        modalType: type,
      })
    );
  };

  // const {
  //   title,
  //   maximum_participants,
  //   registered_participants_count,
  //   address,
  //   deadline,
  //   category,
  // } = list;

  const list: any = {
    meet_id: 1,
    title: "스터디 모임",
    sub_title: "서브 타이틀",
    content: `자바스터디 모집합니다.\n\n같이 백준 문제풀이 진행하면서 기초 문법 및 실습 진행 할 예정입니다.\n\n 스터디룸에 PC가 있기에 따로 개인 노트북 없어도 참가 가능합니다.\n\n따로 궁금하신 내용 있으면 언제든지 채팅주세요.\n\n지각하시는 분들은 사절합니다!`,
    hits_count: 4,
    date_created: "2023-02-21T16:43",
    writer: "문지혜",
    maximum_participants: 2,
    registered_participants_count: 0,
    address: "경기 용인시 기흥구 강남서로 9",
    deadline: "2023-05-29T12:00",
    date: "2023-01-18T15:00",
    category: { "학문/스터디": "프로그래밍 언어 스터디" },
  };

  const openModalOnClick = () => {
    dispatch(openModal({ modalType: "meetingModal" }));
    dispatch(setModalContent({ modalContent: { ...list } }));
  };

  /** 모임창 마우스 오버 시 지도 이동 */
  const handleMouseOver = (title: string) => {
    dispatch(moveMap({ markerTitle: title }));
  };

  /** 검색 수행 - 버튼 클릭  */
  const handleSearch = () => {
    dispatch(searchMap({ searchKeyword: text }));
  };

  /** 지도 줌 인 & 줌 아웃  */
  const handleZoom = (action: "zoomIn" | "zoomOut") => {
    dispatch(zoomMap({ zoomActions: action }));
  };

  /** 현위치  */
  const handleCurrentLocation = () => {
    dispatch(currentLocation());
  };

  /** 검색 수행 - 엔터 입력  */
  const handleOnKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      dispatch(searchMap({ searchKeyword: text }));
    }
  };

  /** 토글 아이콘 - idx번째 토글  */
  const handleToggleIcons = (idx: number) => {
    dispatch(toggleButtons({ idx: idx }));
  };

  /** 토글 버튼 - 모두 버튼 클릭 시 전부 해제 & 다른 버튼 클릭 시 모두 버튼 해제  */
  const handleToggleFilters = (idx: number) => {
    if (idx === 0 && toggleFilter[0] === false) {
      setToggleFilter([true, false, false, false, false, false, false, false]);
    } else if (idx !== 0) {
      const list = [...toggleFilter];
      list[0] = false;
      list[idx] = !list[idx];
      setToggleFilter([...list]);
    }
  };

  /** 토글 정렬  */
  const handleToggleSort = (idx: number) => {
    dispatch(toggleSorts({ idx: idx }));
  };

  /** 정렬  */
  const handleClickSort = (idx: number) => {
    const sortList = [...displayMeetings];
    switch (idx) {
      case 0: // 거리순 -> 거리 계산 알고리즘 필요
        break;

      case 1: // 조회순
        sortList.sort((a, b) => (a.hits > b.hits ? -1 : 1));
        dispatch(changeData({ displayMeetings: [...sortList] }));
        break;

      case 2: //인기도순
        break;

      case 3: //마감날짜순
        break;

      default:
        break;
    }
  };

  return (
    <div className="main">
      <div className="search-tab">
        {/* 검색 창 */}
        <div className="search-box">
          <div className="search-box_wrapper">
            <div className="toggle-icons">
              {toggleIcon ? (
                <i
                  className="bi bi-map"
                  onClick={() => setToggleIcon(!toggleIcon)}
                ></i>
              ) : (
                <i
                  className="bi bi-list-ul"
                  onClick={() => setToggleIcon(!toggleIcon)}
                ></i>
              )}
              {toggleIcon ? <p>지도</p> : <p>목록</p>}
            </div>

            <div className="inputBox">
              <div className="title">
                <i
                  className="bi bi-list navIcon"
                  onClick={() => {
                    handleOpenModal("NavModal");
                  }}
                ></i>
                <div
                  onClick={() => {
                    dispatch(closeModal());
                    dispatch(toggleClose());
                    if (toggleLocation) {
                      handleCurrentLocation();
                      setToggleLocation(!toggleLocation);
                    }
                  }}
                >
                  <Link to="/">LOGO</Link>
                </div>
              </div>
              <input
                onChange={handleChange}
                value={text}
                onKeyDown={handleOnKeyDown}
                placeholder="장소, 모임 검색"
              ></input>
              <button onClick={handleSearch}>
                <i className="bi bi-search"></i>
              </button>
            </div>
          </div>

          <div className="fliter">
            {filters.map((data, idx) => {
              return (
                <button
                  key={idx}
                  className={toggleFilter[idx] ? "selected" : ""}
                  onClick={() => {
                    handleToggleFilters(idx);
                  }}
                >
                  {data}
                </button>
              );
            })}
          </div>
        </div>
        {/* 검색 창 종료 */}

        <div className="search-option">
          <p className="searchResult">
            모임명 <span>{text}</span> 검색결과
          </p>
          <hr />

          {/* 모임 수, 정렬 값 */}
          <div className="smallBox">
            <p className="count">{"모임" + displayMeetings.length + "개"}</p>
            {sortItems.map((data, idx) => {
              return (
                <p key={idx}>
                  <span
                    className={"sort" + (toggleSort[idx] ? " selected" : "")}
                    onClick={() => {
                      handleToggleSort(idx);
                      handleClickSort(idx);
                    }}
                  >
                    {data}
                  </span>
                  {idx === sortItems.length - 1 ? "" : " |"}
                </p>
              );
            })}
          </div>
          <hr />

          {/* 모임 수, 정렬 값 종료 */}
        </div>
        {/* 대쉬 보드 */}
        {toggleIcon || vhSize > 768 ? (
          <div className="dashBoard">
            {/* 검색 결과 창 */}
            {displayMeetings.length !== 0 ? (
              displayMeetings.map((data, idx) => {
                return (
                  <div
                    className="listBox"
                    key={idx}
                    onClick={openModalOnClick}
                    onMouseOver={() => {
                      handleMouseOver(data.title);
                    }}
                  >
                    <h4>{data.title}</h4>
                    <p>{data.sub_title}</p>
                    <p>{data.category}</p>
                    <p>{data.address}</p>
                    <p>조회수 : {data.hits}</p>
                    <hr />
                  </div>
                );
              })
            ) : (
              <>
                <h3>검색어: {searchKeyword}</h3>
                <h4>검색 결과가 존재하지 않습니다.</h4>
              </>
            )}
            {/* 검색 결과 창 종료*/}
          </div>
        ) : (
          <></>
        )}

        {/* 대시보드 종료*/}
      </div>

      {/* 지도 */}
      <div className="mapComponent">
        <Map />
      </div>
      {/* 지도 종료*/}

      {/* 버튼 아이콘 */}
      <div className="icons">
        <div className="modals">
          {buttonItems.map((data, idx) => {
            return (
              <button
                className={toggleButton[idx] ? "selected" : ""}
                key={idx}
                onClick={() => {
                  handleOpenModal(data.type);
                  handleToggleIcons(idx);
                }}
              >
                <i className={"bi bi-" + data.className + "-fill"}></i>
              </button>
            );
          })}
        </div>
        <div
          className="exit"
          onClick={() => {
            dispatch(closeModal());
            dispatch(toggleClose());
            if (toggleLocation) {
              handleCurrentLocation();
              setToggleLocation(!toggleLocation);
            }
          }}
        >
          <Link to="/">
            <button>
              <i className="bi bi-box-arrow-right"></i>
            </button>
          </Link>
        </div>
        {!toggleIcon || vhSize > 768 ? (
          <div className="zoom">
            <button
              className={toggleLocation ? "selected" : ""}
              onClick={() => {
                handleCurrentLocation();
                setToggleLocation(!toggleLocation);
              }}
            >
              <TbCurrentLocation></TbCurrentLocation>
            </button>
            <button
              onClick={() => {
                handleZoom("zoomIn");
              }}
            >
              <i className="bi bi-zoom-in"></i>
            </button>
            <button
              onClick={() => {
                handleZoom("zoomOut");
              }}
            >
              <i className="bi bi-zoom-out"></i>
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
      {/* 버튼 아이콘 종료 */}
    </div>
  );
}

export default MapPage;
