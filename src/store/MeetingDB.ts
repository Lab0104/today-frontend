export type ReceiveMeetingData = {
  meeting_id: number;
  large_category: string;
  category: string;
  title: string;
  address: string;
  status: string;
  startDate: string;
  endDate: string;
  deadLine: string;
  tag: string[];
  like: boolean;

  error?: boolean;
};

const meetingList = [
  {
    meet_id: 1,
    title: "스터디 모임",
    sub_title: "서브 타이틀",
    content: `자바스터디 모집합니다.\n\n같이 백준 문제풀이 진행하면서 기초 문법 및 실습 진행 할 예정입니다.\n\n 스터디룸에 PC가 있기에 따로 개인 노트북 없어도 참가 가능합니다.\n\n따로 궁금하신 내용 있으면 언제든지 채팅주세요.\n\n지각하시는 분들은 사절합니다!`,
    hits_count: 4,
    date_created: "2023-02-21T16:43",
    writer: "문지혜",
    maximum_participants: 2,
    registered_participants_count: 0,
    address: "경기 용인시 기흥구 강남서로 9",
    deadline: "2023-05-29T12:00",
    date: "2023-01-18T15:00",
    category: { "학문/스터디": ["프로그래밍 스터디"] },
  },
  {
    meet_id: 2,
    title: "제목",
    sub_title: "서브 타이틀",
    content: `자바스터디 모집합니다.\n\n같이 백준 문제풀이 진행하면서 기초 문법 및 실습 진행 할 예정입니다.\n\n 스터디룸에 PC가 있기에 따로 개인 노트북 없어도 참가 가능합니다.\n\n따로 궁금하신 내용 있으면 언제든지 채팅주세요.\n\n지각하시는 분들은 사절합니다!`,
    hits_count: 4,
    date_created: "2023-02-21T16:43",
    writer: "문지혜",
    maximum_participants: 2,
    registered_participants_count: 0,
    address: "경기 용인시 기흥구 강남서로 9",
    deadline: "2023-04-07T12:00",
    date: "2023-01-18T15:00",
    category: { "학문/스터디": ["프로그래밍 스터디"] },
  },
  {
    meet_id: 3,
    title: "제목",
    sub_title: "서브 타이틀",
    content: `자바스터디 모집합니다.\n\n같이 백준 문제풀이 진행하면서 기초 문법 및 실습 진행 할 예정입니다.\n\n 스터디룸에 PC가 있기에 따로 개인 노트북 없어도 참가 가능합니다.\n\n따로 궁금하신 내용 있으면 언제든지 채팅주세요.\n\n지각하시는 분들은 사절합니다!`,
    hits_count: 4,
    date_created: "2023-02-21T16:43",
    writer: "문지혜",
    maximum_participants: 3,
    registered_participants_count: 0,
    address: "경기 용인시 기흥구 강남서로 9",
    deadline: "2022-12-29T12:00",
    date: "2023-01-18T15:00",
    category: { "학문/스터디": ["프로그래밍 스터디"] },
  },
  {
    meet_id: 4,
    title: "제목",
    sub_title: "서브 타이틀",
    content: `자바스터디 모집합니다.\n\n같이 백준 문제풀이 진행하면서 기초 문법 및 실습 진행 할 예정입니다.\n\n 스터디룸에 PC가 있기에 따로 개인 노트북 없어도 참가 가능합니다.\n\n따로 궁금하신 내용 있으면 언제든지 채팅주세요.\n\n지각하시는 분들은 사절합니다!`,
    hits_count: 4,
    date_created: "2023-02-21T16:43",
    writer: "문지혜",
    maximum_participants: 4,
    registered_participants_count: 3,
    address: "경기 용인시 기흥구 강남서로 9",
    deadline: "2023-12-29T12:00",
    date: "2023-01-18T15:00",
    category: { "학문/스터디": ["프로그래밍 스터디"] },
  },
];

export const meetingApi: any = [
  {
    title: "Editor's Pick",
    list: [...meetingList],
  },
  {
    title: "광고 탭",
    list: [...meetingList, ...meetingList],
  },
  {
    title: "이런 모임은 어때요?",
    list: [...meetingList, ...meetingList, ...meetingList],
  },
];

export const meetingListDB: ReceiveMeetingData[] = [
  {
    meeting_id: 1,
    large_category: "스포츠/게임",
    category: "축구 클럽",
    title: "일요일 풋볼 게임",
    address: "경기도 남양주시 와부읍 석실로488번길 56-1",
    status: "모집중",
    startDate: "23.05.15 10:00 AM",
    endDate: "12:00 PM",
    deadLine: "23.05.14 10:00 PM",
    tag: ["풋볼", "운동", "건강"],
    like: true,
  },
  {
    meeting_id: 2,
    large_category: "예술/문화",
    category: "음악 감상 모임",
    title: "음향의 밤",
    address: "경기도 이천시 백사면 청백리로393번길 418-19",
    status: "모집중",
    startDate: "23.05.21 7:00 PM",
    endDate: "10:00 PM",
    deadLine: "23.05.19 11:59 PM",
    tag: ["음향", "음악", "라이브"],
    like: false,
  },
  {
    meeting_id: 3,
    large_category: "예술/문화",
    category: "미술 전시 관람 모임",
    title: "드로잉 워크샵",
    address: "경상북도 김천시 신기1길 16(신음동)",
    status: "모집중",
    startDate: "23.05.29 2:00 PM",
    endDate: "5:00 PM",
    deadLine: "23.05.27 11:59 PM",
    tag: ["그림", "예술", "워크샵"],
    like: true,
  },
  {
    meeting_id: 4,
    large_category: "학문/스터디",
    category: "프로그래밍 스터디",
    title: "코딩 부트캠프",
    address: "서울특별시 강서구 개화동로29길 60(방화동)",
    status: "모집중",
    startDate: "23.06.01 9:00 AM",
    endDate: "4:00 PM",
    deadLine: "23.05.31 6:00 PM",
    tag: ["코딩", "프로그래밍", "부트캠프"],
    like: false,
  },
  {
    meeting_id: 5,
    large_category: "요리/음식",
    category: "쿠킹 클래스 모임",
    title: "이탈리아 식생활",
    address: "서울특별시 동작구 동작대로27길 49(사당동)",
    status: "모집중",
    startDate: "23.06.05 11:00 AM",
    endDate: "1:00 PM",
    deadLine: "23.06.03 11:59 PM",
    tag: ["요리교실", "음식", "이탈리아"],
    like: true,
  },
  {
    meeting_id: 6,
    large_category: "학문/스터디",
    category: "영어 회화 스터디",
    title: "프랑스어 대화 모임",
    address: "전라남도 순천시 북정5길 73(매곡동)",
    status: "모집중",
    startDate: "23.06.08 7:00 PM",
    endDate: "9:00 PM",
    deadLine: "23.06.07 11:59 PM",
    tag: ["프랑스", "언어", "사교"],
    like: false,
  },
  {
    meeting_id: 7,
    large_category: "여행/문화탐방",
    category: "해외 여행 모임",
    title: "하이킹 여행: 에베레스트",
    address: "부산광역시 부산진구 엄광로406",
    status: "모집중",
    startDate: "23.06.10 8:00 AM",
    endDate: "4:00 PM",
    deadLine: "23.06.03 6:00 PM",
    tag: ["하이킹", "아웃도어", "여행"],
    like: true,
  },
  {
    meeting_id: 8,
    large_category: "스포츠/게임",
    category: "테니스 동호회",
    title: "주간 테니스 모임",
    address: "광주광역시 서구 군분로228번길 7-2(농성동)",
    status: "모집중",
    startDate: "23.05.15 10:00",
    endDate: "12:00",
    deadLine: "23.05.14 22:00",
    tag: ["테니스", "운동", "건강"],
    like: true,
  },
  {
    meeting_id: 9,
    large_category: "예술/문화",
    category: "음악 감상 모임",
    title: "음악 잼 세션",
    address: "서울특별시 구로구 구로동로38길 20(구로동)",
    status: "모집중",
    startDate: "23.05.17 19:00",
    endDate: "22:00",
    deadLine: "23.05.16 18:00",
    tag: ["잼 세션", "음악", "즉흥적인"],
    like: false,
  },
  {
    meeting_id: 10,
    large_category: "요리/음악",
    category: "쿠킹 클래스 모임",
    title: "스시 만들기 클래스",
    address: "광주광역시 남구 봉주2길 11(주월동)",
    status: "모집중",
    startDate: "23.05.18 14:00",
    endDate: "16:00",
    deadLine: "23.05.16 23:59",
    tag: ["요리", "음식", "일본"],
    like: true,
  },
  {
    meeting_id: 11,
    large_category: "예술/문화",
    category: "미술 전시 관람 모임",
    title: "드로잉 & 파티",
    address: "강원도 원주시 유원길 18(우산동)",
    status: "모집중",
    startDate: "23.05.19 18:30",
    endDate: "21:30",
    deadLine: "23.05.17 12:00",
    tag: ["그림", "예술", "소셜"],
    like: false,
  },
  {
    meeting_id: 12,
    large_category: "스포츠/게임",
    category: "산책 및 하이킹",
    title: "하이킹과 피크닉",
    address: "대구광역시 달서구 중흥로10길 21-6(송현동)",
    status: "모집중",
    startDate: "23.05.20 11:00",
    endDate: "14:00",
    deadLine: "23.05.18 21:00",
    tag: ["하이킹", "스포츠", "아웃도어"],
    like: true,
  },
  {
    meeting_id: 13,
    large_category: "요리/음식",
    category: "쿠킹 클래스 모임",
    title: "채식 요리 워크샵",
    address: "경기도 평택시 쇼핑로 36-14(신장동)",
    status: "모집중",
    startDate: "23.05.22 15:00",
    endDate: "17:00",
    deadLine: "23.05.20 12:00",
    tag: ["채식", "요리", "음식"],
    like: true,
  },
  {
    meeting_id: 14,
    large_category: "수공예",
    category: "도예 작업실 모임",
    title: "유리 공예 워크샵",
    address: "경기도 파주시 법원읍 사임당로 928-1",
    status: "모집중",
    startDate: "23.05.23 13:00",
    endDate: "16:00",
    deadLine: "23.05.20 18:00",
    tag: ["유리공예", "예술", "만들기"],
    like: false,
  },
  {
    meeting_id: 15,
    large_category: "스포츠/게임",
    category: "테니스 동호회",
    title: "주간 테니스 동호회",
    address: "경기도 양평군 양평읍 충신로 121",
    status: "모집중",
    startDate: "23.05.15 10:00",
    endDate: "12:00",
    deadLine: "23.05.14 22:00",
    tag: ["테니스", "스포츠", "건강"],
    like: false,
  },
  {
    meeting_id: 16,
    large_category: "예술/문화",
    category: "음악 감상 모임",
    title: "공원에서 재즈의 밤 행사",
    address: "경기도 포천시 가산면 방산길 46",
    status: "모집중",
    startDate: "23.05.22 19:00",
    endDate: "23:00",
    deadLine: "23.05.20 23:59",
    tag: ["재즈", "음악", "공연"],
    like: false,
  },
  {
    meeting_id: 17,
    large_category: "학문/스터디",
    category: "프로그래밍 스터디",
    title: "초보자를 위한 파이썬",
    address: "경상남도 진주시 명석면 광제산로833번길 24-5",
    status: "모집중",
    startDate: "23.05.18 18:00",
    endDate: "20:00",
    deadLine: "23.05.16 23:59",
    tag: ["파이썬", "프로그래밍", "교육"],
    like: false,
  },
  {
    meeting_id: 18,
    large_category: "요리/음식",
    category: "쿠킹 클래스 모임",
    title: "요리 클래스: 한식의 이해",
    address: "대전광역시 중구 방아미로66번길 149(침산동)",
    status: "모집중",
    startDate: "23.05.28 14:00",
    endDate: "16:00",
    deadLine: "23.05.26 23:59",
    tag: ["요리", "한식", "음식"],
    like: false,
  },
  {
    meeting_id: 19,
    large_category: "예술/문화",
    category: "미술 전시 관람 모임",
    title: "그리기 클래스: 풍경화",
    address: "부산광역시 남구 수영로39번가길 35(문현동)",
    status: "모집중",
    startDate: "23.05.19 16:00",
    endDate: "18:00",
    deadLine: "23.05.17 23:59",
    tag: ["그림", "예술", "교육"],
    like: false,
  },
  {
    meeting_id: 20,
    large_category: "수공예",
    category: "목공 예술 동아리",
    title: "원데이 클래스: 나무 깎기",
    address: "부산광역시 부산진구 진남로 300",
    status: "모집중",
    startDate: "23.05.21 10:00",
    endDate: "12:00",
    deadLine: "23.05.19 23:59",
    tag: ["목공", "워크샵", "원데이클래스"],
    like: false,
  },
  {
    meeting_id: 21,
    large_category: "스포츠/게임",
    category: "기타",
    title: "주말에 농구 한판 하실분",
    address: "경기도 양주시 백석읍 부흥로 439",
    status: "모집중",
    startDate: "23.05.16 14:00",
    endDate: "16:00",
    deadLine: "23.05.15 23:59",
    tag: ["농구", "스포츠", "건강"],
    like: false,
  },
  {
    meeting_id: 22,
    large_category: "예술/문화",
    category: "콘서트, 연극 관람 모임",
    title: "좋아하는 클래식 연주회",
    address: "경상남도 진주시 평거로156번길 14(신안동)",
    status: "모집중",
    startDate: "23.05.25 19:00",
    endDate: "22:00",
    deadLine: "23.05.23 23:59",
    tag: ["클래식", "음악", "콘서트"],
    like: false,
  },
];

export const showMeeting: ReceiveMeetingData = {
  meeting_id: 0,
  large_category: "스포츠/게임",
  category: "축구 클럽",
  title: "일요일 풋볼 게임",
  address: "경기도 남양주시 와부읍 석실로488번길 56-1",
  status: "모집중",
  startDate: "23.05.15 10:00 AM",
  endDate: "12:00 PM",
  deadLine: "23.05.14 10:00 PM",
  tag: ["풋볼", "운동", "건강"],
  like: true,
  error: false,
};
