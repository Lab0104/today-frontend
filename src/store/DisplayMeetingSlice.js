import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  displayMeetings: [],
};

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
