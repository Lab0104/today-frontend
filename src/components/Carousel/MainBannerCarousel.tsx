/** @jsxImportSource @emotion/react */
import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { RiArrowDropLeftLine, RiArrowDropRightLine } from "react-icons/ri";

import "./Carousel.scss";

const colors = ["#e4e4e4", "red", "green", "yellow", "black", "white"];

const banners = [
  "images/kakao_login_buttons/kakao_login_large_wide.png",
  "images/kakao_login_buttons/kakao_login_large_wide.png",
  "images/kakao_login_buttons/kakao_login_large_wide.png",
  "images/kakao_login_buttons/kakao_login_large_wide.png",
  "images/kakao_login_buttons/kakao_login_large_wide.png",
  "images/kakao_login_buttons/kakao_login_large_wide.png",
];

const MainBannerCarousel = React.memo(() => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFocused, setIsFocused] = useState(false);

  const handleNext: React.MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      if (e) e.stopPropagation();
      setActiveIndex((prev) => (activeIndex + 1) % banners.length);
    },
    [activeIndex]
  );
  const handlePrev: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    setActiveIndex((prev) =>
      prev === 0 ? prev - 1 + banners.length : prev - 1
    );
  };

  const handleMouseEnter = () => setIsFocused(true);
  const handleMouseLeave = () => setIsFocused(false);

  const handleContentClick: React.MouseEventHandler<HTMLLIElement> = (e) => {
    const value = e.currentTarget.value;
    navigate("/notice", { state: { value } });
  };
  const handleNavClick: React.MouseEventHandler<HTMLLIElement> = (e) => {
    setActiveIndex(e.currentTarget.value);
    e.stopPropagation();
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
      <div className="content" style={{ cursor: "pointer" }}>
        <button className="bannerLeftArrowButton" onClick={handlePrev}>
          <RiArrowDropLeftLine />
        </button>
        <ul className="itemList">
          {banners.map((banner, index) => (
            <CarouselListItem
              key={index}
              value={index}
              src={banner}
              activeIndex={activeIndex}
              onClick={handleContentClick}
            >
              <Item>
                <h1>오늘 하루</h1>
                <span>오늘 하루를 특별하게 보내는 방법!</span>
                <span>124개의 모임이 열리고 있어요!</span>
                <span>모임을 만들고 참여해보세요!</span>
              </Item>
            </CarouselListItem>
          ))}
        </ul>
        <button className="bannerRightArrowButton" onClick={handleNext}>
          <RiArrowDropRightLine />
        </button>
      </div>
      <ul className="nav" css={navStyle}>
        {Array.from({ length: banners.length }).map((_, index) => (
          <li
            className="navItem"
            key={index}
            value={index}
            onClick={handleNavClick}
          >
            <NavButton isActive={activeIndex === index} />
          </li>
        ))}
      </ul>
    </div>
  );
});

const navStyle = css`
  position: absolute;
  bottom: 10px;
  right: 10px;
  background-color: white;
  opacity: 0.5;
`;
const CarouselListItem = styled.li<{ activeIndex: number; src: string }>`
  position: relative;
  width: 100%;
  height: 300px;
  background-color: ${({ activeIndex }) => colors[activeIndex]};
  background-repeat: no-repeat;
  flex: 1 0 100%;
  transform: translateX(-${({ activeIndex }) => activeIndex * 100}%);
  transition: 500ms ease;
  > img {
    width: 100%;
    height: fit-content;
  }
`;
const Item = styled.div`
  position: absolute;
  left: 100px;
  top: 140px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-size: 12px;
`;

const NavButton = styled.button<{ isActive: boolean }>`
  width: 7px;
  height: 7px;
  padding: 0;
  border-radius: 50%;
  background-color: #000;
  opacity: ${({ isActive }) => (isActive ? 0.3 : 0.1)};
`;

export default MainBannerCarousel;
