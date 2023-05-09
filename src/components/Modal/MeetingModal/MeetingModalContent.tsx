/** @jsxImportSource @emotion/react */
import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { useSelector, useDispatch } from "react-redux";
import { IoChevronBack } from "react-icons/io5";
import { BsFillPeopleFill, BsMap, BsChatDots } from "react-icons/bs";
import { MdDateRange } from "react-icons/md";
import { CiTimer } from "react-icons/ci";

import { closeModal } from "../../../reducer/ModalSlice";
import LikeButton from "components/MeetingCard/LikeButton";
import { TypeModalState } from "mainPageTypes";
import { TypeUser } from "userTypes";

import { getCurrentTimeToNumber, DAY_TO_MILLISECOND } from "utils/time";

const backButtonStyle = css`
  cursor: pointer;
`;

export default function ModalMeeting() {
  const dispatch = useDispatch();
  const { isLogged } = useSelector((state: { user: TypeUser }) => state.user);
  const { modalContent } = useSelector(
    (state: { mainModal: TypeModalState }) => state.mainModal
  );

  const currentTime = getCurrentTimeToNumber();

  const meetingStatus = () => {
    if (modalContent) {
      const { maximum_participants, registered_participants_count, deadline } =
        modalContent;

      if (
        maximum_participants === undefined ||
        registered_participants_count === undefined ||
        deadline === undefined ||
        currentTime === undefined
      )
        return "Error";

      const deadlineToNumber = new Date(deadline).getTime();

      if (
        maximum_participants <= registered_participants_count ||
        currentTime >= deadlineToNumber
      ) {
        return "모집마감";
      } else if (
        maximum_participants - registered_participants_count === 1 ||
        deadlineToNumber - currentTime <= DAY_TO_MILLISECOND
      ) {
        return "마감임박";
      } else {
        return `모집중`;
      }
    }
    return "Error";
  };
  return (
    <>
      {modalContent ? (
        <Container>
          <Header>
            <BackButton>
              <IoChevronBack
                css={backButtonStyle}
                onClick={() => dispatch(closeModal())}
              />
            </BackButton>
            <Title>
              <h3>{modalContent.title}</h3>
              <span>{Object.keys(modalContent.category)[0]}</span>
            </Title>
            <UserIcon />
          </Header>
          <MeetingOptions>
            <PeopleAndDate>
              <span>
                <BsFillPeopleFill />{" "}
                {modalContent.registered_participants_count} /{" "}
                {modalContent.maximum_participants}
              </span>
              <span>
                <MdDateRange /> {modalContent.date.split("T").join(" ")}
              </span>
            </PeopleAndDate>
            <span>
              <BsMap /> {modalContent.address}
            </span>
            <MeetingDate value={meetingStatus()}>
              <CiTimer />
              <span>{meetingStatus()}</span>
              <span> · </span>
              <span>{modalContent.deadline.split("T").join(" ")} 까지</span>
            </MeetingDate>
          </MeetingOptions>
          <Content>
            {modalContent.content?.split("\n\n").map((item, idx) => (
              <span key={idx}>{item}</span>
            ))}
          </Content>
          <Footer isLogged={isLogged}>
            <button>참가하기</button>

            {isLogged && (
              <button>
                <LikeButton likeProp={modalContent?.like} />
              </button>
            )}

            <button>
              <BsChatDots />
            </button>
          </Footer>
        </Container>
      ) : (
        <h1>Not Found 404</h1>
      )}
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Header = styled.div`
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #9747ff;
  padding-bottom: 15px;
`;

const BackButton = styled.div`
  width: 45px;
  display: flex;
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  & h3 {
    margin: 0;
  }
  & span {
    font-size: 14px;
    color: #474747;
  }
`;

const UserIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: yellow;
  border: 1px solid black;
`;

const MeetingOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;

  & span {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 14px;
  }
`;

const PeopleAndDate = styled.div`
  display: flex;
  justify-content: space-between;
`;

const MeetingDate = styled.div<{ value: string }>`
  display: flex;
  gap: 5px;
  align-items: center;

  & span:first-of-type {
    color: ${({ value }) => {
      switch (value) {
        case "모집중":
          return "#9747ff";
        case "마감임박":
          return "#faab07";
        case "모집마감":
          return "#707070";
        default:
          return "#000000";
      }
    }};
  }
`;

const Content = styled.div`
  max-height: 150px;
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px 0;
  border-top: 2px solid #9747ff;
  font-size: 14px;

  overflow-y: scroll;
  -ms-overflow-style: none; /* 인터넷 익스플로러 */
  scrollbar-width: none; /* 파이어폭스 */
  &::-webkit-scrollbar {
    display: none; /* 크롬, 사파리, 오페라, 엣지 */
  }
`;

const Footer = styled.div<{ isLogged: boolean }>`
  display: flex;
  gap: 10px;

  & button {
    min-width: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    background-color: #9747ff;
    border-radius: 5px;
  }
  & button:first-of-type {
    width: calc(100% - ${({ isLogged }) => (isLogged ? 110 : 55)}px);
  }
  & button:nth-of-type(2) {
    font-size: 20px;
  }
  & button:last-of-type {
    font-size: 20px;
  }
`;
