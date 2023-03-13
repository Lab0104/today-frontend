import React from "react";
import { createPortal } from "react-dom";

export default function Portal({ selector, children }) {
  const rootElement = selector && document.querySelector(selector);
  return <>{rootElement ? createPortal(children, rootElement) : children}</>;
}
