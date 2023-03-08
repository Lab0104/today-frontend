import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mapActions: "",
  zoomActions: "",
  markerId: "",
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
      const { markerId } = actions.payload;
      state.markerId = markerId;
      state.mapActions = "move";
      state.checkOrder = !state.checkOrder;
    },
    zoomMap: (state, actions) => {
      const { zoomActions } = actions.payload;
      state.mapActions = "zoom";
      state.zoomActions = zoomActions;
      state.checkOrder = !state.checkOrder;
    },
    currentLocation: (state, actions) => {
      state.trackLocation = !state.trackLocation;
    },
  },
});
export const { searchMap, moveMap, openInfoWindow, zoomMap, currentLocation } =
  KakaoMapSlice.actions;
export const selectMap = (state) => state.map;

export default KakaoMapSlice.reducer;
