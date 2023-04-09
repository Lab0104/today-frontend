import MeetingStatus from "components/MeetingStatus/MeetingStatus";
import "./MeetingCard.css";

interface meetingProps {
  id: number;
  onClick: () => void;
  title: string;
  participant: number;
  total: number;
  address: string;
  deadline: string;
  category: string;
  like: boolean;
  currentTime: number;
}

export default function MeetingCard({
  id,
  onClick,
  currentTime,
  title = "제목",
  participant = 0,
  total = 0,
  address = "주소",
  deadline = "마감일",
  category = "대메뉴",
  like = false,
}: meetingProps) {
  return (
    <div className="meeting">
      <div className="meeting-category">
        <MeetingStatus
          total={total}
          participant={participant}
          deadline={deadline}
          currentTime={currentTime}
        />
        <span>{category} · 소분류</span>
        <span
          className={
            like
              ? "material-symbols-outlined like"
              : "material-symbols-outlined"
          }
          onClick={() => {
            like = !like;
          }}
        >
          favorite
        </span>
      </div>
      <span className="meeting-title" onClick={onClick}>
        {title}
      </span>
      <span>{address}</span>
      <span>{deadline}</span>
    </div>
  );
}
