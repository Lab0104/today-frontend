import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  type: "advertise",
  title: "스터디 모임 (2/4)",
  subTitle: "코딩테스트 자바 스터디",
  icon: "",
  address: "경기 용인시 기흥구 강남서로 9",
  startDate: "2022-12-29 13:00",
  endDate: "18:00",
  status: true,
  tag: ["준비물 없음", "초보자 환영", "모임 시간 준수"],
  closedDate: " 2022-12-29 12:00",
};
export const modalSlice = createSlice({
  name: "meetingCard",
  initialState,
  reducers: {
    setMeetingCard: (state, actions) => {
      const { title, subTitle, address } = actions.payload;
      state.title = title;
      state.subTitle = subTitle;
      state.address = address;
    },
  },
});
export const { setMeetingCard } = modalSlice.actions;
export const selectModal = (state) => state.modal;

export default modalSlice.reducer;
