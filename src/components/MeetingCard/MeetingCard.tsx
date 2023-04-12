import MeetingStatus from "components/MeetingStatus/MeetingStatus";
import LikeButton from "./LikeButton";

import { TypeMeetingList } from "mainPageTypes";
import "./MeetingCard.scss";

interface meetingProps {
  list: TypeMeetingList;
  currentTime: number;
  onClick: () => void;
  isLogged: boolean;
}

export default function MeetingCard({
  list,
  currentTime,
  onClick,
  isLogged,
}: meetingProps) {
  const {
    title,
    maximum_participants,
    registered_participants_count,
    address,
    deadline,
    category,
  } = list;

  return (
    <div className="meetingCard-container">
      <div className="category">
        <MeetingStatus
          total={maximum_participants}
          participant={registered_participants_count}
          deadline={deadline}
          currentTime={currentTime}
        />
        <span>{category} · 소분류</span>
        {isLogged && <LikeButton likeProp={list?.like} />}
      </div>
      <span className="title" onClick={onClick}>
        {title}
      </span>
      <span>{address}</span>
      <span>{deadline.split("T").join(" ")}</span>
    </div>
  );
}
