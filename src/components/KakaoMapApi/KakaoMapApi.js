/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectMap } from "../../store/KakaoMapSlice";
import { changeData } from "../../store/SearchDataSlice";

const { kakao } = window;

function KakaoMapApi() {
  const [kakaoMap, setKakaoMap] = useState();
  let [markers, setMarkers] = useState([]);
  const [userMarker, setUserMarker] = useState(new kakao.maps.Marker());
  const [markersData, setMarkersData] = useState([]);
  const [infowindow, setInfowindow] = useState(
    new kakao.maps.InfoWindow({ zIndex: 1 })
  );

  const {
    mapActions,
    markerId,
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

  const searchDB = () => {
    if (!kakaoMap) return;
    if (searchKeyword === "") return;

    infowindow.close();

    markers.map((marker, idx) => {
      marker.setMap(null);
    });
    markers = [];
    setMarkers(...markers);

    // 장소 검색 객체를 생성합니다
    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(searchKeyword, placesSearchDB);

    function placesSearchDB(data, status) {
      if (status === kakao.maps.services.Status.OK) {
        dispatch(changeData({ searchData: [...data] }));
        console.log(data);

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        const bounds = new kakao.maps.LatLngBounds();

        data.map((place, idx) => {
          const position = new kakao.maps.LatLng(place.y, place.x);
          const place_name = place.place_name;
          const place_id = place.id;

          const marker = new kakao.maps.Marker({
            map: kakaoMap,
            position: position,
          });

          markers.push(marker);
          setMarkers([...markers]);

          const newObject = {
            place_id: place_id,
            latlng: position,
            place_name: place_name,
            marker: marker,
          };

          markersData.push(newObject);
          setMarkersData([...markersData]);

          bounds.extend(new kakao.maps.LatLng(place.y, place.x));

          kakao.maps.event.addListener(marker, "mouseover", function () {
            infowindow.setContent(content(place_name));

            infowindow.open(kakaoMap, marker);
          });
        });

        kakaoMap.setBounds(bounds);
      } else {
        alert("검색오류");
      }
    }
  };

  const moveMap = () => {
    let position;

    markersData.map(({ latlng, place_id }) => {
      if (place_id === markerId) position = latlng;
    });

    kakaoMap.setCenter(position);
    kakaoMap.setLevel(5);
  };

  const mouseOver = () => {
    let place, markerData;

    markersData.map(({ place_name, place_id, marker }) => {
      if (place_id === markerId) {
        place = place_name;
        markerData = marker;
      }
    });

    infowindow.setContent(content(place));
    infowindow.open(kakaoMap, markerData);
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
