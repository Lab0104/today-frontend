/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { useEffect, useRef, useState } from "react";
import { changeData, setShowContent } from "../../reducer/DisplayMeetingSlice";
import { toggleSorts } from "../../reducer/ToggleSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { showMeeting } from "store/MeetingDB";

declare global {
  interface Window {
    kakao: any;
  }
}

const { kakao } = window;

function KakaoMapApi() {
  const { meetingDB } = useAppSelector((state) => state.display);
  /** 지도 */
  const [kakaoMap, setKakaoMap] = useState<any>(); //new kakao.maps() ?
  /** 모임 */
  const [meetingList, setMeetingList] = useState([...meetingDB]);
  /** KakaoMap에서 제공하는 Marker 정보 */
  const [markers, setMarkers] = useState<any[]>([]); //new kakao.maps.Marker() Type 지정?
  /** 임의로 지정한 Marker 정보 */
  const [markersData, setMarkersData] = useState<any[]>([]);
  /** 내 위치 마커 */
  const [userMarker, setUserMarker] = useState(new kakao.maps.Marker());
  /** 마커 클릭시 출력되는 창 */
  const [infowindow] = useState(new kakao.maps.InfoWindow({ zIndex: 1 }));

  // 카카오 맵이 불러와 졌는지 체크
  const [asyncCheck, setAsyncCheck] = useState(false);

  const {
    mapActions,
    markerTitle,
    searchKeyword,
    checkOrder,
    zoomActions,
    trackLocation,
  } = useAppSelector((state) => state.map);

  /** 지도 Element와 useRef을 이용해 연결 */
  const mapContainer = useRef(null);
  const dispatch = useAppDispatch();

  /** 처음 렌더링 시 지도 생성 및 저장 */
  useEffect(() => {
    if (kakaoMap) return;
    initMap();
  }, []);

  /** CheckOrder의 변화에 따라 mapActions을 수행 */
  useEffect(() => {
    if (kakaoMap) {
      switchMapActions();
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

  useEffect(() => {
    switchMapActions();
  }, [asyncCheck]);

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
          setAsyncCheck(true);
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
      setAsyncCheck(true);
    }
  };

  const switchMapActions = () => {
    if (!kakaoMap) return;

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
  };

  /** 모임 검색 */
  const searchDB = async () => {
    setMeetingList([...meetingDB]); // Add시 비동기로 늦음.

    infowindow.close();
    markers.map((marker, idx) => {
      marker.setMap(null);
    });
    setMarkers([]);

    //검색 한 키워드가 제목, 내용, 주소 등에 포함 시 Filter
    const meeting = meetingList.filter((e) => {
      if (
        e.title.includes(searchKeyword) ||
        e.address.includes(searchKeyword) ||
        e.category.includes(searchKeyword) ||
        e.large_category.includes(searchKeyword) ||
        e.tag.includes(searchKeyword)
      ) {
        return true;
      }
      return false;
    });

    // 주소-좌표 변환 객체를 생성합니다
    const geocoder = new kakao.maps.services.Geocoder();

    // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해 LatLngBounds 객체에 좌표를 추가합니다
    const bounds = new kakao.maps.LatLngBounds();

    //주소를 이용해 좌표값 할당
    await Promise.all(
      meeting.map((data, idx) => {
        return new Promise<void>((resolve) => {
          geocoder.addressSearch(data.address, (result: any, status: any) => {
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

              kakao.maps.event.addListener(marker, "click", () => {
                dispatch(setShowContent({ id: data.meeting_id }));
              });
            } else {
              alert("ERROR" + data.address);
            }
            resolve();
          });
        });
      })
    );

    // MapPage에서 출력하는 State에 저장
    dispatch(
      changeData({
        displayMeetings: [...meeting],
      })
    );
    dispatch(toggleSorts({ idx: 0 }));

    // 지도 바운더리 설정
    if (meeting.length !== 0) kakaoMap.setBounds(bounds);
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
const content = (place: string) => {
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
