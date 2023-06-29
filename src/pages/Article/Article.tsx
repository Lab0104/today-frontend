import React from "react";
import styled from "@emotion/styled";
import { useLocation, useNavigate } from "react-router-dom";

import NavigationBar from "components/NavigationBar/NavigationBar";
import { article_list } from "../../components/EditorPick/article_contents";
import "./Article.scss";

const ArticleImage = styled.div<{ src: string }>`
  width: 50%;
  padding-top: 35%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url(${({ src }) => src});

  @media (max-width: 768px) {
    width: 100%;
    padding-top: 55%;
  }
`;

export default function Article() {
  const navigate = useNavigate();
  const location = useLocation();
  const article_id = location.state.article_id;

  const onButtonClick = (keyword: string) => {
    navigate("/map", { state: keyword });
  };

  return (
    <>
      <NavigationBar />
      <div className="article-container">
        <div className="article-contents">
          <h3>{article_list[article_id].title}</h3>
          <hr />
          <ArticleImage src={article_list[article_id].image_src} />
          <div className="article-paragraph">
            {article_list[article_id].contents &&
              article_list[article_id].contents.map((item, idx) => (
                <p key={idx}>{item}</p>
              ))}
          </div>
          <span>{article_list[article_id].date}</span>
          <div className="article-button">
            <button aria-label="go back button" onClick={() => navigate(-1)}>
              뒤로가기
            </button>
            <button
              aria-label="move to map page"
              onClick={() => onButtonClick(article_list[article_id].keyword)}
            >
              관련 모임으로 바로가기
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
