/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import MeetingCard from "../MeetingCard/MeetingCard";

const CarouselContainer = styled.div<{
  activeIndex: number;
  itemCount: number;
}>`
  border-box: box-sizing;
  display: flex;
  width: 270px;
  margin: 40px 5px;
  justify-content: left;
  gap: 20px;
  transform: translateX(
    -${({ activeIndex, itemCount }) => (activeIndex === 0 ? activeIndex : activeIndex * itemCount * 100)}%
  );
  transition: 200ms ease;
`;
export type listType = {
  meet_id: number;
  title: string;
  maximum_participants: number;
  registered_participants_count: number;
  address: string;
  deadline: string;
  date: string;
  category: string;
  like: boolean;
};
interface meetingProps {
  count: number;
  meetingList: listType[];
  onClickModal: (count: number, id: number) => void;
  itemCount: number;
  activeIndex: number;
  currentTime: number;
}

export default function Meetings({
  count,
  meetingList,
  onClickModal,
  currentTime,
  itemCount = 1,
  activeIndex = 0,
}: meetingProps) {
  return (
    <CarouselContainer activeIndex={activeIndex} itemCount={itemCount}>
      {meetingList &&
        meetingList.map((meeting, index) => (
          <MeetingCard
            key={index}
            id={meeting.meet_id}
            onClick={() => onClickModal(count, meeting.meet_id - 1)}
            title={meeting.title}
            participant={meeting.registered_participants_count}
            total={meeting.maximum_participants}
            address={meeting.address}
            deadline={meeting.deadline}
            category={meeting.category}
            like={meeting.like}
            currentTime={currentTime}
          ></MeetingCard>
        ))}
    </CarouselContainer>
  );
}
