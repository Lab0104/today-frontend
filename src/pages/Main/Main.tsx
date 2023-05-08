/** @jsxImportSource @emotion/react */
import { useSelector } from "react-redux";
import MainPlaceHolder from "components/Skeleton/placeholders/MainPlaceHolder";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import MainBannerCarousel from "components/Carousel/MainBannerCarousel";
import CategoryList from "components/CategoryList/CategoryList";
import Advertisement from "components/Advertisement/Advertisement";
import MeetingCarousel from "../../components/Carousel/MeetingCarousel";
import Footer from "components/Footer/Footer";

import { getCurrentTimeToNumber } from "utils/time";
import { useGetPostQuery } from "services/postApi";

import { TypeMeetingData } from "mainPageTypes";
import { TypeUser } from "userTypes";
import "./Main.scss";
import { meetingApi } from "store/MeetingDB";
import Article from "components/Article/Article";

export default function Main() {
  console.log("main");

  const currentTime = getCurrentTimeToNumber();
  const { user_id: userId, isLogged } = useSelector(
    (state: { user: TypeUser }) => state.user
  );
  const {
    data: meetingData,
    isLoading: meetingLoading,
    error: meetingError,
  } = useGetPostQuery({
    name: isLogged ? `meetings/login?user_id=${userId}` : "meetings",
  });

  if (meetingLoading) {
    console.log("loading!");
    return <MainPlaceHolder />;
  }
  if (meetingError) {
    console.log("error!");
    return (
      <>
        <NavigationBar />
        <div className="main-container">
          <MainBannerCarousel />
          <CategoryList />
          <Article />
          <Advertisement />
          {meetingApi.map((meeting: TypeMeetingData, idx: number) => (
            <div className="meetingList" key={idx}>
              <p className="list-title">{meeting.title}</p>
              <MeetingCarousel list={meeting.list} currentTime={currentTime} />
            </div>
          ))}
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <NavigationBar />
      <div className="main-container">
        <MainBannerCarousel />
        <CategoryList />
        <Article />
        <Advertisement />
        {meetingData &&
          meetingData.map((meeting: TypeMeetingData, idx: number) => (
            <div className="meetingList" key={idx}>
              <p className="list-title">{meeting.title}</p>
              <MeetingCarousel list={meeting.list} currentTime={currentTime} />
            </div>
          ))}
      </div>
      <Footer loginStatus={isLogged} />
    </>
  );
}
