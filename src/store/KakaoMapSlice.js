import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  /** search, move, zoom */
  mapActions: "",

  /** 줌인, 줌아웃 */
  zoomActions: "",

  /** 마커 클릭시 마커 이릅 전달 */
  markerTitle: "",

  /** 반복 action시 재 렌더링을 위한 */
  checkOrder: true,

  /** 현재 위치 마커 표시 여부 */
  trackLocation: false,

  /** 검색 키워드 */
  searchKeyword: "",
};

/** mapAction으로 수행 하는 Action을 KakaoMapAPI에 전달, 같은 action을 여러번 전달 시 checkOrder으로 다른값 전달 -> 렌더링 */
export const KakaoMapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    /**검색 */
    searchMap: (state, actions) => {
      const { searchKeyword } = actions.payload;
      state.searchKeyword = searchKeyword;
      state.mapActions = "search";
      state.checkOrder = !state.checkOrder;
    },
    /**마커로 이동 */
    moveMap: (state, actions) => {
      const { markerTitle } = actions.payload;
      state.markerTitle = markerTitle;
      state.mapActions = "move";
      state.checkOrder = !state.checkOrder;
    },
    /**줌 */
    zoomMap: (state, actions) => {
      const { zoomActions } = actions.payload;
      state.mapActions = "zoom";
      state.zoomActions = zoomActions;
      state.checkOrder = !state.checkOrder;
    },
    /**현재위치 표시 */
    currentLocation: (state) => {
      state.trackLocation = !state.trackLocation;
    },
  },
});
export const { searchMap, moveMap, openInfoWindow, zoomMap, currentLocation } =
  KakaoMapSlice.actions;
export const selectMap = (state) => state.map;

export default KakaoMapSlice.reducer;
