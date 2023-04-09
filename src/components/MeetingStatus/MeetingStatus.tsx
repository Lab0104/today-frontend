/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { css } from "@emotion/react";

interface propsType {
  total: number | undefined;
  participant: number | undefined;
  deadline: string | undefined;
  currentTime: number;
}

const DAY_TO_MILLISECONDS = (day: number) => 86400000 * day;

export default function MeetingStatus({
  total,
  participant,
  deadline,
  currentTime,
}: propsType) {
  console.log("meetingStatus");
  const statusInnerHTML = (
    total: number | undefined,
    participant: number | undefined,
    deadline: string | undefined,
    currentTime: number
  ) => {
    if (
      total === undefined ||
      participant === undefined ||
      deadline === undefined ||
      currentTime === undefined
    )
      return "Error";

    const deadlineToNumber = new Date(deadline).getTime();

    if (total <= participant || currentTime >= deadlineToNumber) {
      return "모집마감";
    } else if (
      total - participant === 1 ||
      deadlineToNumber - currentTime <= DAY_TO_MILLISECONDS(1)
    ) {
      return "마감임박";
    } else {
      const dayCount = Math.floor(
        (deadlineToNumber - currentTime) / DAY_TO_MILLISECONDS(1)
      );
      return `D-${dayCount} 모집중`;
    }
  };
  const status = statusInnerHTML(total, participant, deadline, currentTime);
  return <Status status={status}>{status}</Status>;
}

const Status = styled.span<{
  status: string;
}>`
  padding: 0 10px;
  border-radius: 15px;
  font-size: 12px;
  font-weight: 700;
  color: #fff;

  ${({ status }) => {
    const value = status;
    if (value === "모집마감")
      return css`
        background-color: #707070;
      `;
    else if (value === "마감임박")
      return css`
        background-color: #faab07;
      `;
    else
      return css`
        background-color: #9747ff;
      `;
  }}
`;
