/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import MeetingCard from "../MeetingCard/MeetingCard";

const CarouselContainer = styled.div`
  display: flex;
  width: 270px;
  margin: 40px 0;
  justify-content: left;
  gap: 20px;
  transform: translateX(
    -${({ activeIndex, itemCount }) => (activeIndex === 0 ? activeIndex : activeIndex * itemCount * 100)}%
  );
  transition: 200ms ease;
`;

export default function Meetings({
  count,
  meetingList,
  onClickModal,
  itemCount = 1,
  activeIndex = 0,
}) {
  return (
    <CarouselContainer activeIndex={activeIndex} itemCount={itemCount}>
      {meetingList &&
        meetingList.map((meeting, index) => (
          <MeetingCard
            key={index}
            id={meeting.id}
            onClick={() => onClickModal(count, meeting.id - 1)}
            status={meeting.status}
            title={meeting.title}
            participant={meeting.participant}
            total={meeting.total}
            subTitle={meeting.subTitle}
            address={meeting.address}
            deadline={meeting.deadline}
            like={meeting.like}
          ></MeetingCard>
        ))}
    </CarouselContainer>
  );
}
