/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { RiArrowDropLeftLine, RiArrowDropRightLine } from "react-icons/ri";
import { useEffect, useState, useCallback } from "react";

const Base = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Container = styled.div`
  position: relative;
`;

const ArrowButton = styled.button<{ pos: string }>`
  position: absolute;
  top: 0;
  height: 100%;
  z-index: 1;
  padding: 8px 12px;
  font-size: 45px;
  font-weight: bold;
  background-color: transparent;
  color: #fff;
  border: none;
  margin: 0;
  cursor: pointer;
  ${({ pos }) =>
    pos === "left"
      ? css`
          left: 0;
        `
      : css`
          right: 0;
        `}
`;

const CarouselList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  overflow: hidden;
  border-radius: 15px;
`;

const CarouselListItem = styled.li<{ activeIndex: number }>`
  width: 100%;
  flex: 1 0 100%;
  transform: translateX(-${({ activeIndex }) => activeIndex * 100}%);
  transition: 500ms ease;
  > img {
    width: 100%;
    height: fit-content;
  }
`;

const NavButton = styled.button<{ isActive: boolean }>`
  width: 4px;
  height: 4px;
  background-color: #000;
  opacity: ${({ isActive }) => (isActive ? 0.3 : 0.1)};
`;

const NavItem = styled.li`
  display: inline-block;
  margin-left: 2px;
  margin-right: 2px;
`;

const Nav = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 auto;
  display: flex;
  justify-content: center;
`;

const banners = [
  "images/kakao_login_buttons/kakao_login_large_wide.png",
  "images/kakao_login_buttons/kakao_login_large_wide.png",
  "images/kakao_login_buttons/kakao_login_large_wide.png",
  "images/kakao_login_buttons/kakao_login_large_wide.png",
  "images/kakao_login_buttons/kakao_login_large_wide.png",
  "images/kakao_login_buttons/kakao_login_large_wide.png",
];

export default function CardCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFocused, setIsFocused] = useState(false);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (activeIndex + 1) % banners.length);
  }, [activeIndex]);
  const handlePrev = () => {
    setActiveIndex((prev) =>
      prev === 0 ? prev - 1 + banners.length : prev - 1
    );
  };

  const handleMouseEnter = () => setIsFocused(true);
  const handleMouseLeave = () => setIsFocused(false);

  const goTo = (index: number) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    let interval: number | undefined;
    if (!isFocused) {
      interval = window.setInterval(handleNext, 3000);
    }
    return () => {
      window.clearInterval(interval);
    };
  }, [isFocused, handleNext]);

  return (
    <Base onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Container>
        <ArrowButton pos={"left"} onClick={handlePrev}>
          <RiArrowDropLeftLine />
        </ArrowButton>
        <CarouselList>
          {banners.map((banner, index) => (
            <CarouselListItem activeIndex={activeIndex} key={index}>
              <img src={banner} alt="이미지" />
            </CarouselListItem>
          ))}
        </CarouselList>
        <ArrowButton pos={"right"} onClick={handleNext}>
          <RiArrowDropRightLine />
        </ArrowButton>
      </Container>
      <Nav>
        {Array.from({ length: banners.length }).map((_, index) => (
          <NavItem key={index} onClick={() => goTo(index)}>
            <NavButton isActive={activeIndex === index} />
          </NavItem>
        ))}
      </Nav>
    </Base>
  );
}
