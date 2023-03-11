import React, { useState } from "react";
import "./MapPage.css";
import Map from "../../components/KakaoMapApi/KakaoMapApi";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../store/ModalSlice";
import AdMeetingCard from "../../components/MeetingCard/AdMeetingCard";
import {
  currentLocation,
  moveMap,
  searchMap,
  zoomMap,
} from "../../store/KakaoMapSlice";
import { selectSearchData } from "../../store/SearchDataSlice";
import { setMeetingCard } from "../../store/MeetingCardSlice";
import { meetingData } from "../../components/MeetingCard/meetingList";
import { selectToggle, toggleButtons } from "../../store/ToggleSlice";

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

function MapPage() {
  const [text, setText] = useState("");
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

  const [toggleSort, setToggleSort] = useState([true, false, false, false]);

  const dispatch = useDispatch();
  const { searchData } = useSelector(selectSearchData);
  const { toggleButton } = useSelector(selectToggle);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleOpenModal = (type, address_name, category_name, place_name) => {
    dispatch(
      openModal({
        modalType: type,
        isOpen: true,
      })
    );
    if (address_name) {
      dispatch(
        setMeetingCard({
          title: place_name,
          subTitle: category_name,
          address: address_name,
        })
      );
    }
  };

  const handleMouseOver = (id) => {
    dispatch(moveMap({ markerId: id }));
  };

  const handleSearch = () => {
    dispatch(searchMap({ searchKeyword: text }));
  };
  const handleZoom = (action) => {
    dispatch(zoomMap({ zoomActions: action }));
  };

  const handleCurrentLocation = () => {
    dispatch(currentLocation());
  };

  const handleOnKeyDown = (e) => {
    if (e.key === "Enter") dispatch(searchMap({ searchKeyword: text }));
  };

  const handleToggleIcons = (idx) => {
    dispatch(toggleButtons({ idx: idx }));
  };

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

  const handleToggleSort = (idx) => {
    const list = [false, false, false, false];
    list[idx] = true;

    setToggleSort([...list]);
  };

  return (
    <div className="main">
      <div className="searchTab">
        <div className="searchBox">
          <div className="title">
            <i
              className="bi bi-list nav"
              onClick={() => {
                handleOpenModal("NavModal");
              }}
            ></i>
            <p>오늘 하루</p>
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
                meetingData.title
              )
            }
          >
            <AdMeetingCard />
          </div>
          <div className="smallBox">
            <p className="count">{"모임" + searchData.length + "개"}</p>
            {sortItems.map((data, idx) => {
              return (
                <p key={idx}>
                  <span
                    className={"sort" + (toggleSort[idx] ? " selected" : "")}
                    onClick={() => {
                      handleToggleSort(idx);
                    }}
                  >
                    {data}
                  </span>
                  {idx === sortItems.length - 1 ? "" : " |"}
                </p>
              );
            })}
          </div>
          {searchData.length !== 0 ? (
            searchData.map((data, idx) => {
              return (
                <div
                  className="listBox"
                  key={idx}
                  onClick={() => {
                    handleOpenModal(
                      "InfoModal",
                      data.address_name,
                      data.category_name,
                      data.place_name
                    );
                  }}
                  onMouseOver={() => handleMouseOver(data.id)}
                >
                  {idx === 0 ? <hr /> : ""}
                  <h4>{data.place_name}</h4>
                  <p>{data.address_name}</p>
                  <p>
                    {data.category_name
                      ? data.category_name
                      : "카테고리 미분류"}
                  </p>
                  <hr />
                </div>
              );
            })
          ) : (
            <h4>로그인 후 좋아하는 모임을 찾아보세요!</h4>
          )}
        </div>
      </div>
      <div className="mapComponent">
        <Map />
      </div>
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
    </div>
  );
}

export default MapPage;
