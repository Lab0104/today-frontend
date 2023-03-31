import React, { ReactNode } from "react";
import styled from "@emotion/styled";
import { CSSTransition } from "react-transition-group";

import Portal from "./Portal";
import "./Modal.css";

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
  max-width: 456px;
  position: relative;
  width: 100%;
`;

interface modalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  selector?: string;
}

export default function Modal({
  children,
  isOpen,
  onClose,
  selector,
}: modalProps) {
  return (
    <CSSTransition in={isOpen} timeout={300} classNames="modal" unmountOnExit>
      <Portal selector={selector}>
        <Overlay>
          <Dim onClick={onClose} />
          <Container>{children}</Container>
        </Overlay>
      </Portal>
    </CSSTransition>
  );
}
