import React, { useMemo, Suspense, lazy } from "react";
import styled from "@emotion/styled";
import { useAppSelector } from "../../hooks";
import NotificationModal from "./NotificationModal/NotificationModal";
import SpinnerPlaceHolder from "components/Skeleton/placeholders/SpinnerPlaceHolder";
import "./Modal.scss";

const ChatModal = lazy(() => import("./ChatModal/ChatModal"));
const ChatInModal = lazy(() => import("./ChatModal/ChatInModal"));
const ProfileModal = lazy(() => import("./ProfileModal/ProfileModal"));
const NavModal = lazy(() => import("./NavModal/NavModal"));
const SideNavModal = lazy(() => import("./SideNavModal/SideNavModal"));
const AddModal = lazy(() => import("./AddModal/AddModal"));
const FilterModal = lazy(() => import("./FilterModal/FilterModal"));
const MeetingCardModal = lazy(() => import("./MeetingModal/MeetingCardModal"));

const animateTime = (modalType: string) => {
  if (modalType === "meetingModal" || modalType === "SideNavModal") {
    return "300ms";
  }
  return "0ms";
};

const Wrapper = styled.div<{ isOpen: boolean; modalType: string }>`
  visibility: ${({ isOpen }) => (isOpen ? "visible" : "hidden")};
  transition: all ${({ modalType }) => animateTime(modalType)} ease-in-out;
  pointer-events: ${({ isOpen }) => (isOpen ? "auto" : "none")};
`;

const GlobalModal = React.memo(() => {
  const { modalType, isOpen } = useAppSelector((state) => state.modal);

  const modals = useMemo(
    () => [
      {
        type: "ChatModal",
        component: <ChatModal />,
      },
      {
        type: "ChatInModal",
        component: <ChatInModal />,
      },
      {
        type: "ProfileModal",
        component: <ProfileModal />,
      },
      {
        type: "AddModal",
        component: <AddModal />,
      },
      {
        type: "NavModal",
        component: <NavModal />,
      },

      {
        type: "FilterModal",
        component: <FilterModal />,
      },
      {
        type: "NotificationModal",
        component: <NotificationModal />,
      },
      {
        type: "meetingModal",
        component: <MeetingCardModal isOpen={isOpen} />,
      },
      {
        type: "SideNavModal",
        component: <SideNavModal isOpen={isOpen} />,
      },
    ],
    [isOpen]
  );

  /* modal type에 해당하는 모달 component 반환 */
  const renderModal = () => {
    const findModal = modals.find((modal) => {
      return modal.type === modalType;
    });
    return findModal && findModal.component;
  };

  return (
    <Suspense fallback={<SpinnerPlaceHolder />}>
      <Wrapper isOpen={isOpen} modalType={modalType}>
        {renderModal()}
      </Wrapper>
    </Suspense>
  );
});

export default GlobalModal;
