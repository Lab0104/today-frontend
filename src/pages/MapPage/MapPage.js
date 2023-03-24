/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { css } from "@emotion/react";
import "./MapPage.css";
import Map from "../../components/KakaoMapApi/KakaoMapApi";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../store/ModalSlice";
import AdMeetingCard from "../../components/MeetingCard/AdMeetingCard";
import {
  currentLocation,
  moveMap,
  searchMap,
  selectMap,
  zoomMap,
} from "../../store/KakaoMapSlice";
import {
  changeData,
  selectDisplayMeeting,
} from "../../store/DisplayMeetingSlice";
import { setMeetingCard } from "../../store/MeetingCardSlice";
import { meetingData } from "../../components/MeetingCard/meetingList";
import {
  selectToggle,
  toggleButtons,
  toggleSorts,
} from "../../store/ToggleSlice";

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
  { type: "ChatModal", className: "chat-dots" },
  { type: "AddModal", className: "plus-circle" },
  { type: "LayersModal", className: "layers" },
];

const sortItems = ["거리순", "조회순", "인기도순", "모임날짜순"];

const title = css`
  color: #fff;
  font-size: 20px;
  font-weight: 700;
`;

function MapPage() {
  /** 검색 텍스트(검색 결과 반영) */
  const location = useLocation();
  const searchContext = location.state;
  const [text, setText] = useState(searchContext ? searchContext : "");

  useEffect(() => {
    dispatch(searchMap({ searchKeyword: text }));
  }, [searchContext]);

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

  const dispatch = useDispatch();

  /** 검색 결과 */
  const { searchKeyword } = useSelector(selectMap);

  /** 표시중인 모임들 */
  const { displayMeetings } = useSelector(selectDisplayMeeting);

  /** 버튼 아이콘 Toggle 설정 -> Modal 창에서 접근 필요 -> RTK */
  const { toggleButton, toggleSort } = useSelector(selectToggle);

  /** 입력 값 State로 전달 */
  const handleChange = (e) => {
    setText(e.target.value);
  };

  /**type 값에 따라서 모달을 염. setMeetingCard를 통해 상세창에 값 전달(address 필요)*/
  const handleOpenModal = (
    type,
    address,
    subTitle,
    title,
    category,
    content
  ) => {
    dispatch(
      openModal({
        modalType: type,
        isOpen: true,
      })
    );

    if (address) {
      dispatch(
        setMeetingCard({
          title: title,
          subTitle: subTitle,
          address: address,
          category: category,
          content: content,
        })
      );
    }
  };

  /** 모임창 마우스 오버 시 지도 이동 */
  const handleMouseOver = (title) => {
    dispatch(moveMap({ markerTitle: title }));
  };

  /** 검색 수행 - 버튼 클릭  */
  const handleSearch = () => {
    dispatch(searchMap({ searchKeyword: text }));
  };

  /** 지도 줌 인 & 줌 아웃  */
  const handleZoom = (action) => {
    dispatch(zoomMap({ zoomActions: action }));
  };

  /** 현위치  */
  const handleCurrentLocation = () => {
    dispatch(currentLocation());
  };

  /** 검색 수행 - 엔터 입력  */
  const handleOnKeyDown = (e) => {
    if (e.key === "Enter") {
      dispatch(searchMap({ searchKeyword: text }));
    }
  };

  /** 토글 아이콘 - idx번째 토글  */
  const handleToggleIcons = (idx) => {
    dispatch(toggleButtons({ idx: idx }));
  };

  /** 토글 버튼 - 모두 버튼 클릭 시 전부 해제 & 다른 버튼 클릭 시 모두 버튼 해제  */
  const handleToggleFilters = (idx) => {
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
  const handleToggleSort = (idx) => {
    dispatch(toggleSorts({ idx: idx }));
  };

  /** 정렬  */
  const handleClickSort = (idx) => {
    const sortList = [...displayMeetings];
    switch (idx) {
      case 0: // 거리순 -> 거리 계산 알고리즘 필요
        break;

      case 1: // 조회순
        sortList.sort((a, b) => (a.boardHits > b.boardHits ? -1 : 1));
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
      <div className="searchTab">
        {/* 검색 창 */}
        <div className="searchBox">
          <div className="title" css={title}>
            <i
              className="bi bi-list navIcon"
              onClick={() => {
                handleOpenModal("NavModal");
              }}
            ></i>
            <Link to="/" css={title}>
              오늘 하루
            </Link>
          </div>

          <div className="inputBox">
            <input
              onChange={handleChange}
              value={text}
              onKeyDown={handleOnKeyDown}
            ></input>
            <button onClick={handleSearch}>
              <i className="bi bi-search"></i>
            </button>
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

        {/* 대쉬 보드 */}
        <div className="dashBoard">
          <div className="searchResult">
            모임명 <span>{text}</span> 검색결과
          </div>
          <hr />

          <div
            className="meetingCard"
            onClick={() =>
              handleOpenModal(
                "InfoModal",
                meetingData.address,
                meetingData.subTitle,
                meetingData.title,
                meetingData.category,
                "광고 예제"
              )
            }
          >
            <AdMeetingCard />
          </div>

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
          {/* 모임 수, 정렬 값 종료 */}

          {/* 검색 결과 창 */}
          {displayMeetings.length !== 0 ? (
            displayMeetings.map((data, idx) => {
              return (
                <div
                  className="listBox"
                  key={idx}
                  onClick={() => {
                    handleOpenModal(
                      "InfoModal",
                      data.address,
                      data.subTitle,
                      data.title,
                      data.category,
                      data.content
                    );
                  }}
                  onMouseOver={() => {
                    handleMouseOver(data.title);
                  }}
                >
                  {idx === 0 ? <hr /> : ""}
                  <h4>{data.title}</h4>
                  <p>{data.subTitle}</p>
                  <p>{data.category}</p>
                  <p>{data.address}</p>
                  <p>조회수 : {data.boardHits}</p>
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
        {/* 대시보드 종료*/}
      </div>

      {/* 지도 */}
      <div className="mapComponent">
        <Map />
      </div>
      {/* 지도 종료*/}

      {/* 버튼 아이콘 */}
      <div className="icons">
        <div>
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
          <button
            className={toggleLocation ? "selected" : ""}
            onClick={() => {
              handleCurrentLocation();
              setToggleLocation(!toggleLocation);
            }}
          >
            <i className="bi bi-geo-alt-fill"></i>
          </button>
        </div>
        <div>
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
      </div>
      {/* 버튼 아이콘 종료 */}
    </div>
  );
}

export default MapPage;
