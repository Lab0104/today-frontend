import ChatModal from "./ChatModal";
import ChatInModal from "./ChatInModal";
import ProfileModal from "./ProfileModal";
import InfoModal from "./InfoModal";
import NavModal from "./NavModal";
import AddModal from "./AddModal";
import FilterModal from "./FilterModal";
import { useAppSelector } from "../../hooks";

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
    type: "InfoModal",
    component: <InfoModal />,
  },
  {
    type: "LayersModal",
    component: <FilterModal />,
  },
];

function GlobalModal() {
  // modal type을 string으로 받는다.
  const { modalType, isOpen } = useAppSelector((state) => state.modal);
  if (!isOpen) return <></>; //isOpen이 false일때 모달을 닫아줌

  /** modal type에 해당하는 모달 component 반환 */
  const renderModal = () => {
    const findModal = modals.find((modal) => {
      return modal.type === modalType;
    });
    return findModal.component;
  };

  return <div>{renderModal()}</div>;
}

export default GlobalModal;
