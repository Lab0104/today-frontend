import React, { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { CSSTransition } from "react-transition-group";
import { RiArrowDropUpLine, RiArrowDropDownLine } from "react-icons/ri";
import { RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineClose, AiOutlineSearch, AiOutlineUser } from "react-icons/ai";
import { HiUser, HiFilter } from "react-icons/hi";
import { BsBellFill, BsFillChatTextFill } from "react-icons/bs";
import { IoAddCircle, IoLogOutOutline } from "react-icons/io5";

import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../reducer/UserSlice";

import _ from "lodash";

import { Event } from "eventType";
import { TypeUser } from "userTypes";
import "./NavigationBar.scss";

type dropdownList = {
  name: string;
  component: React.ReactNode;
};
type dropdownProps = {
  list: dropdownList[];
  onClick: Event<"a", "onClick"> | undefined;
};

const USER_ICON_COLOR = { color: "black" };

const keywords = ["단기", "스터디", "문화생활", "밥"];
const sideNavigationMenus = [
  { name: "공지사항", href: "/" },
  { name: "이벤트", href: "/" },
  { name: "소개", href: "/" },
  { name: "고객센터", href: "/" },
  { name: "광고등록", href: "/" },
];
const userMenus = [
  { name: "프로필", component: <HiUser /> },
  { name: "알림", component: <BsBellFill /> },
  { name: "채팅", component: <BsFillChatTextFill /> },
  { name: "모임추가", component: <IoAddCircle /> },
  { name: "필터", component: <HiFilter /> },
  { name: "로그아웃", component: <IoLogOutOutline /> },
];

const DropdownContents: React.FC<dropdownProps> = ({ list, onClick }) => {
  return (
    <>
      {list.map((item: dropdownList, idx: number) => {
        if (idx === 2 || idx === 4) {
          return (
            <div key={item.name}>
              <div className="dropdown-item">
                {item.component}
                <span onClick={onClick}>{item.name}</span>
              </div>
              <hr />
            </div>
          );
        }
        return (
          <div className="dropdown-item" key={item.name}>
            {item.component}
            <span onClick={onClick}>{item.name}</span>
          </div>
        );
      })}
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
  const [sideNavToggle, setSideNavToggle] = useState(false);
  const [searchContext, setSearchContext] = useState("");
  const debouncedInput = useMemo(
    () =>
      _.debounce((searchContext) => {
        setSearchContext(searchContext);
      }, 300),
    []
  );
  const sideNavOpenOnClick = () => setSideNavToggle(true);
  const sideNavCloseOnClick = () => setSideNavToggle(false);
  const sideNavMenuOnClick = (link: string) => {
    setSideNavToggle(false);
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
      case "프로필":
        alert("프로필");
        break;
      case "알림":
        alert("알림");
        break;
      case "채팅":
        alert("채팅");
        break;
      case "모임추가":
        alert("모임추가");
        break;
      case "필터":
        alert("필터");
        break;
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
        <SideNavigation isOpen={sideNavToggle}>
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
        <Dim isOpen={sideNavToggle} onClick={sideNavCloseOnClick} />
      </>
      <div className="header">
        <div className="logo">
          <RxHamburgerMenu onClick={sideNavOpenOnClick} />
          <Link to="/">LOGO</Link>
        </div>
        <div className="searchContainer">
          <div className="searchKeyword">
            <AiOutlineSearch className="keyword-icon" />
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
            <AiOutlineSearch className="search-icon" onClick={searchOnClick} />
          </div>
        </div>
        <div className="user">
          {isLogged ? (
            <div className="dropdown" onClick={userOnClick}>
              <AiOutlineUser className="user-icon" style={USER_ICON_COLOR} />
              {dropdownToggle ? (
                <RiArrowDropUpLine style={USER_ICON_COLOR} />
              ) : (
                <RiArrowDropDownLine style={USER_ICON_COLOR} />
              )}
              <CSSTransition
                in={dropdownToggle}
                timeout={300}
                classNames="nav"
                unmountOnExit
              >
                <div className="dropdown-contents">
                  <DropdownContents
                    list={userMenus}
                    onClick={dropdownOnClick}
                  />
                </div>
              </CSSTransition>
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
          <AiOutlineSearch className="keyword-icon" />
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
          <AiOutlineSearch className="search-icon" onClick={searchOnClick} />
        </div>
      </div>
    </nav>
  );
});

const SideNavigation = styled.div<{ isOpen: boolean }>`
  box-sizing: border-box;
  position: absolute;
  left: 0;
  width: 296px;
  height: 1024px;
  padding: 30px;
  z-index: 9;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  gap: 20px;
  transform: translateX(-${({ isOpen }) => (isOpen ? 0 : 296)}px);
  transition: transform 0.5s ease-in-out;
  box-shadow: 4px 5px 4px rgba(0, 0, 0, 0.3);
  & span {
    display: inline;
    cursor: pointer;
  }

  & span:nth-of-type(3)::after {
    content: "";
    display: block;
    width: 100%;
    border-top: 1px solid black;
    margin-top: 20px;
  }
`;

const Dim = styled.div<{ isOpen: boolean }>`
  z-index: 1;
  height: 1440px;
  position: absolute;
  top: 0;
  right: 0;
  botton: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
`;

const CloseButton = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 20px;
`;

export default NavigationBar;
