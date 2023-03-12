/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeData } from "../../store/DisplayMeetingSlice";
import { selectMap } from "../../store/KakaoMapSlice";
import { meetingListDB } from "../../store/MeetingDB";

const { kakao } = window;

function KakaoMapApi() {
  const [kakaoMap, setKakaoMap] = useState();
  const [meetingList, setMeetingList] = useState([...meetingListDB]);
  const [markers, setMarkers] = useState([]);
  const [markersData, setMarkersData] = useState([]);
  const [userMarker, setUserMarker] = useState(new kakao.maps.Marker());
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

  const mapContainer = useRef(null);
  const dispatch = useDispatch();

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
        kakaoMap.setCenter(locPosition);

        const imageSrc = "images/marker/userMarker.png";
        const imageSize = new kakao.maps.Size(31, 31);
        const imageOption = { offset: new kakao.maps.Point(15, 31) };

        const image = new kakao.maps.MarkerImage(
          imageSrc,
          imageSize,
          imageOption
        );
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
    if (kakaoMap) return;
    initMap();
  }, []);

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

    //좌표값
  };

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

              markers.push(marker);
              setMarkers([...markers]);

              markersData.push({
                position: coords,
                title: data.title,
                marker: marker,
              });
              setMarkersData([...markersData]);

              bounds.extend(coords);

              kakao.maps.event.addListener(marker, "mouseover", function () {
                infowindow.setContent(content(data.title));

                infowindow.open(kakaoMap, marker);
              });
            }
            resolve();
          });
        });
      })
    );
    dispatch(changeData({ displayMeetings: [...meeting] }));
    if (check) kakaoMap.setBounds(bounds);
  };

  const moveMap = () => {
    markersData.map(({ position, title }) => {
      if (title === markerTitle) {
        kakaoMap.setCenter(position);
        kakaoMap.setLevel(5);
      }
    });
  };

  const mouseOver = () => {
    markersData.map(({ marker, title }) => {
      if (title === markerTitle) {
        infowindow.setContent(content(title));
        infowindow.open(kakaoMap, marker);
      }
    });
  };

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
