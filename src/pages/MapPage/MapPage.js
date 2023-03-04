import React, { useState } from "react";
import "./MapPage.css";
import Map from "../../components/KakaoMapApi/KakaoMapApi";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../store/ModalSlice";
import AdMeetingCard from "../../components/MeetingCard/AdMeetingCard";
import { moveMap, searchMap } from "../../store/KakaoMapSlice";
import { selectSearchData } from "../../store/SearchDataSlice";
import { setMeetingCard } from "../../store/MeetingCardSlice";
import { meetingData } from "../../components/MeetingCard/meetingList";

const filters = [
  "비어있는 모임방",
  "참여중인 모임방",
  "학술",
  "취미",
  "대외활동",
  "기타",
];

function MapPage() {
  const [text, setText] = useState("");

  const dispatch = useDispatch();
  const { searchData } = useSelector(selectSearchData);

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
            <input onChange={handleChange} value={text}></input>
            <button onClick={handleSearch}>
              <i className="bi bi-search"></i>
            </button>
          </div>
          <div className="fliter">
            <button className="selected">모두</button>
            {filters.map((data, idx) => {
              return <button key={idx}>{data}</button>;
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
            <p> 정확도순 </p>
            <p> 인기도순 </p>
            <p> 마감날짜순 </p>
          </div>
          {searchData.length !== 0 ? (
            searchData.map((data, idx) => {
              return (
                <div
                  className="listBox"
                  key={idx}
                  onClick={() =>
                    handleOpenModal(
                      "InfoModal",
                      data.address_name,
                      data.category_name,
                      data.place_name
                    )
                  }
                  onMouseOver={() => handleMouseOver(data.id)}
                >
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
        <button
          onClick={() => {
            handleOpenModal("ProfileModal");
          }}
        >
          <i className="bi bi-person-fill"></i>
        </button>
        <button
          onClick={() => {
            handleOpenModal("ChatModal");
          }}
        >
          <i className="bi bi-chat-dots-fill"></i>
        </button>
        <button
          onClick={() => {
            handleOpenModal("AddModal");
          }}
        >
          <i className="bi bi-plus-circle-fill"></i>
        </button>
        <button>
          <i className="bi bi-layers-fill"></i>
        </button>
        <button>
          <i className="bi bi-record-circle"></i>
        </button>
      </div>
    </div>
  );
}

export default MapPage;
