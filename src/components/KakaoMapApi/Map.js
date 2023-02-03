/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useEffect, useRef, useState } from "react";

const { kakao } = window;

function Map(props) {
  const [kakaoMap, setKakaoMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [infowindow, setInfowindow] = useState(
    new kakao.maps.InfoWindow({ zIndex: 1 })
  );
  const mapContainer = useRef(null);

  useEffect(() => {
    initMap();
  }, []);

  useEffect(() => {
    searchDB();
  }, [props.keyword]);

  const initMap = () => {
    //좌표값
    const center = new kakao.maps.LatLng(37.566826, 126.9786567);
    const options = {
      center,
      level: 5,
    };
    setKakaoMap(new kakao.maps.Map(mapContainer.current, options));
  };

  const searchDB = () => {
    if (!kakaoMap) return;
    if (props.keyword === "") return;

    infowindow.close();

    markers.map((marker, idx) => {
      marker.setMap(null);
    });
    setMarkers([]);

    // 장소 검색 객체를 생성합니다
    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(props.keyword, placesSearchDB);

    function placesSearchDB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        props.setSearchData([]);
        props.setSearchData([...data]);

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        const bounds = new kakao.maps.LatLngBounds();

        data.map((place, idx) => {
          const marker = new kakao.maps.Marker({
            map: kakaoMap,
            position: new kakao.maps.LatLng(place.y, place.x),
          });

          markers.push(marker);
          setMarkers([...markers]);

          bounds.extend(new kakao.maps.LatLng(place.y, place.x));

          kakao.maps.event.addListener(marker, "click", function () {
            console.log(place.place_name);
            infowindow.setContent(
              `<div style="padding:5px;">${place.place_name}</div>`
            );

            infowindow.open(kakaoMap, marker);
          });
        });

        kakaoMap.setBounds(bounds);
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
