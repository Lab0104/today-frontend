/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";

import { useDispatch } from "react-redux";
import { openModal } from "../../store/ModalSlice";

const messages = [
  {
    userName: "철수",
    time: "오후 5:48",
    text: "안녕하세요 반갑습니다~",
    icons: "",
  },
  {
    userName: "me",
    time: "오후 5:48",
    text: "안녕하세요 반갑습니다~",
    icons: "",
  },
  {
    userName: "철수",
    time: "오후 5:48",
    text: "안녕하세요 반갑습니다~",
    icons: "",
  },
  {
    userName: "me",
    time: "오후 5:48",
    text: "안녕하세요 반갑습니다~",
    icons: "",
  },
  {
    userName: "me",
    time: "오후 5:48",
    text: "제 이름은 OOO입니다. 잘 부탁 드립니다~",
    icons: "",
  },
  {
    userName: "철수",
    time: "오후 5:48",
    text: "안녕하세요 반갑습니다~",
    icons: "",
  },
  {
    userName: "철수",
    time: "오후 5:48",
    text: "제 이름은 OOO입니다. 잘 부탁 드립니다~",
    icons: "",
  },
  {
    userName: "me",
    time: "오후 6:48",
    text: "스크롤 테스트 위한 부분",
    icons: "",
  },
];
const ChatModal = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState(messages);
  return (
    <div css={container}>
      <div className="modalTitle">
        <h4>채팅</h4>
        <button
          css={exitButton}
          onClick={() =>
            dispatch(
              openModal({
                modalType: "ChatModal",
                isOpen: true,
              })
            )
          }
        >
          <i className="bi bi-caret-left"></i>
        </button>
      </div>
      <div className="content" css={content}>
        {message.map((data, idx) => {
          return (
            <div key={idx} className="box">
              {data.userName === "me" ? (
                <div className="row reverse">
                  <p className="text reverse">{data.text}</p>
                  <p className="time reverse">{data.time}</p>
                </div>
              ) : (
                <div className="box2">
                  <i className="bi bi-person icon"></i>
                  <p className="name">{data.userName}</p>
                  <div className="row">
                    <p className="text">{data.text}</p>
                    <p className="time">{data.time}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div css={inputBox}>
        <input />
        <button>전송</button>
      </div>
    </div>
  );
};

const container = css`
  position: absolute;
  width: 30vw;
  height: 75vh;
  right: 102px;
  top: 20px;
  z-index: 10;
  border-radius: 10px;
  display: flex;
  flex-direction: column;

  background: #fff;
`;

const exitButton = css`
  position: absolute;
  height: 22.4px;
  width: 22.4px;
  right: 0;
  top: 0;
  margin: 21.28px;
  background: #fff;
  color: black;
  padding: 0;
  font-size: 16px;
`;

const content = css`
  display: flex;
  height: 100%;
  flex-direction: column;
  background: #eee;
  overflow-y: scroll;
  padding: 5px 5px 0;

  -ms-overflow-style: none; /* 인터넷 익스플로러 */
  scrollbar-width: none; /* 파이어폭스 */

  &::-webkit-scrollbar {
    display: none; /* 크롬, 사파리, 오페라, 엣지 */
  }

  & .icon {
    position: absolute;
    left: 10px;
    font-size: 30px;
    top: 50%;
    transform: translate(0%, -50%);
  }

  & p {
    margin: 0;
  }

  & div.box {
    position: relative;
    margin-bottom: 5px;
    padding: 5px;
    text-align: left;
  }
  & div.box2 {
    margin-left: 50px;
  }

  & div.row {
    display: flex;
    align-items: Flex-end;
  }

  & div.row.reverse {
    flex-direction: row-reverse;
  }

  & .time {
    color: gray;
    font-size: 10px;
    padding-left: 20px;
    white-space: nowrap;
  }
  & .time.reverse {
    padding-left: 0;
    padding-right: 20px;
  }

  & .text {
    background: #fff;
    padding: 10px 15px;
    border-radius: 10px;
  }

  & .text.reverse {
    background: #8788dd;
  }
`;

const inputBox = css`
  display: flex;
  position: relative;
  align-items: center;
  & input {
    width: 100%;
  }
  & button {
    position: absolute;
    right: 10px;
    padding: 5px 10px;
  }
`;

export default ChatModal;
