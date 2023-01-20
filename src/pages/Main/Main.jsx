import React from "react";
import FlexColumnContainer from "../../components/FlexColumnContainer/FlexColumnContainer";
import FlexwrapContainer from "../../components/FlexwrapContainer/FlexwrapContainer";
import MeetingCard from "../../components/MeetingCard/MeetingCard";
import { meetingList } from "../../components/MeetingCard/meetingList";
import "./Main.css";

function Main() {
  return (
    <>
      <FlexColumnContainer>
        <span className="container-title">Editor's Pick</span>
        <FlexwrapContainer className="editor-pick">
          {meetingList.map((meeting) => (
            <MeetingCard
              key={meeting.id}
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
        <hr />
      </FlexColumnContainer>
      <FlexColumnContainer>
        <span className="container-title">광고 탭</span>
        <FlexwrapContainer className="advertise">
          {meetingList.map((meeting) => (
            <MeetingCard
              key={meeting.id}
              id={meeting.id}
              title={meeting.title}
              participant={meeting.participant}
              total={meeting.total}
              subTitle={meeting.subTitle}
              contents={meeting.contents}
              like={meeting.like}
            ></MeetingCard>
          ))}
          <MeetingCard id={5}></MeetingCard>
          <MeetingCard id={6}></MeetingCard>
        </FlexwrapContainer>
        <hr />
      </FlexColumnContainer>
      <FlexColumnContainer>
        <span className="container-title">이런 모임은 어때요?</span>
        <FlexwrapContainer className="recommend">
          <MeetingCard id={1}></MeetingCard>
          <MeetingCard id={2}></MeetingCard>
        </FlexwrapContainer>
      </FlexColumnContainer>
    </>
  );
}

export default Main;
