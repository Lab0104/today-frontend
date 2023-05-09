import React from "react";
import styled from "@emotion/styled";
import { CSSTransition } from "react-transition-group";

import { useDispatch } from "react-redux";
import { closeModal } from "../../../reducer/ModalSlice";

import "../Modal.scss";
import MeetingModalContent from "components/Modal/MeetingModal/MeetingModalContent";

const Overlay = styled.div`
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
`;

const Dim = styled.div`
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  botton: 0;
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
    <CSSTransition in={isOpen} timeout={300} classNames="modal" unmountOnExit>
      <Overlay>
        <Dim onClick={() => dispatch(closeModal())} />
        <Container>
          <MeetingModalContent />
        </Container>
      </Overlay>
    </CSSTransition>
  );
}
