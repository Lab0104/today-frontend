import React from "react";
import { AiOutlineRight } from "react-icons/ai";

import "./Article.scss";

export default function Article() {
  return (
    <div className="article-container">
      <h3>Editor's pick</h3>
      <div className="article-list">
        <div className="article-item">
          <div className="item-picture">
            <div className="picture-icon">
              <AiOutlineRight />
            </div>
          </div>
          <div className="item-content">
            <h3 className="content-title">
              밴드 '솔루션스',
              <br />
              맥주 마시며 쓴 에세이
            </h3>
            <div className="content-index">
              <p>
                환한 조명 받고 선 무대 위 밴드는 갑자기 하늘에서 떠렁진 혜성처럼
                느껴진다.
              </p>
              <p>
                그렇긴 하지만, 그네들에게도 우리와 꼭 같은 평범한 일상과 삶의
                발자취가 존재했다...
              </p>
            </div>
            <button>자세히 보기 +</button>
          </div>
        </div>
        <div className="article-item">
          <div className="item-picture">
            <div className="picture-icon">
              <AiOutlineRight />
            </div>
          </div>
          <div className="item-content">
            <h3 className="content-title">
              온실가스 감축은
              <br />
              '발등의 불'
            </h3>
            <div className="content-index">
              <p>
                달콤한 마시멜로를 15분만 먹지 않고 참으면 한 개를 더 주겠다는
                제안을 했을 때, 당신은 어떠한 선택을 하겠는가?
              </p>
              <p>
                스탠포드대 월터 미셸 교수가 이 실험을 한 어린이들을 추적해보니
                먹지 않고 참아낸 아이들이...
              </p>
            </div>
            <button>자세히 보기 +</button>
          </div>
        </div>
      </div>
    </div>
  );
}
