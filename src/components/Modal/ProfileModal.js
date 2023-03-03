/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import React from "react";

const ProfileModal = () => {
  return <div css={container}>ProfileModal</div>;
};

const container = css`
  position: absolute;
  width: 30vw;
  height: 75vh;
  right: 102px;
  top: 20px;
  overflow-y: scroll;
  z-index: 10;
  border-radius: 10px;

  background: #ffffff;

  -ms-overflow-style: none; /* 인터넷 익스플로러 */
  scrollbar-width: none; /* 파이어폭스 */

  &::-webkit-scrollbar {
    display: none; /* 크롬, 사파리, 오페라, 엣지 */
  }
`;

export default ProfileModal;
