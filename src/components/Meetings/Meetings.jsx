/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import FlexwrapContainer from "../FlexwrapContainer/FlexwrapContainer";
import FlexColumnContainer from "../FlexColumnContainer/FlexColumnContainer";
import MeetingCard from "../MeetingCard/MeetingCard";

export default function Meetings({ title, meetingList }) {
  return (
    <FlexColumnContainer>
      <span
        css={css`
          text-align: left;
          font-size: 20px;
          font-weight: 700;
        `}
      >
        {title}
      </span>
      <FlexwrapContainer>
        {meetingList &&
          meetingList.map((meeting, index) => (
            <MeetingCard
              key={index}
              id={meeting.id}
              title={meeting.title}
              participant={meeting.participant}
              total={meeting.total}
              subTitle={meeting.subTitle}
              contents={meeting.contents}
              like={meeting.like}
            ></MeetingCard>
          ))}
      </FlexwrapContainer>
    </FlexColumnContainer>
  );
}
