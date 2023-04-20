/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const Container = styled.div`
  position: absolute;
  width: ${({ width }) => width || "465px"};
  height: auto;
  max-height: 710px;
  right: 102px;
  top: 20px;
  z-index: 10;
  border-radius: 10px;
  display: flex;
  flex-direction: column;

  background: #eee;
  box-shadow: 4px 5px 4px rgba(0, 0, 0, 0.3);
  padding-bottom: 20px;

  & .modalTitle {
    background: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 64px;

    padding: 20px 30px;
    border-bottom: 3px solid #9747ff;
    box-sizing: border-box;

    border-bottom: 3px solid #9747ff;
    border-radius: 10px 10px 0px 0px;
  }

  & .modalTitle h4 {
    margin: 0;
    font-size: 20px;
    font-weight: bold;
  }
`;

export const ExitButton = styled.button`
  height: 24px;
  font-size: 24px;

  background: none;
  color: black;
`;

export const Content = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
  background: #eee;
  overflow-y: scroll;
  padding: 10px 22.5px 0;

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
