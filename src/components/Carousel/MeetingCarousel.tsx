/** @jsxImportSource @emotion/react */
import { useState, useEffect, useCallback, useMemo } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { RiArrowDropLeftLine, RiArrowDropRightLine } from "react-icons/ri";

import MeetingCard from "components/MeetingCard/MeetingCard";

import { TypeMeetingList } from "mainPageTypes";
import "./Carousel.scss";

// meetingcard 가로 260px(width: 250px & margin: 5px 0)
// card gap: 10px
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
  border-box: box-sizing;
  display: flex;
  width: 270px;
  margin: 40px 5px;
  justify-content: left;
  gap: 20px;
  transform: translateX(
    -${({ activeIndex, itemCount }) => (activeIndex === 0 ? activeIndex : activeIndex * itemCount * 100)}%
  );
  transition: 200ms ease;
`;

interface carouselProps {
  itemCount: number;
  count: number;
  onClickModal: (count: number, id: number) => void;
  list: TypeMeetingList[];
  currentTime: number;
  isLogged: boolean;
}

export default function MeetingCarousel({
  list,
  itemCount,
  count,
  onClickModal,
  currentTime,
  isLogged,
}: carouselProps) {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const navItemCount = useMemo(
    () =>
      list.length % itemCount === 0
        ? list.length / itemCount
        : Math.floor(list.length / itemCount) + 1,
    [list.length, itemCount]
  );

  const resetActiveIndex = useCallback(
    (activeIndex: number) => {
      if (navItemCount <= activeIndex) {
        setActiveIndex((prev) => navItemCount - 1);
      }
    },
    [navItemCount]
  );

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (activeIndex + 1) % navItemCount);
  }, [activeIndex, navItemCount]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? prev - 1 + navItemCount : prev - 1));
  };

  useEffect(() => {
    resetActiveIndex(activeIndex);
  }, [resetActiveIndex, activeIndex]);

  const goTo = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="carousel-container">
      <div className="content">
        <button className="leftArrowButton" onClick={handlePrev}>
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
                  onClick={() => onClickModal(count, meeting.meet_id - 1)}
                  isLogged={isLogged}
                ></MeetingCard>
              ))}
          </CarouselContainer>
        </ul>
        <button className="rightArrowButton" onClick={handleNext}>
          <RiArrowDropRightLine />
        </button>
      </div>
      <ul className="nav">
        {Array.from({ length: navItemCount }).map((_, index) => (
          <li className="navItem" key={index} onClick={() => goTo(index)}>
            <NavButton isActive={activeIndex === index} />
          </li>
        ))}
      </ul>
    </div>
  );
}
