/** @jsxImportSource @emotion/react */
import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { css } from "@emotion/react";
import { BsBook, BsPeople } from "react-icons/bs";
import { TbMovie } from "react-icons/tb";
import { TfiGame } from "react-icons/tfi";
import {
  IoBusiness,
  IoFastFoodOutline,
  IoAirplaneOutline,
} from "react-icons/io5";
import { GiStoneCrafting } from "react-icons/gi";

import "./CategoryList.scss";

const clickOnStyle = css`
  color: #fff;
  background-color: #9747ff;
`;

export const categories = [
  {
    name: "학문/스터디",
    icon: <BsBook />,
    list: [
      "프로그래밍 언어 스터디",
      "영어 회화 스터디",
      "디자인 스터디",
      "수학 스터디",
      "과학 실험 스터디",
    ],
  },
  {
    name: "비즈니스",
    icon: <IoBusiness />,
    list: [
      "창업 컨설팅 그룹",
      "경영 전략 모임",
      "마케팅 교육 모임",
      "취업 멘토링 그룹",
      "글로벌 비즈니스 네트워크 그룹",
    ],
  },
  {
    name: "예술/문화",
    icon: <TbMovie />,
    list: [
      "문학 작품 독서 그룹",
      "콘서트, 연극 관람 모임",
      "필름, 영화 관람 그룹",
      "문화유산 탐방 모임",
    ],
  },
  {
    name: "스포츠/게임",
    icon: <TfiGame />,
    list: [
      "축구 클럽",
      "테니스 동호회",
      "보드 게임 그룹",
      "카드 게임 모임",
      "게임 개발 동아리",
    ],
  },
  {
    name: "사회활동/자선",
    icon: <BsPeople />,
    list: [
      "장애인 돕기 봉사 모임",
      "동물보호 활동 그룹",
      "청소년 지원 봉사 모임",
      "글로벌 기아 해결 운동",
      "지역 사회 문제 해결 그룹",
    ],
  },
  {
    name: "요리/음식",
    icon: <IoFastFoodOutline />,
    list: [
      "베이킹 동호회",
      "쿠킹 클래스 그룹",
      "다양한 음식 맛보기 모임",
      "정기적인 레스토랑 방문 그룹",
      "지역 푸드 투어 그룹",
    ],
  },
  {
    name: "여행/문화 탐방",
    icon: <IoAirplaneOutline />,
    list: [
      "해외 여행 그룹",
      "국내 여행 그룹",
      "여행사 투어 그룹",
      "유적지 탐방 모임",
      "문화 축제 탐방 그룹",
    ],
  },
  {
    name: "수공예",
    icon: <GiStoneCrafting />,
    list: [
      "뜨개질 동호회",
      "도예 작업실 그룹",
      "목공 예술 동아리",
      "수채화, 디자인 스케치 모임",
      "섬유 미술 작업실 그룹",
    ],
  },
];

const CategoryList = React.memo(() => {
  const navigate = useNavigate();
  const [categoriesStatus, setCategoriesStatus] = useState(
    categories.map(() => false)
  );
  const [index, setIndex] = useState<number | undefined>(undefined);
  const subCategoryToggle = useMemo<boolean | undefined>(() => {
    return index === 0 || index ? true : false;
  }, [index]);

  const handleItemClick = (idx: number) => {
    setIndex((prev) => (prev === idx ? undefined : idx));
    setCategoriesStatus((prev) => {
      let arr = [...prev];
      const trueIndex = arr.findIndex((item) => item);
      if (trueIndex !== -1) {
        arr[trueIndex] = false;
        if (trueIndex !== idx) {
          arr[idx] = !arr[idx];
        }
      } else {
        arr[idx] = !arr[idx];
      }
      return arr;
    });
  };
  const handleSubItemClick = (item: string) => {
    navigate("/map", { state: item });
  };

  return (
    <div className="categoryList-container">
      <div className="large-category">
        {categories &&
          categories.map((category, idx) => (
            <div
              key={idx}
              className="large-item"
              onClick={() => {
                handleItemClick(idx);
              }}
            >
              <div
                className="item-icon"
                css={categoriesStatus[idx] && clickOnStyle}
              >
                {category.icon}
              </div>
              <span className="item-name">{category.name}</span>
            </div>
          ))}
      </div>
      <CSSTransition
        in={subCategoryToggle}
        timeout={300}
        classNames="sub-list"
        unmountOnExit
      >
        <div
          className={
            subCategoryToggle
              ? "sub-category sub-category-open"
              : "sub-category sub-category-close"
          }
        >
          {index &&
            categories[index].list.map((item, idx) => (
              <div
                key={idx}
                className="sub-item"
                onClick={() => handleSubItemClick(item)}
              >
                {item}
              </div>
            ))}
        </div>
      </CSSTransition>
    </div>
  );
});

export default CategoryList;
