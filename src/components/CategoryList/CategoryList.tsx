/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { css } from "@emotion/react";
import { BsBook } from "react-icons/bs";

import "./CategoryList.scss";

const clickOnStyle = css`
  color: #fff;
  background-color: #9747ff;
`;

const categories = [
  "학문/스터디",
  "학문/스터디",
  "학문/스터디",
  "학문/스터디",
  "학문/스터디",
  "학문/스터디",
  "학문/스터디",
  "학문/스터디",
];

export default function CategoryList() {
  const [categoriesStatus, setCategoriesStatus] = useState(
    categories.map(() => false)
  );
  const handleItemClick = (index: number) => {
    setCategoriesStatus((prev) => {
      let arr = [...prev];
      arr[index] = !arr[index];
      return arr;
    });
  };
  return (
    <div className="categoryList-container">
      {categories &&
        categories.map((category, idx) => (
          <div
            key={idx}
            className="itemList"
            onClick={() => {
              handleItemClick(idx);
            }}
          >
            <div
              className="itemIcon"
              css={categoriesStatus[idx] && clickOnStyle}
            >
              <BsBook />
            </div>
            <span className="itemName">{category}</span>
          </div>
        ))}
    </div>
  );
}
