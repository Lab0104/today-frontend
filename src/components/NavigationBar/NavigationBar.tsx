import React, { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

import { RiArrowDropUpLine, RiArrowDropDownLine } from "react-icons/ri";
import { RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineSearch, AiOutlineUser } from "react-icons/ai";
import { HiUser, HiFilter } from "react-icons/hi";
import { BsBellFill, BsFillChatTextFill } from "react-icons/bs";
import { IoAddCircle, IoLogOutOutline } from "react-icons/io5";

import { useSelector, useDispatch } from "react-redux";
import { openModal } from "../../reducer/ModalSlice";
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
  onClick: Event<"div", "onClick"> | undefined;
};

const USER_ICON_COLOR = { color: "black" };

const keywords = ["단기", "스터디", "문화생활", "밥"];
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
              <div className="dropdown-item" onClick={onClick}>
                {item.component}
                <span>{item.name}</span>
              </div>
              <hr />
            </div>
          );
        }
        return (
          <div className="dropdown-item" onClick={onClick} key={item.name}>
            {item.component}
            <span>{item.name}</span>
          </div>
        );
      })}
    </>
  );
};

const NavigationBar = React.memo(() => {
  const navigate = useNavigate();

  const isLogged = useSelector(
    (state: { user: TypeUser }) => state.user.isLogged
  );
  const dispatch = useDispatch();

  const [dropdownToggle, setDropdownToggle] = useState(false);
  const [searchContext, setSearchContext] = useState("");
  const debouncedInput = useMemo(
    () =>
      _.debounce((searchContext) => {
        setSearchContext(searchContext);
      }, 300),
    []
  );
  const sideNavOnClick = () => {
    dispatch(openModal({ modalType: "SideNavModal" }));
  };
  const userOnClick = () => {
    setDropdownToggle((prev) => !prev);
  };
  const searchOnClick = () => {
    navigate("/map", { state: searchContext });
  };
  const dropdownOnClick: Event<"div", "onClick"> = (e) => {
    const value = e.currentTarget.children[1].innerHTML;
    switch (value) {
      case "프로필":
        navigate("/profile");
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
        navigate("/");
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
      <div className="header">
        <div className="logo">
          <RxHamburgerMenu onClick={sideNavOnClick} />
          <Link to="/">Today</Link>
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

export default NavigationBar;
