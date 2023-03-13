import React, { useState, useEffect, useRef } from "react";
import styled from "@emotion/styled";
import axios from "axios";

import _ from "lodash";

const List = styled.ul`
  overflow: hidden scroll;
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100vh;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Item = styled.li`
  font-size: 24px;
`;

export default function InfiniteScroll({ size = 25 }) {
  const currentPageRef = useRef(0);
  const listRef = useRef(null);

  const [list, setList] = useState([]);
  const [isLast, setIsLast] = useState(false);
  const [isScrollBottom, setIsScrollBottom] = useState(false);

  const getList = async (init) => {
    const params = { page: currentPageRef.current, size: size };

    try {
      const response = await axios.get(
        "https://api.instantwebtools.net/v1/passenger",
        { params }
      );

      // 응답 객체가 가진 key에 맞게 세팅
      const _list = response.data.data;
      const _isLast = response.data.totalPage === currentPageRef.current;

      init ? setList(_list) : setList((prev) => [...prev, ..._list]);
      setIsLast(_isLast);
    } catch (e) {
      console.error(e);
    }
  };

  const handleScroll = _.throttle(() => {
    if (listRef.current) {
      const { scrollHeight, offsetHeight, scrollTop } = listRef.current;

      const offset = 50;

      setIsScrollBottom(scrollHeight - offsetHeight - scrollTop < offset);
    }
  }, 300);

  useEffect(() => {
    if (isScrollBottom) {
      currentPageRef.current += 1;

      !isLast && getList();
    }
  }, [isScrollBottom, isLast]);

  useEffect(() => {
    getList(true);
  }, []);

  return (
    <List ref={listRef} onScroll={handleScroll}>
      {list.map((item, idx) => (
        <Item key={idx}>{item.name}</Item>
      ))}
    </List>
  );
}
