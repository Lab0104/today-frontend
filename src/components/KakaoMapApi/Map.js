/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { changeData } from "../../store/Store";

const { kakao } = window;

function Map(props) {
  let [markers, setMarkers] = useState([]);

  const mapContainer = useRef(null);

  const dispatch = useDispatch();
  let store = useSelector((state) => {
    return state;
  });

  useEffect(() => {
    initMap();
    // dispatch(createMap(mapContainer));
  }, []);

  useEffect(() => {
    searchDB();
  }, [store.searchKeyword]);

  const initMap = () => {
    //좌표값
    const center = new kakao.maps.LatLng(37.566826, 126.9786567);
    const options = {
      center,
      level: 5,
    };
    props.setKakaoMap(new kakao.maps.Map(mapContainer.current, options));
  };

  const searchDB = () => {
    if (!props.kakaoMap) return;
    if (store.searchKeyword === "") return;

    props.infowindow.close();

    markers.map((marker, idx) => {
      marker.setMap(null);
    });
    markers = [];
    setMarkers(...markers);

    // props.setMarkersData([]);

    // 장소 검색 객체를 생성합니다
    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(store.searchKeyword, placesSearchDB);

    function placesSearchDB(data, status) {
      if (status === kakao.maps.services.Status.OK) {
        dispatch(changeData([...data]));
        console.log(data);

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        const bounds = new kakao.maps.LatLngBounds();

        data.map((place, idx) => {
          const position = new kakao.maps.LatLng(place.y, place.x);
          const place_name = place.place_name;
          const place_id = place.id;

          const marker = new kakao.maps.Marker({
            map: props.kakaoMap,
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

          props.markersData.push(newObject);
          props.setMarkersData([...props.markersData]);

          bounds.extend(new kakao.maps.LatLng(place.y, place.x));

          kakao.maps.event.addListener(marker, "mouseover", function () {
            props.infowindow.setContent(
              `<div style="padding:5px;">${place_name}</div>`
            );

            props.infowindow.open(props.kakaoMap, marker);
          });
        });

        props.kakaoMap.setBounds(bounds);
      } else {
        alert("검색오류");
      }
    }
  };

  return <div css={mapStyle} ref={mapContainer}></div>;
}

const mapStyle = css`
  width: 100%;
  height: 100vh;
`;

export default Map;
