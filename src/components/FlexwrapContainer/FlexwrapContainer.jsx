import React from "react";
import "./FlexwrapContainer.css";

export default function FlexwrapContainer({
  children,
  className = "",
  style = {},
}) {
  return (
    <div className={"flex-wrap-container " + className} style={style}>
      {children}
    </div>
  );
}
