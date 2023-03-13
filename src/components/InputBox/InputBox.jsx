/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export default function InputBox({
  children = "",
  size = ["auto", "auto"],
  type = "text",
  value = "",
  onChange = {},
  style = {},
}) {
  return (
    <>
      <input
        type={type}
        placeholder={children}
        value={value}
        style={style}
        onChange={onChange}
        css={css`
          width: ${size[0]};
          height: ${size[1]};
          border-radius: 5px;
          border: 1px solid #e8e8e8;
          padding-left: 10px;
          box-sizing: border-box;
        `}
      ></input>
    </>
  );
}
