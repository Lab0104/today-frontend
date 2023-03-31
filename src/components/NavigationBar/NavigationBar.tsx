/** @jsxImportSource @emotion/react */
import React, { useState, ComponentProps, DOMAttributes } from "react";
import { Link, useNavigate } from "react-router-dom";
import { css } from "@emotion/react";

import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../reducer/userSlice";

import "./NavigationBar.css";

const visible = css`
  visibility: visible;
`;
const hidden = css`
  visibility: hidden;
`;

type EventHandlers<T> = Omit<
  DOMAttributes<T>,
  "children" | "dangerouslySetInnerHTML"
>;

export type Event<
  TElement extends keyof JSX.IntrinsicElements,
  TEventHandler extends keyof EventHandlers<TElement>
> = ComponentProps<TElement>[TEventHandler];

const isNotLogin = (
  handler: (e: { target: { innerHTML: string } }) => void
) => [{ name: "로그인", href: "/login", onclick: handler }];
const isLogin = (handler: (e: { target: { innerHTML: string } }) => void) => [
  { name: "내 정보", href: "/", onclick: handler },
  { name: "알림", href: "/", onclick: handler },
  { name: "채팅", href: "/", onclick: handler },
  { name: "로그아웃", href: "/", onclick: handler },
];

interface Props {
  list: any;
}

const DropdownContents: React.FC<Props> = ({ list }) => {
  return list.map(
    (item: { name: string; href: string; onclick: () => void }) => (
      <Link to={item.href} key={item.name} onClick={item.onclick}>
        {item.name}
      </Link>
    )
  );
};

interface globalStateUser {
  user: {
    email: null;
    password: null;
    isSaved: false;
    isLogged: false;
  };
}

export default function NavigationBar() {
  const navigate = useNavigate();

  const isLogged = useSelector((state: globalStateUser) => state.user.isLogged);
  const dispatch = useDispatch();

  const [dropdownToggle, setDropdownToggle] = useState(false);
  const [searchContext, setSearchContext] = useState("");

  const userOnClick = () => {
    setDropdownToggle((prev) => !prev);
  };
  const searchOnClick = () => {
    navigate("/map", { state: searchContext });
  };
  const dropdownOnClick = (e: { target: { innerHTML: string } }) => {
    if (e.target.innerHTML === "로그아웃") {
      alert("로그아웃");
      dispatch(logout());
    }
  };

  const searchOnChange: Event<"input", "onChange"> = (e) => {
    const value = e.currentTarget.value;
    setSearchContext(value);
  };
  const handleOnKeyDown: Event<"input", "onKeyDown"> = (e) => {
    if (e.key === "Enter") {
      navigate("/map", { state: searchContext });
    }
  };

  return (
    <nav className="nav">
      <div className="header">
        <Link className="logo" to="/">
          오늘 하루
        </Link>
        <div className="search">
          <input
            type="text"
            value={searchContext}
            placeholder="새로운 모임을 검색해보세요!"
            onChange={searchOnChange}
            onKeyDown={handleOnKeyDown}
          />
          <button
            className="material-icons search-icon"
            onClick={searchOnClick}
          >
            search
          </button>
        </div>
        <div className="user">
          <div className="dropdown" onClick={userOnClick}>
            <span className="material-icons user-icon">account_circle</span>
            <div
              className="dropdown-contents"
              css={dropdownToggle ? visible : hidden}
            >
              {isLogged ? (
                <DropdownContents list={isLogin(dropdownOnClick)} />
              ) : (
                <DropdownContents list={isNotLogin(dropdownOnClick)} />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="hidden">
        <div className="hidden-search">
          <div className="search">
            <input
              type="text"
              value={searchContext}
              placeholder="새로운 모임을 검색해보세요!"
              onChange={searchOnChange}
            />
            <button
              className="material-icons search-icon"
              onClick={searchOnClick}
            >
              search
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
