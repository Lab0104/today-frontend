/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const imageSrc = [
  { src: "/images/category/cafe.png", msg: "카페 탐방" },
  { src: "/images/category/canvas.png", msg: "그림" },
  { src: "/images/category/excercise.png", msg: "운동" },
  { src: "/images/category/photography.png", msg: "사진 촬영" },
  { src: "/images/category/restaurant.png", msg: "맛집 탐방" },
  { src: "/images/category/studying.png", msg: "스터디" },
  { src: "/images/category/travel-bag.png", msg: "여행" },
  { src: "/images/category/visitors.png", msg: "전시회" },
];
export default function Category() {
  const navigate = useNavigate();
  const [isClick, setIsClick] = useState(
    Array.from({ length: imageSrc.length }).map(() => false)
  );

  const itemClick = (e: React.MouseEvent) => {
    const id = Number((e.target as HTMLElement).id);
    setIsClick((prev) => {
      let arr = [...prev];
      arr[id] = !arr[id];
      return arr;
    });
  };
  const submitClick = async () => {
    const obj = Object.assign(
      {},
      imageSrc.filter((image, idx) => isClick[idx]).map((object) => object.msg)
    );
    const req = await fetch("/api/signup/category", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(obj),
    });
    const res = await req.json();

    if (res) {
      alert("축하합니다! 회원가입이 완료되었습니다!");
      console.log(obj);
      navigate("/login");
    }
  };

  return (
    <Container>
      <h2>관심있는 모임을 알려주세요!</h2>
      <p>알려주신 모임을 추천해드려요</p>
      <CategoryList>
        {imageSrc.map((item, idx) => {
          const id = String(idx);
          return (
            <CategoryItem
              key={id}
              onClick={itemClick}
              css={isClick[idx] && selected}
              id={id}
            >
              <Image src={item.src} alt="icon" id={id} />
              <ImageMessage id={id}>{item.msg}</ImageMessage>
            </CategoryItem>
          );
        })}
      </CategoryList>
      <Button onClick={submitClick}>선택 완료</Button>
      <Link
        to="/login"
        css={nonSelect}
        onClick={() => alert("회원가입이 완료되었습니다.")}
      >
        다음에 선택할게요
      </Link>
    </Container>
  );
}

const nonSelect = css`
  font-size: 12px;
  text-decoration: underline;
  color: gray;
`;

const selected = css`
  border: 2px solid black;
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
  width: 345px;
  height: 345px;
  background-color: #efefef;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  cursor: pointer;
`;

const Image = styled.img`
  width: 210px;
  height: 200px;
`;
const ImageMessage = styled.p`
  margin: 0;
  font-size: 21px;
`;

const Button = styled.button`
  width: 300px;
  height: 50px;
`;
