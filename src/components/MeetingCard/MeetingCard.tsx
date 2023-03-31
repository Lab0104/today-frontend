import React from "react";
import styled from "@emotion/styled";
import "./MeetingCard.css";

const GreenSpan = styled.span`
  color: #227b3d;
`;
const RedSpan = styled.span`
  color: red;
`;

interface meetingProps {
  id: number;
  onClick: () => void;
  status: boolean;
  title: string;
  participant: number;
  total: number;
  subTitle: string;
  address: string;
  deadline: string;
  like: boolean;
}

export default function MeetingCard({
  id,
  onClick,
  status,
  title = "제목",
  participant = 0,
  total = 0,
  subTitle = "소제목",
  address = "주소",
  deadline = "마감일",
  like = false,
}: meetingProps) {
  return (
    <div className="meeting">
      <div className="meeting-header">
        <div className="meeting-title">
          <span className="main-title" onClick={onClick}>
            {title} ({participant}/{total})
          </span>
          <span className="sub-title">{subTitle}</span>
        </div>
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
      <hr />
      <div className="meeting-contents">
        <span>{address}</span>
        <span>
          {status ? <GreenSpan>모집중</GreenSpan> : <RedSpan>모집마감</RedSpan>}
          &nbsp; | &nbsp;
          {deadline} - 모집마감
        </span>
      </div>
    </div>
  );
}
