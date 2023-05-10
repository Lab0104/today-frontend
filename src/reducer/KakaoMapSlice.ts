import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: MapState = {
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

type MapState = {
  mapActions: "search" | "move" | "zoom" | "save" | "";
  zoomActions: "zoomIn" | "zoomOut" | "";
  markerTitle: string;
  checkOrder: boolean;
  trackLocation: boolean;
  searchKeyword: string;
};

/** mapAction으로 수행 하는 Action을 KakaoMapAPI에 전달, 같은 action을 여러번 전달 시 checkOrder으로 다른값 전달 -> 렌더링 */
export const KakaoMapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    /**검색 */
    searchMap: (state, actions: PayloadAction<{ searchKeyword: string }>) => {
      state.searchKeyword = actions.payload.searchKeyword;
      state.mapActions = "search";

      state.checkOrder = !state.checkOrder;
    },
    /**마커로 이동 */
    moveMap: (state, actions: PayloadAction<{ markerTitle: string }>) => {
      state.markerTitle = actions.payload.markerTitle;
      state.mapActions = "move";

      state.checkOrder = !state.checkOrder;
    },
    /**줌 */
    zoomMap: (
      state,
      actions: PayloadAction<{ zoomActions: "zoomIn" | "zoomOut" }>
    ) => {
      state.mapActions = "zoom";
      state.zoomActions = actions.payload.zoomActions;

      state.checkOrder = !state.checkOrder;
    },
    /**현재위치 표시 */
    currentLocation: (state) => {
      state.trackLocation = !state.trackLocation;
    },

    saveData: (state) => {
      state.mapActions = "save";
      state.checkOrder = !state.checkOrder;
    },
  },
});
export const { searchMap, moveMap, zoomMap, currentLocation, saveData } =
  KakaoMapSlice.actions;
export default KakaoMapSlice.reducer;
