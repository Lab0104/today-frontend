import styled from "@emotion/styled";
import { css } from "@emotion/react";

const ContainerDefaultOptions = css`
  box-sizing: border-box;
  display: flex;
  min-height: 370px;
  flex-wrap: wrap;
  gap: 40px;
  justify-content: center;
  color: #000;
  text-align: left;
`;

const FooterDescriptionContainer = styled.div<{ background: string }>`
  width: 100%;
  padding: 40px;
  background-color: ${({ background }) => background};
  ${ContainerDefaultOptions}
`;

const Title = styled.span`
  font-size: 25px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  flex-basis: 1;
`;
const DescriptionContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  flex-grow: 2;
  flex-basis: 1;
`;
const Description = styled.div`
  flex-grow: 1;
  flex-basis: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  & > p {
    width: 100%;
    font-size: 20px;
    font-weight: 600;
    color: #000;
    margin: 0 0 20px 0;
  }
  & > span {
    font-size: 16px;
    line-height: 30px;
  }
`;

export default function FooterDescription() {
  return (
    <FooterDescriptionContainer background={"rgba(170, 170, 170, 0.3)"}>
      <Title>
        오늘
        <br />
        하루에는
      </Title>
      <DescriptionContainer>
        <Description>
          <p>124 개의 모임이 열리고 있어요</p>
          <span>
            가장 많이 열리는 모임은 스터디 모임이에요.
            <br />
            124개의 모임 중 약 57%로 70개의 모임이 스터디 모임이에요.
            <br />
            두 번째로 많은 모임은 식사 모임이네요.
            <br />
            124개의 모임 중 약 21%로 26개의 식사 모임이 있어요.
          </span>
        </Description>
        <Description>
          <p>언제든지 모임을 만들어 보세요</p>
          <span>
            가장 많이 열리는 모임은 스터디 모임이에요.
            <br />
            124개의 모임 중 약 57%로 70개의 모임이 스터디 모임이에요.
            <br />
            두 번째로 많은 모임은 식사 모임이네요.
            <br />
            124개의 모임 중 약 21%로 26개의 식사 모임이 있어요.
          </span>
        </Description>
      </DescriptionContainer>
    </FooterDescriptionContainer>
  );
}
