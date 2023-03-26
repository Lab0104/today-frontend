import { createSlice } from "@reduxjs/toolkit";
import { meetingListDB } from "../store/MeetingDB";

const initialState = {
  displayMeetings: [],
  meetingDB: meetingListDB,
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
    addData(state, actions) {
      const { data } = actions.payload;
      state.meetingDB.push(data);
    },
  },
});
export const { changeData, addData } = DisplayMeetingSlice.actions;
// export const selectDisplayMeeting = (state) => state.display;

export default DisplayMeetingSlice.reducer;
