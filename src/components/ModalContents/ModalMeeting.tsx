/** @jsxImportSource @emotion/react */
import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { useSelector, useDispatch } from "react-redux";
import { IoChevronBack } from "react-icons/io5";
import { BsFillPeopleFill, BsMap, BsChatDots } from "react-icons/bs";
import { MdDateRange } from "react-icons/md";
import { CiTimer } from "react-icons/ci";

import { closeModal } from "reducer/MainModalSlice";
import LikeButton from "components/MeetingCard/LikeButton";
import { TypeModalState } from "mainPageTypes";
import { TypeUser } from "userTypes";

const backButtonStyle = css`
  cursor: pointer;
`;

export default function ModalMeeting() {
  const dispatch = useDispatch();
  const { isLogged } = useSelector((state: { user: TypeUser }) => state.user);
  const { modalContent } = useSelector(
    (state: { mainModal: TypeModalState }) => state.mainModal
  );
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
              <span>{modalContent.sub_title}</span>
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
            <span>
              <CiTimer /> {modalContent.deadline.split("T").join(" ")}
            </span>
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
        ""
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

const Content = styled.div`
  max-height: 150px;
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px 0;
  font-size: 14px;
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
