import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  displayMeetings: [],
};

/** MapPage에서 표시되는 검색 결과, KakaoMapAPI에서도 접근 */
export const DisplayMeetingSlice = createSlice({
  name: "display",
  initialState,
  reducers: {
    changeData(state, actions) {
      const { displayMeetings } = actions.payload;
      state.displayMeetings = displayMeetings;
    },
  },
});
export const { changeData } = DisplayMeetingSlice.actions;
export const selectDisplayMeeting = (state) => state.display;

export default DisplayMeetingSlice.reducer;
