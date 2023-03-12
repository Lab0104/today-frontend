import { configureStore } from "@reduxjs/toolkit";
import DisplayMeetingSlice from "./DisplayMeetingSlice";
import KakaoMapSlice from "./KakaoMapSlice";
import MeetingCardSlice from "./MeetingCardSlice";
import ModalSlice from "./ModalSlice";
import ToggleSlice from "./ToggleSlice";

export default configureStore({
  reducer: {
    modal: ModalSlice, // 모달 창
    meetingCard: MeetingCardSlice, // 모임 카드
    map: KakaoMapSlice, // 카카오 맵
    display: DisplayMeetingSlice, // 카카오맵의 검색 결과
    toggle: ToggleSlice,
  },
});
