import { configureStore } from "@reduxjs/toolkit";
import KakaoMapSlice from "./KakaoMapSlice";
import MeetingCardSlice from "./MeetingCardSlice";
import ModalSlice from "./ModalSlice";
import SearchDataSlice from "./SearchDataSlice";

export default configureStore({
  reducer: {
    modal: ModalSlice,
    meetingCard: MeetingCardSlice,
    map: KakaoMapSlice,
    search: SearchDataSlice,
  },
});
