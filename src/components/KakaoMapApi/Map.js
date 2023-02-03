/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useEffect, useRef, useState } from "react";

const { kakao } = window;

function Map(props) {
  const [infowindow, setInfowindow] = useState(); //인포 윈도우
  const [kakaoMap, setKakaoMap] = useState(null); //지도 객체
  const [markers, setmarkers] = useState([]); //마커 집단
  const mapContainer = useRef(null);

  useEffect(() => {
    initMap();
  }, []);

  const initMap = () => {
    //좌표값
    const center = new kakao.maps.LatLng(37.566826, 126.9786567);
    const options = {
      center,
      level: 3,
    };
    setKakaoMap(new kakao.maps.Map(mapContainer.current, options));
  };

  return (
    <div css={mapStyle} ref={mapContainer}>
      <InitMarker position={{ lat: 37.566826, lng: 126.9786567 }} />
    </div>
  );
}
const InitMarker = (props) => {
  let marker = new kakao.maps.Marker({
    position: new kakao.maps.LatLng(
      props.position.latitude,
      props.position.longitude
    ),
    title: props.position.longitude,
    image: null,
    clickable: true,
  });

  marker.setMap(props.kakaoMap);
};
const mapStyle = css`
  width: 100%;
  height: 100vh;
`;
export default Map;
