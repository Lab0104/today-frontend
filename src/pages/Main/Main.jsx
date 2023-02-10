import React, { useState } from "react";
import { useQuery } from "react-query";
import FlexColumnContainer from "../../components/FlexColumnContainer/FlexColumnContainer";
import FlexwrapContainer from "../../components/FlexwrapContainer/FlexwrapContainer";
import Meetings from "../../components/Meetings/Meetings";
import Skeleton from "../../components/Skeleton/Skeleton";
import "./Main.css";

const Placeholder = () => {
  return (
    <FlexColumnContainer style={{ width: "100%" }}>
      <Skeleton width={100} height={30} rounded />
      <FlexwrapContainer>
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton
            key={index}
            style={{ width: "30%", height: "100px" }}
            rounded
          />
        ))}
      </FlexwrapContainer>
    </FlexColumnContainer>
  );
};

function Main() {
  const [meetings, setMeetings] = useState(null);
  const { isLoading, error } = useQuery(
    "meeting",
    async () => {
      await fetch("/meetings")
        .then((res) => res.json())
        .then((json) => {
          setMeetings((prev) => json);
        });
    },
    {
      refetchOnWindowFocus: false, // 윈도우 포커스 시 재실행 여부
      retry: 0, // 실패 시 재호출 횟수
    }
  );
  if (isLoading)
    return Array.from({ length: 3 }).map((_, index) => (
      <Placeholder key={index} />
    ));
  if (error) return <div>404 Not Found</div>;

  return (
    <>
      {isLoading
        ? Array.from({ length: 3 }).map((_, index) => (
            <Placeholder key={index} />
          ))
        : meetings &&
          meetings.map((meeting) => (
            <Meetings
              key={meeting.title}
              title={meeting.title}
              meetingList={meeting.list}
            />
          ))}
    </>
  );
}

export default Main;
