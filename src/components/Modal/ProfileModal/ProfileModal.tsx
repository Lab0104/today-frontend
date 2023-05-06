import { useDispatch } from "react-redux";
import { closeModal } from "../../../reducer/ModalSlice";
import { toggleButtons } from "../../../reducer/ToggleSlice";

import { interestData, reviewData, userData } from "../ModalData.js";

import "./ProfileModal.scss";
import { openModal } from "reducer/ModalSlice";

const ProfileModal = () => {
  const dispatch = useDispatch();

  const handleRate = (rate: any) => {
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
    <div className="container-box-profile">
      <div className="profile-header">
        <div className="background">
          <button
            className="exit-button"
            onClick={() => {
              dispatch(closeModal());
              dispatch(toggleButtons({ idx: 0 }));
            }}
          >
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        <div className="userDataProfile">
          <div className="icon">
            <i className="bi bi-person"></i>
          </div>
          <div className="title">
            <h4>{userData.name}</h4>
          </div>
          <div className="row">
            <i className="bi bi-hand-thumbs-up-fill"></i>
            <p>{userData.jobs}</p>
          </div>
          <div className="row">
            <i className="bi bi-geo-alt-fill"></i>
            <p>{userData.address}</p>
          </div>
          <div className="buttons">
            <button
              onClick={() => {
                dispatch(openModal({ modalType: "ChatInModal" }));
                dispatch(toggleButtons({ idx: 0 }));
                dispatch(toggleButtons({ idx: 2 }));
              }}
            >
              <i className="bi bi-chat-dots-fill"></i>
            </button>
            <button>
              <i className="bi bi-pencil-fill"></i>
            </button>
          </div>
        </div>
      </div>

      <div className="content-box-profile">
        <div className="interestDataed">
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
        <div className="review-box">
          {reviewData.map((data, idx) => {
            return (
              <div key={idx}>
                <div className="review">
                  <div className="leftTab">
                    <div className="icon">
                      <i className="bi bi-person"></i>
                    </div>
                    <h4>{data.name}</h4>
                    <p>총 참여 횟수 {data.totalCount}</p>
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
        </div>

        <div className="recent">
          <p>최근 3개월간 모임 참여 내역</p>
          <div className="graph"></div>
        </div>
      </div>
    </div>
  );
};
export default ProfileModal;
