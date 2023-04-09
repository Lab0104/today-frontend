/** @jsxImportSource @emotion/react */
import React from "react";
import styled from "@emotion/styled";
import MeetingStatus from "components/MeetingStatus/MeetingStatus";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Title = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-size: 20px;
  font-weight: 700;
`;
const Close = styled.span`
  cursor: pointer;
`;

interface modalProps {
  list: {
    meet_id: number;
    title: string;
    maximum_participants: number;
    registered_participants_count: number;
    address: string;
    deadline: string;
    date: string;
    category: string;
    like: boolean;
  } | null;
  onClose: () => void;
  currentTime: number;
}

export default function ModalMeeting({
  list,
  onClose,
  currentTime,
}: modalProps) {
  return (
    <Container>
      <Header>
        <span>아이콘</span>
        <Title>
          {list?.title} ({list?.registered_participants_count}/
          {list?.maximum_participants})
        </Title>
        <Close onClick={onClose}>닫기</Close>
      </Header>
      <span>{list?.address}</span>
      <MeetingStatus
        total={list?.maximum_participants}
        participant={list?.registered_participants_count}
        deadline={list?.deadline}
        currentTime={currentTime}
      />
    </Container>
  );
}
