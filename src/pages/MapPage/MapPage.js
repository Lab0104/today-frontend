import React, { useState } from "react";
import "./MapPage.css";
// import KakaoMap from "../../components/KakaoMapApi/KakaoMap";
import Map from "../../components/KakaoMapApi/Map";
import { useDispatch, useSelector } from "react-redux";
import { changeKeyword } from "../../store/Store";

const { kakao } = window;

function MapPage() {
  const [text, setText] = useState("");
  const [kakaoMap, setKakaoMap] = useState(null);
  const [markersData, setMarkersData] = useState([]);
  const [infowindow, setInfowindow] = useState(
    new kakao.maps.InfoWindow({ zIndex: 1 })
  );

  const dispatch = useDispatch();
  const store = useSelector((state) => {
    return state;
  });

  const handleChange = (e) => {
    setText(e.target.value);
  };

  function move(id) {
    let position;
    markersData.map(({ latlng, place_id }) => {
      if (place_id === id) position = latlng;
    });
    kakaoMap.setCenter(position);
    kakaoMap.setLevel(5);
  }

  function mouseover(id) {
    let place, markerData;
    markersData.map(({ place_name, place_id, marker }) => {
      if (place_id === id) {
        place = place_name;
        markerData = marker;
      }
    });
    infowindow.setContent(`<div style="padding:5px;">${place}</div>`);
    infowindow.open(kakaoMap, markerData);
  }

  return (
    <div className="main">
      <div className="searchTab">
        <div className="searchBox">
          <div className="title">
            <i className="bi bi-list"></i>
            <p>오늘 하루</p>
          </div>
          <div className="inputBox">
            <input onChange={handleChange} value={text}></input>
            <button
              onClick={(e) => {
                dispatch(changeKeyword(text));
              }}
            >
              <i className="bi bi-search"></i>
            </button>
          </div>
          <div className="fliter">
            <button className="selected">모두</button>
            <button>비어있는 모임방</button>
            <button>참여중인 모임방</button>
            <button>학술</button>
            <button>취미</button>
            <button>대외활동</button>
            <button>기타</button>
          </div>
        </div>
        <div className="dashBoard">
          <div className="searchResult">
            모임명 <span>밥</span> 검색결과
          </div>
          <hr />
          <div className="largeBox">
            <div className="title">
              <i className="bi bi-badge-ad"></i>
              <div className="text">
                <p>스터디 모임 (2/4)</p>
                <p>코딩테스트 자바 스터디</p>
              </div>
              <i className="bi bi-heart like"></i>
              {/* <i className="bi bi-heart-fill"></i> */}
            </div>
            <hr className="line"></hr>
            <div className="content">
              <p>경기 용인시 기흥구 강남서로 9</p>
              <p>2022-12-29 13:00 ~ 18:00</p>
              <p>
                <span>모집중</span> | 2022-12-29 12:00 - 모집 마감
              </p>
              <p className="tag">준비물 없음 | 초보자 환영 | 모임 시간 준수</p>
              <p className="time">30분 전</p>
            </div>
          </div>
          <hr />
          <div className="smallBox">
            <p className="count">{"모임" + store.searchData.length + "개"}</p>
            <p> 정확도순 </p>
            <p> 인기도순 </p>
            <p> 마감날짜순 </p>
          </div>
          {store.searchData.length !== 0 ? (
            store.searchData.map((data, idx) => {
              return (
                <div
                  className="listBox"
                  key={idx}
                  onClick={() => move(data.id, idx)}
                  onMouseOver={() => mouseover(data.id, idx)}
                >
                  <h4>{data.place_name}</h4>
                  <p>{data.address_name}</p>
                  <p>
                    {data.category_name
                      ? data.category_name
                      : "카테고리 미분류"}
                  </p>
                  <hr></hr>
                </div>
              );
            })
          ) : (
            <h4>로그인 후 좋아하는 모임을 찾아보세요!</h4>
          )}
        </div>
      </div>
      <div className="mapComponent">
        <Map
          setMarkersData={setMarkersData}
          markersData={markersData}
          kakaoMap={kakaoMap}
          setKakaoMap={setKakaoMap}
          infowindow={infowindow}
        ></Map>
      </div>
      <div className="icons">
        <button>
          <i className="bi bi-person-fill"></i>
        </button>
        <button>
          <i className="bi bi-chat-dots-fill"></i>
        </button>
        <button>
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
