/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { RiArrowDropLeftLine, RiArrowDropRightLine } from "react-icons/ri";
import { useEffect, useState, useCallback } from "react";

import "./Carousel.scss";

const CarouselListItem = styled.li<{ activeIndex: number }>`
  width: 100%;
  flex: 1 0 100%;
  transform: translateX(-${({ activeIndex }) => activeIndex * 100}%);
  transition: 200ms ease;
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

const banners = [
  "images/kakao_login_buttons/kakao_login_large_wide.png",
  "images/kakao_login_buttons/kakao_login_large_wide.png",
  "images/kakao_login_buttons/kakao_login_large_wide.png",
  "images/kakao_login_buttons/kakao_login_large_wide.png",
  "images/kakao_login_buttons/kakao_login_large_wide.png",
  "images/kakao_login_buttons/kakao_login_large_wide.png",
];

export default function Carousel() {
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
    <div
      className="carousel-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="content">
        <button className="leftArrowButton" onClick={handlePrev}>
          <RiArrowDropLeftLine style={{ color: "black" }} />
        </button>
        <ul className="itemList">
          {banners.map((banner, index) => (
            <CarouselListItem activeIndex={activeIndex} key={index}>
              <img src={banner} alt="이미지" />
            </CarouselListItem>
          ))}
        </ul>
        <button className="rightArrowButton" onClick={handleNext}>
          <RiArrowDropRightLine />
        </button>
      </div>
      <ul className="nav">
        {Array.from({ length: banners.length }).map((_, index) => (
          <li className="navItem" key={index} onClick={() => goTo(index)}>
            <NavButton isActive={activeIndex === index} />
          </li>
        ))}
      </ul>
    </div>
  );
}
