import ChatModal from "./ChatModal";
import ChatInModal from "./ChatInModal";
import ProfileModal from "./ProfileModal";
import AddModal from "./AddModal";
import { selectModal } from "../../store/ModalSlice";
import { useSelector } from "react-redux";

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
];

function GlobalModal() {
  // modal type을 string으로 받는다.
  const { modalType, isOpen } = useSelector(selectModal);
  if (!isOpen) return; //isOpen이 false일때 모달을 닫아줌

  const renderModal = () => {
    const findModal = modals.find((modal) => {
      return modal.type === modalType;
    });
    return findModal.component;
  };
  return <div>{renderModal()}</div>;
}

export default GlobalModal;
