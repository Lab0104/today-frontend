import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { loginNavigationMenus, navigationMenus } from "utils/navigationMenus";
import "./Footer.scss";

const rules = [
  "개인정보처리방침",
  "홈페이지 이용약관",
  "위치정보 이용약관",
  "비회원 이용약관",
  "마이데이터 서비스 이용약관",
];

export default function Footer({ loginStatus }: { loginStatus?: boolean }) {
  const navigate = useNavigate();
  const navMenus = useMemo(
    () => (loginStatus ? loginNavigationMenus : navigationMenus),
    [loginStatus]
  );
  return (
    <div className="footer-container">
      <div className="footer-list">
        <span onClick={() => navigate("/")}>홈</span>
        <span onClick={() => navigate("/map")}>지도</span>
      </div>
      <div className="footer-list">
        {navMenus &&
          navMenus.map((items, idx) => (
            <div className="footer-nav-list" key={idx}>
              {items &&
                items.map((item, idx) => (
                  <span key={idx} onClick={() => navigate(item.href)}>
                    {item.name}
                  </span>
                ))}
            </div>
          ))}
      </div>
      <div className="footer-list">
        {rules && rules.map((item, idx) => <span key={idx}>{item}</span>)}
      </div>
    </div>
  );
}
