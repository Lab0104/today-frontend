/** @jsxImportSource @emotion/react */
import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

const green = css`
  color: #227b3d;
`;
const red = css`
  color: red;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Title = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-size: 20px;
  font-weight: 700;
`;
const Close = styled.span`
  cursor: pointer;
`;
const Condition = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  text-align: left;
  font-size: 14px;
`;

export default function ModalMeeting({ list, onClose }) {
  console.log(list);
  return (
    <Container>
      <Header>
        <span>아이콘</span>
        <Title>
          {list.title} ({list.participant}/{list.total})
          <div style={{ fontSize: "16px" }}>{list.subTitle}</div>
        </Title>
        <Close onClick={onClose}>닫기</Close>
      </Header>
      <Condition>
        <div>{list.address}</div>
        <div>
          {list.status ? (
            <span css={green}>모집중</span>
          ) : (
            <span css={red}>모집종료</span>
          )}{" "}
          | {list.deadline}
        </div>
      </Condition>
    </Container>
  );
}
