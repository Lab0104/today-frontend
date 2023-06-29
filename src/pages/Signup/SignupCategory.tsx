/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { useNavigate, useLocation } from "react-router-dom";

import { categories } from "components/CategoryList/category";

// const imageSrc = [
//   { src: "/images/category/cafe.png", msg: "카페 탐방" },
//   { src: "/images/category/canvas.png", msg: "그림" },
//   { src: "/images/category/excercise.png", msg: "운동" },
//   { src: "/images/category/photography.png", msg: "사진 촬영" },
//   { src: "/images/category/restaurant.png", msg: "맛집 탐방" },
//   { src: "/images/category/studying.png", msg: "스터디" },
//   { src: "/images/category/travel-bag.png", msg: "여행" },
//   { src: "/images/category/visitors.png", msg: "전시회" },
// ];
export default function Category() {
  const navigate = useNavigate();
  const { state } = useLocation();
  console.log(state);
  const [isClick, setIsClick] = useState(
    Array.from({ length: categories.length }).map(() => false)
  );

  const itemClick = (e: React.MouseEvent) => {
    const id = Number((e.target as HTMLElement).id);
    setIsClick((prev) => {
      let arr = [...prev];
      arr[id] = !arr[id];
      return arr;
    });
  };

  const fetchRequest = async (data: any) => {
    const req = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, ...state }),
    });
    const res = await req.json();

    if (res) {
      alert("축하합니다! 회원가입이 완료되었습니다!");
      console.log(data);
      navigate("/login");
    }
  };

  const submitClick = async () => {
    const selectedCategories = {
      categories: categories
        .filter((image, idx) => isClick[idx])
        .map((item, idx) => item.name),
    };

    await fetchRequest(selectedCategories);
  };

  useEffect(() => {
    if (!state) {
      alert("잘못 된 접근입니다.");
      navigate("/");
    }
  }, []);

  return (
    <Container>
      <h2>관심있는 모임을 알려주세요!</h2>
      <p>알려주신 모임을 추천해드려요</p>
      <CategoryList>
        {categories.map((item, idx) => {
          const id = String(idx);
          return (
            <CategoryItem
              key={id}
              onClick={itemClick}
              css={isClick[idx] && selected}
              id={id}
            >
              {item.icon}
              <ImageMessage id={id}>{item.name}</ImageMessage>
            </CategoryItem>
          );
        })}
      </CategoryList>
      <Button aria-label="selected category submit" onClick={submitClick}>
        선택 완료
      </Button>
      <span css={nonSelect} onClick={() => fetchRequest({ categories: [] })}>
        다음에 선택할게요
      </span>
    </Container>
  );
}

const nonSelect = css`
  font-size: 12px;
  text-decoration: underline;
  color: gray;
  cursor: pointer;
`;

const selected = css`
  border: 2px solid #9747ff;
  background-color: white;
`;

const Container = styled.div`
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  justify-content: center;
`;

const CategoryList = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
`;

const CategoryItem = styled.div`
  width: 250px;
  height: 250px;
  background-color: #eee;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  cursor: pointer;

  & svg {
    font-size: 35px;
    color: #9747ff;
  }
`;
const ImageMessage = styled.p`
  margin: 0;
  font-size: 21px;
`;

const Button = styled.button`
  width: 300px;
  height: 50px;
`;
