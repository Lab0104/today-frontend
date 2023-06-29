import React, { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

import { RiArrowDropUpLine } from "@react-icons/all-files/ri/RiArrowDropUpLine";
import { RiArrowDropDownLine } from "@react-icons/all-files/ri/RiArrowDropDownLine";
import { GiHamburgerMenu } from "@react-icons/all-files/gi/GiHamburgerMenu";
import { AiOutlineSearch } from "@react-icons/all-files/ai/AiOutlineSearch";
import { AiOutlineUser } from "@react-icons/all-files/ai/AiOutlineUser";
import { HiUser } from "@react-icons/all-files/hi/HiUser";
import { HiFilter } from "@react-icons/all-files/hi/HiFilter";
import { BsBellFill } from "@react-icons/all-files/bs/BsBellFill";
import { BsFillChatFill } from "@react-icons/all-files/bs/BsFillChatFill";
import { IoAddCircle } from "@react-icons/all-files/io5/IoAddCircle";
import { IoLogOutOutline } from "@react-icons/all-files/io5/IoLogOutOutline";

import { useSelector, useDispatch } from "react-redux";
import { closeModal, openModal } from "../../reducer/ModalSlice";
import { logout } from "../../reducer/UserSlice";

import { debounce } from "lodash";

import { Event } from "eventType";
import { TypeUser } from "userTypes";
import "./NavigationBar.scss";
import { toggleButtons } from "reducer/ToggleSlice";

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
  { name: "채팅", component: <BsFillChatFill /> },
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

  const { isLogged, login_method, access_token } = useSelector(
    (state: { user: TypeUser }) => state.user
  );
  const dispatch = useDispatch();

  const KAKAO_LOGOUT_URL = `https://kauth.kakao.com/oauth/logout?client_id=${process.env.REACT_APP_KAKAO_LOGIN_API_REST_API_KEY}&logout_redirect_uri=${process.env.REACT_APP_KAKAO_LOGIN_API_LOGOUT_REDIRECT_URI}`;

  const [dropdownToggle, setDropdownToggle] = useState(false);
  const [searchContext, setSearchContext] = useState("");
  const debouncedInput = useMemo(
    () =>
      debounce((searchContext) => {
        setSearchContext(searchContext);
      }, 300),
    []
  );
  const sideNavOnClick = () => {
    dispatch(openModal({ modalType: "SideNavModal" }));
  };
  const userOnClick = () => {
    dispatch(closeModal());
    setDropdownToggle((prev) => !prev);
  };
  const searchOnClick = () => {
    dispatch(closeModal());
    navigate("/map", { state: searchContext });
  };

  const dropdownOnClick: Event<"div", "onClick"> = (e) => {
    e.stopPropagation();
    setDropdownToggle((prev) => !prev);
    const value = e.currentTarget.children[1].innerHTML;
    switch (value) {
      case "프로필":
        dispatch(closeModal());
        navigate("/profile");
        break;
      case "알림":
        dispatch(openModal({ modalType: "NotificationModal" }));
        dispatch(toggleButtons({ idx: 1 }));

        break;
      case "채팅":
        dispatch(openModal({ modalType: "ChatModal" }));
        dispatch(toggleButtons({ idx: 2 }));

        break;
      case "모임추가":
        dispatch(openModal({ modalType: "AddModal" }));
        dispatch(toggleButtons({ idx: 3 }));

        break;
      case "필터":
        dispatch(openModal({ modalType: "FilterModal" }));
        dispatch(toggleButtons({ idx: 4 }));

        break;
      case "로그아웃":
        dispatch(logout());
        if (login_method === "kakao") {
          window.location.href = KAKAO_LOGOUT_URL;
        } else {
          alert("로그아웃");
          navigate("/");
        }
        break;
      default:
    }
  };
  const keywordOnClick: Event<"span", "onClick"> = (e) => {
    const value = e.currentTarget.innerHTML;
    dispatch(closeModal());
    navigate("/map", { state: value });
  };

  const searchOnChange: Event<"input", "onChange"> = (e) => {
    const value = e.currentTarget.value;
    debouncedInput(value);
  };
  const handleOnKeyDown: Event<"input", "onKeyDown"> = (e) => {
    if (e.key === "Enter") {
      dispatch(closeModal());
      navigate("/map", { state: searchContext });
    }
  };

  return (
    <nav className="navigation-nav">
      <div className="header">
        <div className="logo">
          <GiHamburgerMenu onClick={sideNavOnClick} className="hambuger" />
          <Link to="/">
            <img src="/images/logo/logo.png" alt="logo" />
          </Link>
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
              <button
                aria-label="login button"
                onClick={() => navigate("/login")}
              >
                로그인
              </button>
              <button
                aria-label="signup button"
                onClick={() => navigate("/signup")}
              >
                회원가입
              </button>
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
