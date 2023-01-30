import React, { useState, useEffect } from "react";
import FlexColumnContainer from "../../components/FlexColumnContainer/FlexColumnContainer";
import FlexwrapContainer from "../../components/FlexwrapContainer/FlexwrapContainer";
import MeetingCard from "../../components/MeetingCard/MeetingCard";
import "./Main.css";

function Main() {
  const [editorMeetings, setEditorMeetings] = useState(null);
  const [advertisementMeetings, setAdvertisementMeetings] = useState(null);

  const req = (url, setState) => {
    fetch(url)
      .then((res) => res.json())
      .then((json) => setState(json.meetingList))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    req("/meetings/editor", setEditorMeetings);
    req("/meetings/advertisement", setAdvertisementMeetings);
  }, []);

  return (
    <>
      <FlexColumnContainer>
        <span className="container-title">Editor's Pick</span>
        <FlexwrapContainer className="editor-pick">
          {editorMeetings &&
            editorMeetings.map((meeting) => (
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
          {advertisementMeetings &&
            advertisementMeetings.map((meeting, index) => (
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
