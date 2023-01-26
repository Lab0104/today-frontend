import React from "react";
import "./MeetingCard.css";

export default function MeetingCard({
  id,
  title = "제목",
  participant = 0,
  total = 0,
  subTitle = "소제목",
  contents = ["모임 내용"],
  like = false,
}) {
  return (
    <div className="meeting">
      <div className="meeting-header">
        <div className="meeting-title">
          <span className="main-title">
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
        >
          favorite
        </span>
      </div>
      <hr />
      <div className="meeting-contents">
        {contents.map((content, index) => (
          <span key={index}>{content}</span>
        ))}
      </div>
    </div>
  );
}
