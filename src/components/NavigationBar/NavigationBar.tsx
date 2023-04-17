/** @jsxImportSource @emotion/react */
import React, { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { RiArrowDropUpLine, RiArrowDropDownLine } from "react-icons/ri";
import { RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineClose } from "react-icons/ai";

import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../reducer/UserSlice";

import _ from "lodash";

import { Event } from "eventType";
import { TypeUser } from "userTypes";
import "./NavigationBar.scss";

type dropdownList = {
  name: string;
  href: string;
};
type dropdownProps = {
  list: dropdownList[];
  onClick: Event<"a", "onClick"> | undefined;
};

const keywords = ["단기", "스터디", "문화생활", "밥"];
const sideNavigationMenus = [
  { name: "공지사항", href: "/" },
  { name: "이벤트", href: "/" },
  { name: "소개", href: "/" },
  { name: "고객센터", href: "/" },
  { name: "광고등록", href: "/" },
];
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

const NavigationBar = React.memo(() => {
  console.log("navigation!");
  const navigate = useNavigate();

  const isLogged = useSelector(
    (state: { user: TypeUser }) => state.user.isLogged
  );
  const dispatch = useDispatch();

  const [dropdownToggle, setDropdownToggle] = useState(false);
  const [isSideNavClose, setIsSideNavClose] = useState(1);
  const [searchContext, setSearchContext] = useState("");
  const debouncedInput = useMemo(
    () =>
      _.debounce((searchContext) => {
        setSearchContext(searchContext);
      }, 300),
    []
  );
  const sideNavOpenOnClick = () => setIsSideNavClose(0);
  const sideNavCloseOnClick = () => setIsSideNavClose(1);
  const sideNavMenuOnClick = (link: string) => {
    setIsSideNavClose(1);
    navigate(link);
  };
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
    debouncedInput(value);
  };
  const handleOnKeyDown: Event<"input", "onKeyDown"> = (e) => {
    if (e.key === "Enter") {
      navigate("/map", { state: searchContext });
    }
  };

  return (
    <nav className="navigation-nav">
      <>
        <SideNavigation isClose={isSideNavClose}>
          <CloseButton>
            <AiOutlineClose
              style={{ cursor: "pointer" }}
              onClick={sideNavCloseOnClick}
            />
          </CloseButton>
          {sideNavigationMenus &&
            sideNavigationMenus.map((menu, idx) => (
              <span key={idx} onClick={() => sideNavMenuOnClick(menu.href)}>
                {menu?.name}
              </span>
            ))}
        </SideNavigation>
        <Dim isClose={isSideNavClose} onClick={sideNavCloseOnClick} />
      </>
      <div className="header">
        <div className="logo">
          <RxHamburgerMenu onClick={sideNavOpenOnClick} />
          <Link to="/">LOGO</Link>
        </div>
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
});

const visible = css`
  opacity: 1;
  transition: opacity 0.5s ease-in-out;
`;
const hidden = css`
  opacity: 0;
  visibility: hidden;
`;

const SideNavigation = styled.div<{ isClose: number }>`
  box-sizing: border-box;
  position: absolute;
  left: 0;
  width: 200px;
  height: 1440px;
  padding: 20px;
  z-index: 9;
  background-color: white;
  display: flex;
  flex-direction: column;
  gap: 20px;
  transform: translateX(-${({ isClose }) => isClose * 200}px);
  transition: transform 500ms ease;

  & span {
    display: inline;
    cursor: pointer;
  }
`;

const Dim = styled.div<{ isClose: number }>`
  z-index: 1;
  height: 1440px;
  position: absolute;
  top: 0;
  right: 0;
  botton: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${({ isClose }) => (isClose ? "none" : "block")};
`;

const CloseButton = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 20px;
`;

export default NavigationBar;
