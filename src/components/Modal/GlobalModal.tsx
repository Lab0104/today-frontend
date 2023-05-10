import ChatModal from "./ChatModal/ChatModal";
import ChatInModal from "./ChatModal/ChatInModal";
import ProfileModal from "./ProfileModal/ProfileModal";
import NavModal from "./NavModal/NavModal";
import AddModal from "./AddModal/AddModal";
import FilterModal from "./FilterModal/FilterModal";
import MeetingCardModal from "./MeetingModal/MeetingCardModal";
import SideNavModal from "./SideNavModal/SideNavModal";
import { useAppSelector } from "../../hooks";
import NotificationModal from "./NotificationModal/NotificationModal";

function GlobalModal() {
  // modal type을 string으로 받는다.
  const { modalType, isOpen } = useAppSelector((state) => state.modal);

  const modals = [
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
  ];

  /* modal type에 해당하는 모달 component 반환 */
  const renderModal = () => {
    const findModal = modals.find((modal) => {
      return modal.type === modalType;
    });
    return isOpen && findModal ? findModal.component : "";
  };

  return <div>{renderModal()}</div>;
}

export default GlobalModal;
