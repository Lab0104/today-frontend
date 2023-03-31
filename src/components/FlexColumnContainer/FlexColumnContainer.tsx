/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

interface containerProps {
  children: React.ReactNode;
  style: object;
}

export default function MeetingContainer({
  children,
  style = {},
}: containerProps) {
  return (
    <div
      style={style}
      css={css`
        display: flex;
        flex-direction: column;
        gap: 40px;
        margin: 40px 0;
      `}
    >
      {children}
    </div>
  );
}
