/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { meetingData } from "./meetingList";

function AdMeetingCard() {
  return (
    <div>
      <div className="largeBox" css={largeBox}>
        <div className="title">
          <i className="bi bi-badge-ad"></i>
          <div className="text">
            <p>{meetingData.title}</p>
            <p>{meetingData.subTitle}</p>
          </div>
          <i className="bi bi-heart like"></i>
          {/* <i className="bi bi-heart-fill"></i> */}
        </div>
        <hr className="line"></hr>
        <div css={content}>
          <p>{meetingData.address}</p>
          <p>
            {meetingData.startDate} ~ {meetingData.endDate}
          </p>
          <p>
            <span>{meetingData.status ? "모집중" : "모집종료"}</span> |
            {meetingData.closedDate} - 모집마감
          </p>
          <p className="tag">준비물 없음 | 초보자 환영 | 모임 시간 준수</p>
          <p className="time">30분 전</p>
        </div>
      </div>
      <hr />
    </div>
  );
}

const largeBox = css`
  padding: 10px 20px;

  & .title {
    display: flex;
    text-align: left;
    align-items: center;
    margin-bottom: 10px;
  }
  & .title i.like {
    position: absolute;
    right: 20px;
  }
  & div.text p {
    margin: 0 18px;
    font-weight: bold;
  }
  & hr.line {
    color: #999999;
    width: 425px;
  }
`;
const content = css`
  position: relative;
  text-align: left;
  margin: 0 25.5px;

  & span {
    color: #227b3d;
  }
  & p {
    margin: 8px 0;
  }
  & p.time {
    position: absolute;
    width: auto;
    left: 90%;
    top: 90%;
    margin: 0;
    font-size: 12.8px;
    white-space: nowrap;
  }
`;

export default AdMeetingCard;
