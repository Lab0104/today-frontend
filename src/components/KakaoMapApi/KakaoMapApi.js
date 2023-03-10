/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeData } from "../../store/DisplayMeetingSlice";
import { selectMap } from "../../store/KakaoMapSlice";
import { meetingListDB } from "../../store/MeetingDB";

const { kakao } = window;

function KakaoMapApi() {
  /** 지도 */
  const [kakaoMap, setKakaoMap] = useState();
  /** 모임 */
  const [meetingList, setMeetingList] = useState([...meetingListDB]);
  /** KakaoMap에서 제공하는 Marker 정보 */
  const [markers, setMarkers] = useState([]);
  /** 임의로 지정한 Marker 정보 */
  const [markersData, setMarkersData] = useState([]);
  /** 내 위치 마커 */
  const [userMarker, setUserMarker] = useState(new kakao.maps.Marker());
  /** 마커 클릭시 출력되는 창 */
  const [infowindow, setInfowindow] = useState(
    new kakao.maps.InfoWindow({ zIndex: 1 })
  );

  const {
    mapActions,
    markerTitle,
    searchKeyword,
    checkOrder,
    zoomActions,
    trackLocation,
  } = useSelector(selectMap);

  /** 지도 Element와 useRef을 이용해 연결 */
  const mapContainer = useRef(null);
  const dispatch = useDispatch();

  /** CheckOrder의 변화에 따라 mapActions을 수행 */
  useEffect(() => {
    switch (mapActions) {
      case "search":
        searchDB();
        break;

      case "move":
        moveMap();
        mouseOver();
        break;

      case "zoom":
        const level = kakaoMap.getLevel();
        zoomActions === "zoomIn"
          ? kakaoMap.setLevel(level - 1)
          : kakaoMap.setLevel(level + 1);
        break;

      default:
        break;
    }
  }, [checkOrder]);

  /** TrackLocatoin의 변화에 따라 현재 위치 표시 */
  useEffect(() => {
    if (!trackLocation) {
      userMarker.setMap(null);
      return;
    }

    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude, // 위도
          lon = position.coords.longitude; // 경도
        const locPosition = new kakao.maps.LatLng(lat, lon);
        kakaoMap.setCenter(locPosition); //현재 위치 기반으로 맵 설정

        const imageSrc = "images/marker/userMarker.png";
        const imageSize = new kakao.maps.Size(31, 31);
        const imageOption = { offset: new kakao.maps.Point(15, 31) };

        const image = new kakao.maps.MarkerImage(
          imageSrc,
          imageSize,
          imageOption
        );

        //커스텀 마커 설정
        setUserMarker(
          new kakao.maps.Marker({
            map: kakaoMap,
            position: locPosition,
            image: image,
          })
        );

        kakaoMap.setLevel(7);
      });
  }, [trackLocation]);

  /** 처음 렌더링 시 지도 생성 및 저장 */
  useEffect(() => {
    if (kakaoMap) return;
    initMap();
  }, []);

  /** 현재 위치 기반으로 지도 생성 */
  const initMap = () => {
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude, // 위도
            lon = position.coords.longitude; // 경도

          const center = new kakao.maps.LatLng(lat, lon); // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다

          const options = {
            center,
            level: 5,
          };
          setKakaoMap(new kakao.maps.Map(mapContainer.current, options));
        },
        (error) => {
          alert(error + "Geolocation Error");
        }
      );
    } else {
      const center = new kakao.maps.LatLng(37.566826, 126.9786567);

      const options = {
        center,
        level: 5,
      };
      setKakaoMap(new kakao.maps.Map(mapContainer.current, options));
    }
  };

  /** 모임 검색 */
  const searchDB = async () => {
    if (!kakaoMap) return;
    if (searchKeyword === "") return;

    setMeetingList([...meetingListDB]);

    infowindow.close();
    markers.map((marker, idx) => {
      marker.setMap(null);
    });
    setMarkers([]);

    let check = true;
    //검색 한 키워드가 제목, 내용, 주소 등에 포함 시 Filter
    const meeting = meetingList.filter((e) => {
      if (
        e.title.includes(searchKeyword) ||
        e.subTitle.includes(searchKeyword) ||
        e.content.includes(searchKeyword) ||
        e.address.includes(searchKeyword)
      ) {
        check = true;
        return true;
      }
      check = false;
      return false;
    });

    // 주소-좌표 변환 객체를 생성합니다
    const geocoder = new kakao.maps.services.Geocoder();

    // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해 LatLngBounds 객체에 좌표를 추가합니다
    const bounds = new kakao.maps.LatLngBounds();

    //주소를 이용해 좌표값 할당
    await Promise.all(
      meeting.map((data, idx) => {
        return new Promise((resolve) => {
          geocoder.addressSearch(data.address, (result, status) => {
            // 정상적으로 검색이 완료됐으면
            if (status === kakao.maps.services.Status.OK) {
              const coords = new kakao.maps.LatLng(result[0].y, result[0].x);

              const marker = new kakao.maps.Marker({
                map: kakaoMap,
                position: coords,
              });

              // 생성된 마커를 State에 저장
              markers.push(marker);
              setMarkers([...markers]);

              // 개발자가 사용하기 쉽게 가공해 저장
              markersData.push({
                position: coords,
                title: data.title,
                marker: marker,
              });
              setMarkersData([...markersData]);

              // 지도 바운더리 확장
              bounds.extend(coords);

              //마커에 마우스 오버 이벤트 등록
              kakao.maps.event.addListener(marker, "mouseover", () => {
                infowindow.setContent(content(data.title));
                infowindow.open(kakaoMap, marker);
              });
            }
            resolve();
          });
        });
      })
    );

    // MapPage에서 출력하는 State에 저장
    dispatch(changeData({ displayMeetings: [...meeting] }));

    // 지도 바운더리 설정
    if (check) kakaoMap.setBounds(bounds);
  };

  // 마커 타이틀과 일치하는 곳으로 이동
  const moveMap = () => {
    markersData.map(({ position, title }) => {
      if (title === markerTitle) {
        kakaoMap.setCenter(position);
        kakaoMap.setLevel(5);
      }
    });
  };

  // 마커 타이틀과 일치하는 infoWindow 열기
  const mouseOver = () => {
    markersData.map(({ marker, title }) => {
      if (title === markerTitle) {
        infowindow.setContent(content(title));
        infowindow.open(kakaoMap, marker);
      }
    });
  };
  // 지도 반환
  return <div css={mapStyle} ref={mapContainer}></div>;
}
const content = (place) => {
  return `<div style="padding: 10px;">
    <p style="width:inherit; white-space:nowrap; margin:auto;">${place}</p>
  </div>
  `;
};

const mapStyle = css`
  width: 100%;
  height: 100vh;
`;
export default KakaoMapApi;
