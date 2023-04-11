import React from "react";
import NavigationBar from "components/NavigationBar/NavigationBar";
import { useLocation } from "react-router";

import "./Notice.scss";

export default function Notice() {
  const location = useLocation();
  const banner = location.state.value + 1;

  return (
    <>
      <NavigationBar />
      <div className="notice-container">
        공지사항 및 이벤트 페이지
        {banner ? (
          <>
            <h1>{banner}번째 페이지입니다.</h1>
            <p>오늘 하루 내일 하루 과연 서비스 제목은 어찌될까</p>
          </>
        ) : (
          <>
            <h1>Page Not Found 404</h1>
          </>
        )}
      </div>
    </>
  );
}
