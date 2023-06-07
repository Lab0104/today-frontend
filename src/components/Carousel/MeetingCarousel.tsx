/** @jsxImportSource @emotion/react */
import React, { useState, useEffect, useCallback, useMemo } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { RiArrowDropLeftLine, RiArrowDropRightLine } from "react-icons/ri";
import useItemCountCarousel from "hooks/useItemCountCarousel";

import MeetingCard from "components/MeetingCard/MeetingCard";

import { TypeMeetingList } from "mainPageTypes";
import "./Carousel.scss";

interface Props {
  list: TypeMeetingList[];
  currentTime: number;
}

const MeetingCarousel = React.memo(({ list, currentTime }: Props) => {
  console.log("meetingCarousel");
  const itemCount = useItemCountCarousel();
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const navItemCount = useMemo(
    () =>
      list.length % itemCount === 0
        ? list.length / itemCount
        : Math.floor(list.length / itemCount) + 1,
    [list, itemCount]
  );

  const resetActiveIndex = useCallback(
    (activeIndex: number) => {
      if (navItemCount <= activeIndex) {
        setActiveIndex((prev) => navItemCount - 1);
      }
    },
    [navItemCount]
  );

  const onNextClick = useCallback(() => {
    setActiveIndex((activeIndex + 1) % navItemCount);
  }, [activeIndex, navItemCount]);

  const onPrevClick = useCallback(() => {
    setActiveIndex((prev) => (prev === 0 ? prev - 1 + navItemCount : prev - 1));
  }, [navItemCount]);

  const onNavIndexClick = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  useEffect(() => {
    resetActiveIndex(activeIndex);
  }, [resetActiveIndex, activeIndex]);

  return (
    <div className="carousel-container">
      <div className="content">
        <button className="meetingLeftArrowButton" onClick={onPrevClick}>
          <RiArrowDropLeftLine />
        </button>
        <ul className="itemList" css={itemListStyle}>
          <CarouselContainer activeIndex={activeIndex} itemCount={itemCount}>
            {list &&
              list.map((meeting, index) => (
                <MeetingCard
                  key={index}
                  list={meeting}
                  currentTime={currentTime}
                ></MeetingCard>
              ))}
          </CarouselContainer>
        </ul>
        <button className="meetingRightArrowButton" onClick={onNextClick}>
          <RiArrowDropRightLine />
        </button>
      </div>
      <ul className="nav">
        {Array.from({ length: navItemCount }).map((_, index) => (
          <li
            className="navItem"
            key={index}
            onClick={() => onNavIndexClick(index)}
          >
            <NavButton isActive={activeIndex === index} />
          </li>
        ))}
      </ul>
    </div>
  );
});

const itemListStyle = css`
  width: 260px;
  @media screen and (min-width: 660px) {
    width: 530px;
  }
  @media screen and (min-width: 930px) {
    width: 800px;
  }
  @media screen and (min-width: 1200px) {
    width: 1070px;
  }
`;

const NavButton = styled.button<{ isActive: boolean }>`
  width: 4px;
  height: 4px;
  background-color: #000;
  opacity: ${({ isActive }) => (isActive ? 0.3 : 0.1)};
`;

const CarouselContainer = styled.div<{
  activeIndex: number;
  itemCount: number;
}>`
  box-sizing: border-box;
  display: flex;
  width: 270px;
  margin: 5px;
  justify-content: left;
  gap: 20px;
  transform: translateX(
    -${({ activeIndex, itemCount }) => (activeIndex === 0 ? activeIndex : activeIndex * itemCount * 100)}%
  );
  transition: 500ms ease;
`;

export default MeetingCarousel;
