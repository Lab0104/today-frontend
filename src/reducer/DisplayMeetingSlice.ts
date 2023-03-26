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
    changeData(
      state,
      actions: PayloadAction<{ displayMeetings: ReceiveMeetingData[] }>
    ) {
      state.displayMeetings = actions.payload.displayMeetings;
    },
    addData(state, actions: PayloadAction<{ data: ReceiveMeetingData }>) {
      state.meetingDB.push(actions.payload.data);
    },
  },
});
export const { changeData, addData } = DisplayMeetingSlice.actions;
export default DisplayMeetingSlice.reducer;
