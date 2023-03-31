/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

interface containerProps {
  children: React.ReactNode;
}

export default function FlexwrapContainer({ children }: containerProps) {
  return (
    <div
      css={css`
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 20px;
      `}
    >
      {children}
    </div>
  );
}
