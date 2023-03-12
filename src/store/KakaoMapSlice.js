import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mapActions: "",
  zoomActions: "",
  markerTitle: "",
  checkOrder: true,
  trackLocation: false,
};

export const KakaoMapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    searchMap: (state, actions) => {
      const { searchKeyword } = actions.payload;
      state.searchKeyword = searchKeyword;
      state.mapActions = "search";
      state.checkOrder = !state.checkOrder;
    },
    moveMap: (state, actions) => {
      const { markerTitle } = actions.payload;
      state.markerTitle = markerTitle;
      state.mapActions = "move";
      state.checkOrder = !state.checkOrder;
    },
    zoomMap: (state, actions) => {
      const { zoomActions } = actions.payload;
      state.mapActions = "zoom";
      state.zoomActions = zoomActions;
      state.checkOrder = !state.checkOrder;
    },
    currentLocation: (state) => {
      state.trackLocation = !state.trackLocation;
    },
  },
});
export const { searchMap, moveMap, openInfoWindow, zoomMap, currentLocation } =
  KakaoMapSlice.actions;
export const selectMap = (state) => state.map;

export default KakaoMapSlice.reducer;
