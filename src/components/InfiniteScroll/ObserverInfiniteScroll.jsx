/** @jsxImportSource @emotion/react */
import React, { useState, useEffect, useRef } from "react";
import { css } from "@emotion/react";
import useInterSectionObserver from "../../hooks/useIntersectionObserver";
import axios from "axios";

const itemStyle = css`
  min-height: 100vh;
  display: flex;
  border: 1px dashed #000;
`;

const Item = ({ isLastItem, onFetchMoreList, children }) => {
  const ref = useRef(null);
  const entry = useInterSectionObserver(ref, {});
  const isIntersecting = !!entry?.isIntersecting;

  useEffect(() => {
    isLastItem && isIntersecting && onFetchMoreList();
  }, [isLastItem, isIntersecting]);

  return (
    <div ref={ref} css={itemStyle}>
      {children}
    </div>
  );
};

export default function ObserverInfiniteScroll() {
  const [list, setList] = useState([]);
  const [isLast, setIsLast] = useState(false);
  const [page, setPage] = useState(0);

  const getList = async () => {
    const params = { size: 10, page };

    try {
      const res = await axios("https://api.instantwebtools.net/v1/passenger", {
        params,
      });

      const _list = res.data.data;
      const _isLast = res.data.totalPages;

      setList((prev) => [...prev, ..._list]);
      setIsLast(_isLast);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    !isLast && getList();
  }, [page]);

  return (
    <div>
      {list.map((item, idx) => (
        <Item
          key={idx}
          isLastItem={list.length - 1 === idx}
          onFetchMoreList={() => setPage((prev) => prev + 1)}
        >
          {item.name}
        </Item>
      ))}
    </div>
  );
}
