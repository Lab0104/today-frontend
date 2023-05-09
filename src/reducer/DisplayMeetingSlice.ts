import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { meetingListDB, ReceiveMeetingData } from "../store/MeetingDB";

const initialState: DisplayState = {
  displayMeetings: [],
  meetingDB: meetingListDB,
  showMeeting: meetingListDB[0],
};

type DisplayState = {
  displayMeetings: ReceiveMeetingData[];
  meetingDB: ReceiveMeetingData[];
  showMeeting: ReceiveMeetingData;
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
      if (actions.payload.displayMeetings.length !== 0)
        state.showMeeting = actions.payload.displayMeetings[0];
      else {
        state.showMeeting.error = true;
      }
    },
    addData(state, actions: PayloadAction<{ data: ReceiveMeetingData }>) {
      state.meetingDB.push(actions.payload.data);
    },
    setShowContent(state, actions: PayloadAction<{ id: number }>) {
      const answer = state.displayMeetings.find((e) => {
        if (e.meeting_id === actions.payload.id) return true;
        return false;
      });

      if (typeof answer !== "undefined") state.showMeeting = answer;
    },
  },
});
export const { changeData, addData, setShowContent } =
  DisplayMeetingSlice.actions;
export default DisplayMeetingSlice.reducer;
