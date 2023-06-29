import styled from "@emotion/styled";

const Container = styled.div<{ url: string }>`
  width: 100%;
  padding-top: 7%;
  background-color: #e5e5e5;
  background-image: url(${({ url }) => url});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

export default function Advertisement({ url }: { url: string }) {
  return <Container url={url} />;
}
