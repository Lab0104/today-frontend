import React, { ReactNode } from "react";
import styled from "@emotion/styled";
import { CSSTransition } from "react-transition-group";

import { useDispatch } from "react-redux";
import { closeModal } from "reducer/MainModalSlice";

import Portal from "./Portal";
import "./Modal.scss";

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
  width: 100%;
  max-width: 456px;
  min-width: 375px;
  position: relative;
`;

interface modalProps {
  children: ReactNode;
  isOpen: boolean;
  selector?: string;
}

export default function Modal({ children, isOpen, selector }: modalProps) {
  const dispatch = useDispatch();
  return (
    <CSSTransition in={isOpen} timeout={300} classNames="modal" unmountOnExit>
      <Portal selector={selector}>
        <Overlay>
          <Dim onClick={() => dispatch(closeModal())} />
          <Container>{children}</Container>
        </Overlay>
      </Portal>
    </CSSTransition>
  );
}
