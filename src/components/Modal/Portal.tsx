import React, { ReactNode } from "react";
import { createPortal } from "react-dom";

interface portalProps {
  selector?: string;
  children: ReactNode;
}

export default function Portal({ selector, children }: portalProps) {
  const rootElement = selector && document.querySelector(selector);
  return <>{rootElement ? createPortal(children, rootElement) : children}</>;
}
