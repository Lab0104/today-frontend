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
      <div
        className={
          subCategoryToggle ? "sub-category" : "sub-category sub-category-close"
        }
      >
        {(index || index === 0) &&
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
    </div>
  );
});

export default CategoryList;
