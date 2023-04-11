/** @jsxImportSource @emotion/react */
import React, { useState, ComponentProps, DOMAttributes } from "react";
import { Link, useNavigate } from "react-router-dom";
import { css } from "@emotion/react";
import { RiArrowDropUpLine, RiArrowDropDownLine } from "react-icons/ri";

import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../reducer/userSlice";

import { TypeUser } from "mainPageTypes";
import "./NavigationBar.scss";

const visible = css`
  visibility: visible;
`;
const hidden = css`
  visibility: hidden;
`;

type dropdownList = {
  name: string;
  href: string;
};
type dropdownProps = {
  list: dropdownList[];
  onClick: React.MouseEventHandler<HTMLAnchorElement> | undefined;
};
type EventHandlers<T> = Omit<
  DOMAttributes<T>,
  "children" | "dangerouslySetInnerHTML"
>;
type Event<
  TElement extends keyof JSX.IntrinsicElements,
  TEventHandler extends keyof EventHandlers<TElement>
> = ComponentProps<TElement>[TEventHandler];

const keywords = ["단기", "스터디", "문화생활", "밥"];
const userMenus = [
  { name: "내 정보", href: "/" },
  { name: "알림", href: "/" },
  { name: "채팅", href: "/" },
  { name: "로그아웃", href: "/" },
];

const DropdownContents: React.FC<dropdownProps> = ({ list, onClick }) => {
  return (
    <>
      {list.map((item: dropdownList) => (
        <Link to={item.href} key={item.name} onClick={onClick}>
          {item.name}
        </Link>
      ))}
    </>
  );
};

export default function NavigationBar() {
  const navigate = useNavigate();

  const isLogged = useSelector((state: TypeUser) => state.user.isLogged);
  const dispatch = useDispatch();

  const [dropdownToggle, setDropdownToggle] = useState(false);
  const [searchContext, setSearchContext] = useState("");

  const userOnClick = () => {
    setDropdownToggle((prev) => !prev);
  };
  const searchOnClick = () => {
    navigate("/map", { state: searchContext });
  };
  const dropdownOnClick: Event<"a", "onClick"> = (e) => {
    const value = e.currentTarget.innerHTML;
    switch (value) {
      case "로그아웃":
        alert("로그아웃");
        dispatch(logout());
        break;
      default:
    }
  };
  const keywordOnClick: Event<"span", "onClick"> = (e) => {
    const value = e.currentTarget.innerHTML;
    navigate("/map", { state: value });
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
    <nav className="navigation-nav">
      <div className="header">
        <Link className="logo" to="/">
          LOGO
        </Link>
        <div className="searchContainer">
          <div className="searchKeyword">
            <span className="material-icons keywordIcon">search</span>
            <div className="keywords">
              {keywords &&
                keywords.map((keyword, idx) => (
                  <span key={idx} onClick={keywordOnClick}>
                    {keyword}
                  </span>
                ))}
            </div>
          </div>
          <div className="search">
            <input
              type="text"
              value={searchContext}
              placeholder="장소, 모임 검색"
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
        </div>
        <div className="user">
          {isLogged ? (
            <div className="dropdown" onClick={userOnClick}>
              <span className="material-icons user-icon">account_circle</span>
              <div
                className="dropdown-contents"
                css={dropdownToggle ? visible : hidden}
              >
                <DropdownContents list={userMenus} onClick={dropdownOnClick} />
              </div>
              {dropdownToggle ? (
                <RiArrowDropUpLine style={{ color: "black" }} />
              ) : (
                <RiArrowDropDownLine style={{ color: "black" }} />
              )}
            </div>
          ) : (
            <div className="loginAndSignup">
              <button onClick={() => navigate("/login")}>로그인</button>
              <button onClick={() => navigate("/signup")}>회원가입</button>
            </div>
          )}
        </div>
      </div>
      <div className="hidden">
        <div className="searchKeyword">
          <span className="material-icons keywordIcon">search</span>
          <div className="keywords">
            {keywords &&
              keywords.map((keyword, idx) => (
                <span key={idx} onClick={keywordOnClick}>
                  {keyword}
                </span>
              ))}
          </div>
        </div>
        <div className="search">
          <input
            type="text"
            value={searchContext}
            placeholder="장소, 모임 검색"
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
    </nav>
  );
}
