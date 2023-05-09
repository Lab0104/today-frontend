import React from "react";
import styled from "@emotion/styled";

const Container = styled.div`
  width: 100%;
  height: 100px;
  background-color: #e5e5e5;
  background-image: url("/images/advertisement/advertisement.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

export default function Advertisement() {
  return <Container />;
}
