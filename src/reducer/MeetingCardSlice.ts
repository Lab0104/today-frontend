import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReceiveMeetingData } from "../store/MeetingDB";

const initialState: ReceiveMeetingData = {
  meet_id: "",
  title: "스터디 모임 (2/4)",
  sub_title: "코딩테스트 자바 스터디",
  category: "문화 > 공연",
  maximum_participants: 0,
  registered_participants: 0,
  date: "",
  deadline: "",
  address_coords_longitude: 0,
  address_coords_latitude: 0,
  address: "경기 용인시 기흥구 강남서로 9",
  content:
    "대학연합 살사댄스동아리 💃딴따라클럽🕺에서 20기 회원을 모집합니다! (3/11 토요일 개강)\n\n💠 대상: 살사 바차타에 관심있는 20대 대학생 누구나! \n       ❗️남녀 선착순 각15명 내외 모집❗️\n(선착순 인원 마감시 대기 명단으로 안내드리고 있습니다.)\n(모집기간 이후에도 다음 기수 사전 신청이 가능합니다.)\n\n💠 장소: 보니따 (홍대입구역 근처 연습실)\n\n💠 일정: 매주 토 수업 (15-17시 30분)\n              매주 월 연습 (19-21시)\n\n💠 강습: 동아리 선배님들과 함께 합니다!\n\n💠 회비: 5만원(6주+@ 과정, 수업료 및 대관료 포함)\n\n   ※ 지인 소개 or 지인과 함께 동반 등록시 5000원 할인 됩니다. (차수별 1회만 적용 가능)\n   ※ 열혈 딴클인들에게는 기장 할인, 소셜 MVP 할인 등 다양한 할인 혜택이 마련되어 있습니다.\n\n   ※ 회비는 운영 지출에만 사용하며, 매 분기 회계내역을 공개해 투명하게 사용합니다.\n   ※ 수업 시작 이후 환불은 형평성을 고려하여 불가합니다.\n\n💠지원 및 문의: 오픈 채팅 후 지원서 작성\n\n🔆 딴따라클럽 오픈 카톡 : https://open.kakao.com/o/sKLOVK6e\n\n🔆 딴클 유튜브 :  https://youtube.com/channel/UCB6OZ3dc4E69wpuevKYt_nA\n\n🔴 딴따라클럽은 대학생에 의해 자치적으로 운영되는 동아리이며\n정치, 종교 및 시민 단체와 전혀 관련이 없습니다. (외국인 유학생, 교환학생, 휴학생 포함)\n\n🟡 춤 잘 출 필요가 전혀 없습니다, 흥만 장착하고 오셔요!\n\n🟢 외국인 친구 사귀고싶다, 혹은 해외여행 가서 특별한 추억을 만들고 싶다, 하면 살사/바차타 필수라구요!\n\n🔵 서울 소재 학교 선배님들이 활동하고 계십니다.\n멀리 수원, 용인, 성남, 부산 등에서 다니는 친구들도 있으니 부담없이 신청해주세요!\n\n✅ 활동 중 촬영되는 사진 및 영상은 동아리 SNS에 게시될 수 있습니다.\n\n🚫 부적절한 언행은 강퇴 사유가 될 수 있습니다. (예의있는 딴클인을 기다려요!)",
  hits: 10,
  isLike: false,
  organizer_nickname: "",
  user_id: "",
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
      const { title, subTitle, address, category, content } = actions.payload;
      state.title = title;
      state.sub_title = subTitle;
      state.address = address;
      state.category = category;
      state.content = content;
    },
  },
});
export const { setMeetingCard } = modalSlice.actions;

export default modalSlice.reducer;
