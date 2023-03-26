import { configureStore } from "@reduxjs/toolkit";
import DisplayMeetingSlice from "../reducer/DisplayMeetingSlice";
import KakaoMapSlice from "../reducer/KakaoMapSlice";
import MeetingCardSlice from "../reducer/MeetingCardSlice";
import ModalSlice from "../reducer/ModalSlice";
import ToggleSlice from "../reducer/ToggleSlice";
import userSlice from "../reducer/userSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    modal: ModalSlice, // 모달 창
    meetingCard: MeetingCardSlice, // 모임 카드(수정 필요)
    map: KakaoMapSlice, // 카카오 맵
    display: DisplayMeetingSlice, // 카카오맵의 검색 결과
    toggle: ToggleSlice, // 토글
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
