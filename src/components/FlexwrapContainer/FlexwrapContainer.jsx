/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export default function FlexwrapContainer({ children, style = {} }) {
  return (
    <div
      style={style}
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
