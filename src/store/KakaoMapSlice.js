import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mapActions: "",
  markerId: "",
};

export const KakaoMapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    searchMap: (state, actions) => {
      const { searchKeyword } = actions.payload;
      state.searchKeyword = searchKeyword;
      state.mapActions = "search";
    },
    moveMap: (state, actions) => {
      const { markerId } = actions.payload;
      state.markerId = markerId;
      state.mapActions = "move";
    },
  },
});
export const { searchMap, moveMap, openInfoWindow } = KakaoMapSlice.actions;
export const selectMap = (state) => state.map;

export default KakaoMapSlice.reducer;
