/** @jsxImportSource @emotion/react */
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
`;

const Spinner = styled.div<{
  size?: number | undefined;
  top?: number | undefined;
  left?: number | undefined;
}>`
  box-sizing: border-box;
  position: absolute;
  top: ${({ top }) => (top ? top + "px" : "50%")};
  left: ${({ left }) => (left ? left + "px" : "50%")};
  width: ${({ size }) => (size ? size : "64")}px;
  height: ${({ size }) => (size ? size : "64")}px;
  margin-top: ${({ size }) => (size ? -(size / 2) : -32)}px;
  margin-left: ${({ size }) => (size ? -(size / 2) : -32)}px;
  border-radius: 50%;
  border: 4px solid lightgrey;
  border-top-color: blue;
  animation: ${spin} 0.8s linear infinite;
`;

export default function SpinnerPlaceHolder({
  size,
  top,
  left,
}: {
  size?: number;
  top?: number;
  left?: number;
}) {
  return (
    <Container>
      <Spinner size={size} top={top} left={left} />
    </Container>
  );
}
