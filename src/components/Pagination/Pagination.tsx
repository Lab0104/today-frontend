import React from "react";
import styled from "@emotion/styled";
import { GrFormPrevious } from "@react-icons/all-files/gr/GrFormPrevious";
import { GrFormNext } from "@react-icons/all-files/gr/GrFormNext";
import { AiOutlineEllipsis } from "@react-icons/all-files/ai/AiOutlineEllipsis";
import usePagination from "../../hooks/usePagination";

const Navigation = styled.nav``;
const Button = styled.button<{ selected: boolean }>`
  color: ${({ selected }) => (selected ? "#fff" : "#000")};
  border: 0;
  margin: 0;
  padding: 8px 12px;
  font-size: 12px;
  font-weight: normal;
  background-color: ${({ selected }) => (selected ? "#36dafa" : "#fff")};
  cursor: pointer;
  border-radius: 100%;
  width: 48px;
  height: 48px;
  &:hover {
    background-color: #ccc;
    color: #fff;
    &active {
      opacity: 0.8;
    }
  }
`;
const Item = styled.li`
  margin-left: 4px;
  margin-right: 4px;
`;
const ItemList = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  list-style: none;
`;

const getLabel = (item: number | string) => {
  if (typeof item === "number") return item;
  else if (item.indexOf("ellipsis") > -1) return <AiOutlineEllipsis />;
  else if (item.indexOf("prev") > -1) return <GrFormPrevious />;
  else if (item.indexOf("next") > -1) return <GrFormNext />;
};

interface pageProps {
  count: number;
  page: number;
  onPageChange: (item: number) => void;
  disabled?: boolean | undefined;
  siblingCount?: number | undefined;
  boundaryCount?: number | undefined;
}

export default function Pagination({
  count,
  page,
  onPageChange,
  disabled,
  siblingCount,
  boundaryCount,
}: pageProps) {
  const { items } = usePagination({
    count,
    page,
    onPageChange,
    disabled,
    siblingCount,
    boundaryCount,
  });
  return (
    <Navigation>
      <ItemList>
        {items.map(({ key, disabled, selected, onClick, item }) => (
          <Item key={key}>
            <Button
              aria-label="showing list button to click index"
              disabled={disabled}
              selected={selected}
              onClick={onClick}
            >
              {getLabel(item)}
            </Button>
          </Item>
        ))}
      </ItemList>
    </Navigation>
  );
}
