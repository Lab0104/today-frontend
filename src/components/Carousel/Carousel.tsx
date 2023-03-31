/** @jsxImportSource @emotion/react */
import { useState, useEffect, useCallback, useMemo } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { RiArrowDropLeftLine, RiArrowDropRightLine } from "react-icons/ri";

import Meetings from "../Meetings/Meetings";

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
  top: calc(50% - 22.5px);
  z-index: 1;
  padding: 0;
  font-size: 45px;
  font-weight: bold;
  background-color: transparent;
  color: gray;
  border: none;
  margin: 0;
  cursor: pointer;
  &:hover {
    color: black;
  }
  ${({ pos }) =>
    pos === "left"
      ? css`
          left: -10px;
        `
      : css`
          right: -10px;
        `}
`;

const MeetingList = styled.div`
  width: 250px;
  display: flex;
  align-items: center;
  overflow: hidden;
  margin: 0 auto;
  @media screen and (min-width: 660px) {
    width: 520px;
  }
  @media screen and (min-width: 930px) {
    width: 790px;
  }
  @media screen and (min-width: 1200px) {
    width: 1060px;
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

export type listType = {
  id: number;
  title: string;
  participant: number;
  total: number;
  subTitle: string;
  address: string;
  deadline: string;
  status: boolean;
  like: boolean;
}[];

interface carouselProps {
  itemCount: number;
  count: number;
  onClickModal: (count: number, id: number) => void;
  list: listType;
}

export default function Carousel({
  list,
  itemCount,
  count,
  onClickModal,
}: carouselProps) {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const navItemCount = useMemo(
    () =>
      list.length % itemCount === 0
        ? list.length / itemCount
        : Math.floor(list.length / itemCount) + 1,
    [list.length, itemCount]
  );
  // const [isFocused, setIsFocused] = useState<boolean>(false);

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

  // const handleMouseEnter = () => setIsFocused(true);
  // const handleMouseLeave = () => setIsFocused(false);

  const goTo = (index: number) => {
    setActiveIndex(index);
  };

  // useEffect(() => {
  //   let interval;
  //   if (!isFocused) {
  //     interval = setInterval(handleNext, 3000);
  //   }
  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, [isFocused, handleNext]);

  return (
    // <Base onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
    <Base>
      <Container>
        <ArrowButton pos={"left"} onClick={handlePrev}>
          <RiArrowDropLeftLine />
        </ArrowButton>
        <MeetingList>
          <Meetings
            count={count}
            meetingList={list}
            onClickModal={onClickModal}
            activeIndex={activeIndex}
            itemCount={itemCount}
          />
        </MeetingList>
        {/* <CarouselList>
          {banners.map((banner, index) => (
            <CarouselListItem activeIndex={activeIndex} key={index}>
              <img src={banner} alt="이미지" />
            </CarouselListItem>
          ))}
        </CarouselList> */}
        <ArrowButton pos={"right"} onClick={handleNext}>
          <RiArrowDropRightLine />
        </ArrowButton>
      </Container>
      <Nav>
        {Array.from({ length: navItemCount }).map((_, index) => (
          <NavItem key={index} onClick={() => goTo(index)}>
            <NavButton isActive={activeIndex === index} />
          </NavItem>
        ))}
      </Nav>
    </Base>
  );
}
