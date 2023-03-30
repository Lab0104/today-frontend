import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import DisplayMeetingSlice from "../reducer/DisplayMeetingSlice";
import KakaoMapSlice from "../reducer/KakaoMapSlice";
import MeetingCardSlice from "../reducer/MeetingCardSlice";
import ModalSlice from "../reducer/ModalSlice";
import ToggleSlice from "../reducer/ToggleSlice";
import userSlice from "../reducer/userSlice";
import { postApi } from "../services/postApi";

export const store = configureStore({
  reducer: {
    user: userSlice,
    modal: ModalSlice, // 모달 창
    meetingCard: MeetingCardSlice, // 모임 카드(수정 필요)
    map: KakaoMapSlice, // 카카오 맵
    display: DisplayMeetingSlice, // 카카오맵의 검색 결과
    toggle: ToggleSlice, // 토글
    [postApi.reducerPath]: postApi.reducer,
  },
  // API 미들웨어를 추가하면 cahsing, invalidation, polling, 기타 유용한 기능 사용 가능.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postApi.middleware),
});

// 옵셔널, refetchOnFocus/refetchOnReconnect 기능을 위해 필요함
// setupListeners 문서를 참고 - 커스텀을 위한 옵셔널 콜백을 2번째 인자로 받음
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
