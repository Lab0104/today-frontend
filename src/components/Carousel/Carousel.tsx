/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { RiArrowDropLeftLine } from "@react-icons/all-files/ri/RiArrowDropLeftLine";
import { RiArrowDropRightLine } from "@react-icons/all-files/ri/RiArrowDropRightLine";
import React, { useEffect, useState, useCallback } from "react";

import "./Carousel.scss";

const items = [
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

  const onNextClick = useCallback(() => {
    setActiveIndex((prev) => (activeIndex + 1) % items.length);
  }, [activeIndex]);
  const onPrevClick = () => {
    setActiveIndex((prev) => (prev === 0 ? prev - 1 + items.length : prev - 1));
  };
  const onNavIndexClick = (index: number) => {
    setActiveIndex(index);
  };

  const onMouseFocus = (isFocused: boolean) => setIsFocused(isFocused);

  useEffect(() => {
    let interval: number | undefined;
    if (!isFocused) {
      interval = window.setInterval(onNextClick, 3000);
    }
    return () => {
      window.clearInterval(interval);
    };
  }, [isFocused, onNextClick]);

  return (
    <div
      className="carousel-container"
      onMouseEnter={() => onMouseFocus(true)}
      onMouseLeave={() => onMouseFocus(false)}
    >
      <div className="content">
        <button
          aria-label="carousel move left"
          className="leftArrowButton"
          onClick={onPrevClick}
        >
          <RiArrowDropLeftLine style={{ color: "black" }} />
        </button>
        <ul className="itemList">
          {items.map((item, index) => (
            <CarouselListItem activeIndex={activeIndex} key={index}>
              <img src={item} alt="이미지" />
            </CarouselListItem>
          ))}
        </ul>
        <button
          aria-label="carousel move right"
          className="rightArrowButton"
          onClick={onNextClick}
        >
          <RiArrowDropRightLine />
        </button>
      </div>
      <ul className="nav">
        {Array.from({ length: items.length }).map((_, index) => (
          <li
            className="navItem"
            key={index}
            onClick={() => onNavIndexClick(index)}
          >
            <NavButton
              aria-label="carousel move index"
              isActive={activeIndex === index}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

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
