import React from "react";
import "./FlexColumnContainer.css";

export default function MeetingContainer({
  children,
  className = "",
  style = {},
}) {
  return (
    <div className={"flex-column-container " + className} style={style}>
      {children}
    </div>
  );
}
