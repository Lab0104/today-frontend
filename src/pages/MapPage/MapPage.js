import React, { useEffect, useState } from "react";
import "./MapPage.css";
// import KakaoMap from "../../components/KakaoMapApi/KakaoMap";
import { useDebounce } from "../../hooks/useDebounce";
import Map from "../../components/KakaoMapApi/Map";

const { kakao } = window;

function MapPage() {
  const [kakaoMap, setKakaoMap] = useState(null);

  const [searchValue, setSearchValue] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [markersData, setMarkersData] = useState([]);

  const [infowindow, setInfowindow] = useState(
    new kakao.maps.InfoWindow({ zIndex: 1 })
  );

  const debouncedSearchTerm = useDebounce(searchValue, 500);

  const handleChange = (e) => {
    setSearchValue(e.target.value);
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
            <img src="" alt="nav"></img>
            <p>오늘하루</p>
          </div>
          <div className="inputBox">
            <input onChange={handleChange} value={searchValue}></input>
          </div>
          <div className="fliter">
            <button className="selected">모두</button>
            <button>비어있는 모임방</button>
            <button>참여중인 모임방</button>
            <button>학술</button>
            <button>취미</button>
          </div>
        </div>
        <div className="dashBoard">
          <div className="searchResult">
            모임명 <span>밥</span> 검색결과
          </div>
          <hr />
          <div className="largeBox">
            <div className="title">
              <img src="" alt="Icon"></img>
              <div className="text">
                <p>스터디 모임 (2/4)</p>
                <p>코딩테스트 자바 스터디</p>
              </div>
              <img className="liked" src="" alt="Liked"></img>
            </div>
            <hr className="line"></hr>
            <div className="content">
              <p>경기 용인시 기흥구 강남서로 9 2022-12-29 13:00 ~ 18:00</p>
              <p>
                <span>모집중</span> | 2022-12-29 12:00 - 모집 마감
              </p>
              <p className="tag">준비물 없음 | 초보자 환영 | 모임 시간 준수</p>
              <p className="time">30분 전</p>
            </div>
          </div>
          <hr />
          <div className="smallBox">
            <p className="count">{"모임" + searchData.length + "개"}</p>
            <p> 정확도순 </p>
            <p> 인기도순 </p>
            <p> 마감날짜순 </p>
          </div>
          {searchData.map((data, idx) => {
            return (
              <div
                className="listBox"
                key={idx}
                onClick={() => move(data.id, idx)}
                onMouseOver={() => mouseover(data.id, idx)}
              >
                <h4>{data.place_name}</h4>
                <p> {data.address_name}</p>
                <p>
                  {data.category_name ? data.category_name : "카테고리 미분류"}
                </p>
                <hr></hr>
              </div>
            );
          })}
        </div>
      </div>
      <div className="mapComponent">
        <Map
          keyword={debouncedSearchTerm}
          setSearchData={setSearchData}
          setMarkersData={setMarkersData}
          markersData={markersData}
          kakaoMap={kakaoMap}
          setKakaoMap={setKakaoMap}
          infowindow={infowindow}
        ></Map>
        {/* <KakaoMap keyword={debouncedSearchTerm}></KakaoMap> */}
      </div>
    </div>
  );
}

export default MapPage;
