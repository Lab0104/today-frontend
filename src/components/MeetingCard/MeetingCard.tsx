import React from "react";
import MeetingStatus from "components/MeetingStatus/MeetingStatus";
import LikeButton from "./LikeButton";

import { useSelector } from "react-redux";
import { setModalContent } from "reducer/MainModalSlice";

import { TypeUser } from "userTypes";
import { TypeMeetingList } from "mainPageTypes";
import "./MeetingCard.scss";

import { useAppDispatch } from "../../hooks";
import { openModal } from "../../reducer/ModalSlice";

interface meetingProps {
  list: TypeMeetingList;
  currentTime: number;
}

const MeetingCard = React.memo(({ list, currentTime }: meetingProps) => {
  const dispatch = useAppDispatch();
  const { isLogged } = useSelector((state: { user: TypeUser }) => state.user);
  console.log("meetingCard");
  const {
    meet_id,
    title,
    maximum_participants,
    registered_participants_count,
    address,
    deadline,
    category,
  } = list;

  const openModalOnClick = () => {
    dispatch(openModal({ modalType: "meetingModal" }));
    dispatch(setModalContent({ modalContent: { ...list } }));
  };

  return (
    <>
      <div className="meetingCard-container">
        <div className="meeting-header">
          <div className="header">
            <MeetingStatus
              total={maximum_participants}
              participant={registered_participants_count}
              deadline={deadline}
              currentTime={currentTime}
            />
            <span>{Object.keys(category)}</span>
          </div>

          {isLogged && <LikeButton meet_id={meet_id} likeProp={list?.like} />}
        </div>
        <span className="meeting-title" onClick={openModalOnClick}>
          {title}
        </span>
        <span>{address}</span>
        <span>{deadline.split("T").join(" ")}</span>
      </div>
    </>
  );
});

export default MeetingCard;
