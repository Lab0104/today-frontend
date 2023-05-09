import React from "react";
import styled from "@emotion/styled";

const Container = styled.div`
  width: 100%;
  padding-top: 7%;
  background-color: #e5e5e5;
  background-image: url("/images/advertisement/advertisement1.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

export default function Advertisement() {
  return <Container />;
}
