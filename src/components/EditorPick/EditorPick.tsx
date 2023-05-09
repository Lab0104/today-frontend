import React from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineRight } from "react-icons/ai";

import { article_list } from "./article_contents";
import "./EditorPick.scss";

export default function EditorPick() {
  const navigate = useNavigate();

  const onButtonClick = (article_id: number) => {
    console.log(article_id);

    navigate("/article", { state: { article_id: article_id } });
  };

  return (
    <div className="editor-pick-container">
      <h3>Editor's pick</h3>
      <div className="pick-list">
        {article_list &&
          article_list.map((item, idx) => (
            <div className="pick-item" key={idx}>
              <div className="picture-icon">
                <AiOutlineRight />
              </div>
              <div className="item-content">
                <h4 className="content-title">{item.title}</h4>
                <div className="content-index">
                  {item.contents &&
                    item.contents.map((content, idx) => (
                      <p key={idx}>{content}</p>
                    ))}
                </div>
                <button onClick={() => onButtonClick(item.id)}>
                  자세히 보기 +
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
