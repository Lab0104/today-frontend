import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
// import { CSSTransition } from "react-transition-group";
import { useDispatch } from "react-redux";
import { closeModal } from "../../../reducer/ModalSlice";

import "../Modal.scss";
import MeetingModalContent from "components/Modal/MeetingModal/MeetingModalContent";

const modalOpenKeyFrame = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;
const modalCloseKeyFrame = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const Overlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${({ isOpen }) =>
      isOpen ? modalOpenKeyFrame : modalCloseKeyFrame}
    300ms ease-in-out;
`;

const Dim = styled.div`
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Container = styled.div`
  box-sizing: border-box;
  width: 90%;
  max-width: 400px;
  min-width: 350px;
  min-height: 500px;
  padding: 20px;
  border-radius: 20px;
  position: relative;
  background-color: white;
`;

interface modalProps {
  isOpen: boolean;
  selector?: string;
}

export default function MeetingCardModal({ isOpen }: modalProps) {
  const dispatch = useDispatch();
  return (
    <Overlay isOpen={isOpen}>
      <Dim onClick={() => dispatch(closeModal())} />
      <Container>
        <MeetingModalContent />
      </Container>
    </Overlay>
  );
}
