import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReceiveMeetingData } from "../store/MeetingDB";

const initialState: ReceiveMeetingData = {
  meeting_id: 1,
  large_category: "스포츠/게임",
  category: "축구 클럽",
  title: "일요일 풋볼 게임",
  address: "경기도 남양주시 와부읍 석실로488번길 56-1",
  status: "모집중",
  startDate: "23.05.15 10:00 AM",
  endDate: "12:00 PM",
  deadLine: "23.05.14 10:00 PM",
  tag: ["Football", "Sports", "Fitness"],
  like: true,
};

type MeetingPayload = {
  [key: string]: string;
};

/** 현재 클릭하여 상세 표시하고 있는 모임 정보 */
export const modalSlice = createSlice({
  name: "meetingCard",
  initialState,
  reducers: {
    setMeetingCard: (state, actions: PayloadAction<MeetingPayload>) => {
      const { title, address, category } = actions.payload;
      state.title = title;
      state.address = address;
      state.category = category;
    },
  },
});
export const { setMeetingCard } = modalSlice.actions;

export default modalSlice.reducer;
