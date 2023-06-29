/** @jsxImportSource @emotion/react */
import React, { useEffect, useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { RiArrowDropLeftLine } from "@react-icons/all-files/ri/RiArrowDropLeftLine";
import { RiArrowDropRightLine } from "@react-icons/all-files/ri/RiArrowDropRightLine";
import "./Carousel.scss";

// 배너 이미지 리스트 및 배너 배경 색 리스트
interface Props {
  bannerList: string[];
  backgroundColorList: string[];
}

const MainBannerCarousel = React.memo(
  ({ bannerList, backgroundColorList }: Props) => {
    const navigate = useNavigate();
    const bannerInterval = useRef<number | undefined>();
    const [activeIndex, setActiveIndex] = useState(0);
    const [isFocused, setIsFocused] = useState(false);

    const onNextClick: React.MouseEventHandler<HTMLButtonElement> = useCallback(
      (e) => {
        if (e) e.stopPropagation();
        setActiveIndex((activeIndex + 1) % bannerList.length);
      },
      [activeIndex, bannerList]
    );
    const onPrevClick: React.MouseEventHandler<HTMLButtonElement> = useCallback(
      (e) => {
        e.stopPropagation();
        setActiveIndex((prev) =>
          prev === 0 ? prev - 1 + bannerList.length : prev - 1
        );
      },
      [bannerList]
    );
    const onBannerClick: React.MouseEventHandler<HTMLLIElement> = useCallback(
      (e) => {
        const value = e.currentTarget.value;
        navigate("/notice", { state: { value } });
      },
      [navigate]
    );
    const onNavIndexClick: React.MouseEventHandler<HTMLLIElement> = useCallback(
      (e) => {
        setActiveIndex(e.currentTarget.value);
        e.stopPropagation();
      },
      []
    );

    const onMouseFocus = useCallback((isFocused: boolean) => {
      setIsFocused(isFocused);
    }, []);

    useEffect(() => {
      if (!isFocused) {
        bannerInterval.current = window.setInterval(onNextClick, 3000);
      }
      return () => {
        window.clearInterval(bannerInterval.current);
      };
    }, [isFocused, onNextClick]);

    return (
      <div
        className="carousel-container"
        onMouseEnter={() => onMouseFocus(true)}
        onMouseLeave={() => onMouseFocus(false)}
      >
        <div className="content" style={{ cursor: "pointer" }}>
          <button
            aria-label="banner move left"
            className="bannerLeftArrowButton"
            onClick={onPrevClick}
          >
            <RiArrowDropLeftLine />
          </button>
          <ul className="itemList">
            {bannerList.map((banner, index) => (
              <CarouselListItem
                key={index}
                src={banner}
                activeIndex={activeIndex}
                backgroundColorList={backgroundColorList}
                onClick={onBannerClick}
              >
                <Item>
                  <h4>내일 하루</h4>
                  <span>내일 하루를 특별하게 보내는 방법!</span>
                  <span>124개의 모임이 열리고 있어요!</span>
                  <span>모임을 만들고 참여해보세요!</span>
                </Item>
              </CarouselListItem>
            ))}
          </ul>
          <button
            aria-label="banner move right"
            className="bannerRightArrowButton"
            onClick={onNextClick}
          >
            <RiArrowDropRightLine />
          </button>
        </div>
        <ul className="nav" css={navStyle}>
          {Array.from({ length: bannerList.length }).map((_, index) => (
            <li
              className="navItem"
              key={index}
              value={index}
              onClick={onNavIndexClick}
            >
              <NavButton
                aria-label="banner index button"
                isActive={activeIndex === index}
              />
            </li>
          ))}
        </ul>
      </div>
    );
  }
);

const navStyle = css`
  position: absolute;
  bottom: 10px;
  right: 10px;
  background-color: white;
  opacity: 0.5;
`;
const CarouselListItem = styled.li<{
  activeIndex: number;
  src: string;
  backgroundColorList: string[];
}>`
  position: relative;
  padding-top: 35%;
  background-color: ${({ activeIndex, backgroundColorList }) =>
    backgroundColorList[activeIndex]};
  background-repeat: no-repeat;
  flex: 1 0 100%;
  transform: translateX(-${({ activeIndex }) => activeIndex * 100}%);
  transition: 500ms ease;
  background-image: url(${({ src }) => src});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  > img {
    width: 100%;
    height: fit-content;
  }
`;
const Item = styled.div`
  position: absolute;
  left: 20%;
  bottom: 12%;
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-size: 6px;

  & h4 {
    font-size: 20px;
    margin: 15px 0;
  }

  @media (min-width: 400px) {
    font-size: 8px;
  }
  @media (min-width: 600px) {
    left: 15%;
    font-size: 11px;
  }
  @media (min-width: 768px) {
    font-size: 14px;
  }
  @media (min-width: 1024px) {
    font-size: 15px;
  }
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
