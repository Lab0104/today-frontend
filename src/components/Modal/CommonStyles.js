/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const Container = styled.div`
  position: absolute;
  width: ${({ width }) => width || "465px"};
  height: 800px;
  right: 102px;
  top: 20px;
  z-index: 10;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  background: #fff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.3);
`;

export const ExitButton = styled.button`
  position: absolute;
  height: 24px;
  width: 24px;
  right: 0;
  top: 0;
  margin: 21.28px;
  background: none;
  color: black;
  padding: 0;
  font-size: 24px;
`;

export const Content = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  background: #eee;
  overflow-y: scroll;
  padding: 10px 5px 0;

  -ms-overflow-style: none; /* 인터넷 익스플로러 */
  scrollbar-width: none; /* 파이어폭스 */

  &::-webkit-scrollbar {
    display: none; /* 크롬, 사파리, 오페라, 엣지 */
  }
`;

export const Icon = styled.i`
  position: absolute;
  left: 10px;
  font-size: 30px;
  top: 50%;
  transform: translate(0%, -50%);
`;
