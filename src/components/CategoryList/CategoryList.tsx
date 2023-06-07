/** @jsxImportSource @emotion/react */
import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { css } from "@emotion/react";

import { categories } from "./category";
import "./CategoryList.scss";

const clickOnStyle = css`
  color: #fff;
  background-color: #9747ff;
`;

const CategoryList = React.memo(() => {
  const navigate = useNavigate();
  const [statusCategories, setStatusCategories] = useState(
    categories.map(() => false)
  );
  const [index, setIndex] = useState<number>(-1);
  const toggleCategoty = useMemo<boolean>(() => {
    return index >= 0 ? true : false;
  }, [index]);

  const handleItemClick = (idx: number) => {
    setIndex((prev) => (prev === idx ? -1 : idx));
    setStatusCategories((prev) => {
      const trueIndex = prev.findIndex((item) => item);
      if (trueIndex !== -1) {
        prev[trueIndex] = false;
        if (trueIndex !== idx) {
          prev[idx] = !prev[idx];
        }
      } else {
        prev[idx] = !prev[idx];
      }
      return prev;
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
                css={statusCategories[idx] && clickOnStyle}
              >
                {category.icon}
              </div>
              <span className="item-name">{category.name}</span>
            </div>
          ))}
      </div>
      {toggleCategoty && (
        <div className="sub-category">
          {categories[index].list.map((item, idx) => (
            <div
              key={idx}
              className="sub-item"
              onClick={() => handleSubItemClick(item)}
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

export default CategoryList;
