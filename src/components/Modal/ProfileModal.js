/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useDispatch } from "react-redux";
import { closeModal } from "../../store/ModalSlice";

import { Container, ExitButton } from "./CommonStyles";
import { interestData, reviewData, userData } from "./ModalData";

const ProfileModal = () => {
  const dispatch = useDispatch();

  const handleRate = (rate) => {
    const newArr = [];
    for (let i = 0; i < 5; i++) {
      rate - i >= 1
        ? newArr.push(<i className="bi bi-star-fill" key={i}></i>)
        : rate - i >= 0.5
        ? newArr.push(<i className="bi bi-star-half" key={i}></i>)
        : newArr.push(<i className="bi bi-star" key={i}></i>);
    }
    return newArr;
  };

  return (
    <Container width="600px" css={container}>
      <div>
        <div className="backGround" css={backGround}>
          <ExitButton css={exitButton} onClick={() => dispatch(closeModal())}>
            <i className="bi bi-x-lg"></i>
          </ExitButton>
        </div>
        <div className="userDataProfile" css={userDataProfile}>
          <div className="icon">
            <i className="bi bi-person"></i>
          </div>
          <div className="title">
            <h4>{userData.name}</h4>
            <span>프로필 수정</span>
          </div>
          <p>{userData.jobs}</p>
          <p>{userData.address}</p>
          <button>
            <i className="bi bi-chat-dots-fill"></i>
          </button>
        </div>
        <hr />
      </div>
      <div className="content" css={content}>
        <div className="interestDataed" css={interestDataed}>
          <div className="wrapper">
            <p>설정해 둔 관심사</p>
            <span>모두보기</span>
          </div>
          <div className="interestDatas">
            {interestData.map((data, idx) => {
              return (
                <div className="interestData" key={idx}>
                  <img alt={data.name} src={data.image}></img>
                </div>
              );
            })}
          </div>
        </div>
        <hr />

        <p>모임 후기</p>
        {reviewData.map((data, idx) => {
          return (
            <div key={idx}>
              <div className="review" css={review}>
                <div className="icon">
                  <i className="bi bi-person"></i>
                </div>
                <div className="leftTab">
                  <h4>{data.name}</h4>
                  <p>총 모임 참여 횟수 {data.totalCount}</p>
                </div>
                <div className="rightTab">
                  <div className="row">
                    <div className="rate">{handleRate(data.rate)}</div>
                    <p className="time">{data.date}</p>
                  </div>
                  <p className="reviewText">{data.comment}</p>
                </div>
              </div>
              <hr className="border" />
            </div>
          );
        })}

        <div className="recent" css={recent}>
          <p>최근 3개월간 모임 참여 내역</p>
          <div className="graph"></div>
        </div>
      </div>
    </Container>
  );
};
const container = css`
  text-align: left;
  padding: 20px;
  & span {
    color: #0645ad;
    font-size: 14px;
  }
  & span:hover {
    cursor: pointer;
  }

  & p {
    margin: 0;
  }

  & hr {
    border: 1px solid #d8d8d8;
  }
  & hr.border {
    margin: 20px 0;
  }
`;

const exitButton = css`
  color: #fff;
  top: -30px;
`;

const content = css`
  overflow-y: auto;

  -ms-overflow-style: none; /* 인터넷 익스플로러 */
  scrollbar-width: none; /* 파이어폭스 */

  &::-webkit-scrollbar {
    display: none; /* 크롬, 사파리, 오페라, 엣지 */
  }
`;
const backGround = css`
  position: relative;
  margin-bottom: 10px;
  height: 90px;
  background: #ff9896;
  border-radius: 20px 0px 0px 0px;
  background-image: url(${userData.backgroundImage});
  background-repeat: no-repeat;
  background-position: center;
`;

const userDataProfile = css`
  display: flex;
  flex-direction: column;
  margin-left: 145px;

  & .icon {
    position: absolute;
    width: 90px;
    height: 90px;
    border-radius: 50%;
    left: 52px;
    top: 91px;
    background: #d9d9d9;
    border: 4px solid #ffffff;
    text-align: center;
    align-items: center;
    font-size: 64px;
  }
  & .title {
    display: flex;
    align-items: center;
  }
  & .title h4 {
    font-size: 20px;
    margin: 0;
  }
  & .title span {
    margin: 0 0 0 10px;
  }

  & button {
    position: absolute;
    width: 42px;
    height: 42px;

    right: 20px;
    top: 117px;
    background: #fff;
    color: #666666;
    font-size: 24px;

    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
  }
`;

const interestDataed = css`
  margin: 5px 0;

  & .wrapper {
    display: flex;
    justify-content: space-between;
  }

  & .interestDatas {
    display: flex;
    padding: 0px;
    gap: 25px;
    overflow: scroll;
    overflow-x: auto;
    white-space: nowrap;

    -ms-overflow-style: none; /* 인터넷 익스플로러 */
    scrollbar-width: none; /* 파이어폭스 */
  }

  & .interestDatas::-webkit-scrollbar {
    display: none; /* 크롬, 사파리, 오페라, 엣지 */
  }

  & .interestData img {
    height: 128px;
    width: 192px;
    border-radius: 20px;
  }
`;

const review = css`
  position: relative;
  display: flex;
  margin: 20px 0 0 80px;

  & h4 {
    margin: 0;
  }

  & p {
    margin-top: 5px;
  }

  & p.time {
    margin: 0;
  }

  & .icon {
    position: absolute;
    width: 45px;
    height: 45px;
    left: -60px;
    top: 0;

    font-size: 28px;
    border-radius: 50%;
    background: #e8e8e8;
    text-align: center;
  }

  & .leftTab {
    margin-right: 40px;
    white-space: nowrap;
  }

  & .row {
    display: flex;
    gap: 20px;
  }

  & .rate i {
    margin-right: 5px;
  }
`;

const recent = css`
  & .graph {
    height: 140px;
    background: #efefef;
  }
`;

export default ProfileModal;
