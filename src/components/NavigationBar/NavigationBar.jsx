/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { css } from "@emotion/react";

import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/userSlice";

import useWidthThrottle from "../../hooks/useWidthThrottle";

import "./NavigationBar.css";

const visible = css`
  display: none;
`;

export default function NavigationBar() {
  const navigate = useNavigate();
  const width = useWidthThrottle();

  const isLogged = useSelector((state) => state.user.isLogged);
  const dispatch = useDispatch();

  const [dropdownStyle, setDropdownStyle] = useState({ visibility: "hidden" });
  const [searchContext, setSearchContext] = useState("");
  const [searchHiddenStatus, setSearchHiddenStatus] = useState(false);
  const [searchToggle, setSearchToggle] = useState(true);

  useEffect(() => {
    if (width > 475) {
      setSearchHiddenStatus(false);
      setSearchToggle(false);
    } else {
      setSearchHiddenStatus(true);
      setSearchToggle(true);
    }
  }, [width]);

  const dropdownMouseOver = () => {
    setDropdownStyle((prev) => ({ ...prev, visibility: "visible" }));
  };
  const dropdownMouseOut = () => {
    setDropdownStyle((prev) => ({ ...prev, visibility: "hidden" }));
  };
  const searchOnChange = (e) => {
    const value = e.currentTarget.value;
    setSearchContext(value);
  };

  const routeOnClick = (e) => {
    if (e.target.innerHTML === "로그아웃") {
      alert("로그아웃");
      dispatch(logout());
    }
  };

  const searchOnClick = () => {
    if (searchHiddenStatus) {
      setSearchToggle((prev) => !prev);
    } else {
      navigate("/map", { state: searchContext });
    }
  };
  const hiddenSearchOnClick = () => {
    navigate("/map", { state: searchContext });
  };
  const handleOnKeyDown = (e) => {
    if (e.key === "Enter") {
      navigate("/map", { state: searchContext });
    }
  };
  const isNotLogin = [
    { name: "로그인", href: "/login", onclick: routeOnClick },
  ];
  const isLogin = [
    { name: "내 정보", href: "/", onclick: routeOnClick },
    { name: "알림", href: "/", onclick: routeOnClick },
    { name: "채팅", href: "/", onclick: routeOnClick },
    { name: "로그아웃", href: "/", onclick: routeOnClick },
  ];
  const mapping = (arr) => {
    return arr.map((item) => (
      <Link to={item.href} key={item.name} onClick={item.onclick}>
        {item.name}
      </Link>
    ));
  };
  return (
    <>
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
          <div
            className="dropdown"
            onMouseOver={dropdownMouseOver}
            onMouseOut={dropdownMouseOut}
          >
            <span className="material-icons user-icon">account_circle</span>
            <div className="dropdown-contents" style={dropdownStyle}>
              {isLogged ? mapping(isLogin) : mapping(isNotLogin)}
            </div>
          </div>
        </div>
      </div>
      {searchHiddenStatus && (
        <div className="hidden" css={searchToggle ? {} : visible}>
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
                onClick={hiddenSearchOnClick}
              >
                search
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
