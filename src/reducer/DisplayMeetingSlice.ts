import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { meetingListDB, ReceiveMeetingData } from "../store/MeetingDB";

const initialState: DisplayState = {
  displayMeetings: [],
  meetingDB: meetingListDB,
};

type DisplayState = {
  displayMeetings: ReceiveMeetingData[];
  meetingDB: ReceiveMeetingData[];
};

/** MapPage에서 표시되는 검색 결과, KakaoMapAPI에서도 접근 */
export const DisplayMeetingSlice = createSlice({
  name: "display",
  initialState,
  reducers: {
    changeData(state, actions: PayloadAction<DisplayState>) {
      const { displayMeetings } = actions.payload;
      state.displayMeetings = displayMeetings;
    },
    addData(state, actions: PayloadAction<{ data: ReceiveMeetingData }>) {
      const { data } = actions.payload;
      state.meetingDB.push(data);
    },
  },
});
export const { changeData, addData } = DisplayMeetingSlice.actions;
export default DisplayMeetingSlice.reducer;
