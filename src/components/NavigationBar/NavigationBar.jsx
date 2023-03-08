import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../app/userSlice";

import useWidthThrottle from "../../hooks/useWidthThrottle";

import "./NavigationBar.css";

export default function NavigationBar() {
  const width = useWidthThrottle();

  const isLogged = useSelector((state) => state.user.isLogged);
  const dispatch = useDispatch();

  const [dropdownStyle, setDropdownStyle] = useState({ visibility: "hidden" });
  const [search, setSearch] = useState("");
  const [hiddenSearch, setHiddenSearch] = useState(false);

  useEffect(() => {
    if (width > 475) {
      setHiddenSearch((val) => false);
    }
  }, [width]);

  const mouseOverHandler = () => {
    setDropdownStyle((cur) => ({ ...cur, visibility: "visible" }));
  };
  const mouseOutHandler = () => {
    setDropdownStyle((cur) => ({ ...cur, visibility: "hidden" }));
  };
  const searchOnChangeHandler = (e) => {
    const value = e.currentTarget.value;
    setSearch(value);
  };

  const routeOnClickHandler = (e) => {
    if (e.target.innerHTML === "로그아웃") {
      alert("로그아웃");
      dispatch(logout());
    }
  };

  const hiddenButton = () => {
    if (!search) {
      return;
    }
    console.log(search);
  };

  const searchOnClickHandler = (e) => {
    if (width < 475) {
      setHiddenSearch((val) => !val);
    } else {
      hiddenButton();
    }
  };
  const hiddenSearchOnClickHandler = (e) => {
    hiddenButton();
  };
  const isNotLogin = [{ name: "로그인", href: "/login" }];
  const isLogin = [
    { name: "내 정보", href: "/", onclick: routeOnClickHandler },
    { name: "알림", href: "/", onclick: routeOnClickHandler },
    { name: "채팅", href: "/", onclick: routeOnClickHandler },
    { name: "로그아웃", href: "/", onclick: routeOnClickHandler },
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
            value={search}
            placeholder="새로운 모임을 검색해보세요!"
            onChange={searchOnChangeHandler}
          />
          <button
            className="material-icons search-icon"
            onClick={searchOnClickHandler}
          >
            search
          </button>
        </div>
        <div className="user">
          <div
            className="dropdown"
            onMouseOver={mouseOverHandler}
            onMouseOut={mouseOutHandler}
          >
            <span className="material-icons user-icon">account_circle</span>
            <div className="dropdown-contents" style={dropdownStyle}>
              {isLogged ? mapping(isLogin) : mapping(isNotLogin)}
            </div>
          </div>
        </div>
      </div>
      {hiddenSearch && (
        <div className="hidden">
          <div className="hidden-search">
            <div className="search">
              <input
                type="text"
                value={search}
                placeholder="새로운 모임을 검색해보세요!"
                onChange={searchOnChangeHandler}
              />
              <button
                className="material-icons search-icon"
                onClick={hiddenSearchOnClickHandler}
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
