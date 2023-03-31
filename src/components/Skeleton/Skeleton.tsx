/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { useMemo } from "react";

interface Props {
  width: number | undefined;
  height: number | undefined;
  animation?: boolean;
  circle?: boolean;
  rounded?: boolean;
  count?: number;
  widthUnit?: string;
  heightUnit?: string;
  color?: string;
}

const pulseKeyFrame = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
  100% {
    opacity: 1;
  }
`;
const pulseAnimation = css`
  animation: ${pulseKeyFrame} 1.5s ease-in-out infinite;
`;

const Base = styled.div<Props>`
  ${({ color }) => color && `background-color: ${color};`}
  ${({ rounded }) => rounded && `border-radius: 8px;`}
  ${({ circle }) => circle && `border-radius: 50%;`}
  ${({ width, height }) => (width || height) && "display: block;"}
  ${({ animation }) => animation && pulseAnimation}
  width: ${({ width, widthUnit }) =>
    width && widthUnit && `${width}${widthUnit};`}
  height: ${({ height, heightUnit }) =>
    height && heightUnit && `${height}${heightUnit};`}
`;
const Content = styled.span`
  opacity: 0;
`;

export default function Skeleton({
  animation = true,
  width,
  height,
  circle,
  rounded,
  count,
  widthUnit = "px",
  heightUnit = "px",
  color = "#F4F4F4",
}: Props) {
  const content = useMemo(
    () => [...Array({ length: count })].map(() => "-").join(""),
    [count]
  );

  return (
    <Base
      rounded={rounded}
      circle={circle}
      width={width}
      height={height}
      animation={animation}
      widthUnit={widthUnit}
      heightUnit={heightUnit}
      color={color}
    >
      <Content>{content}</Content>
    </Base>
  );
}
