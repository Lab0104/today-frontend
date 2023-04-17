import React from "react";
import MeetingStatus from "components/MeetingStatus/MeetingStatus";
import LikeButton from "./LikeButton";

import { useDispatch, useSelector } from "react-redux";
import { openModal, setModalContent } from "reducer/MainModalSlice";

import { TypeUser } from "userTypes";
import { TypeMeetingList } from "mainPageTypes";
import "./MeetingCard.scss";

interface meetingProps {
  list: TypeMeetingList;
  currentTime: number;
}

const MeetingCard = React.memo(({ list, currentTime }: meetingProps) => {
  const dispatch = useDispatch();
  const { isLogged } = useSelector((state: { user: TypeUser }) => state.user);
  console.log("meetingCard");
  const {
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
          <MeetingStatus
            total={maximum_participants}
            participant={registered_participants_count}
            deadline={deadline}
            currentTime={currentTime}
          />
          {isLogged && <LikeButton likeProp={list?.like} />}
        </div>
        <span className="title" onClick={openModalOnClick}>
          {title}
        </span>
        <div className="meeting-category">
          <span>{Object.keys(category)[0]}</span>
          <span>{Object.values(category)}</span>
        </div>
        <span>{address}</span>
        <span>{deadline.split("T").join(" ")}</span>
      </div>
    </>
  );
});

export default MeetingCard;
