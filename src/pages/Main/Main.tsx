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

import { TypeMeetingData } from "mainPageTypes";
import { TypeUser } from "userTypes";
import "./Main.scss";
import { meetingApi } from "store/MeetingDB";
import EditorPick from "components/EditorPick/EditorPick";
import { useMeetingQuery } from "hooks/Queries/useMeetingQuery";

const banners = [
  "images/banner/banner1.png",
  "images/banner/banner2.png",
  "images/banner/banner3.png",
  "images/banner/banner4.png",
];
const bannerBackgroundColorList = [
  "#e4e4e4",
  "red",
  "green",
  "yellow",
  "black",
  "white",
];

export default function Main() {
  console.log("main");

  const currentTime = getCurrentTimeToNumber();
  const { user_id: userId, isLogged } = useSelector(
    (state: { user: TypeUser }) => state.user
  );

  const {
    data: meetingData,
    isLoading: meetingLoading,
    isError: meetingError,
  } = useMeetingQuery(userId);

  const selectApi = () => (meetingError ? meetingApi : meetingData);

  if (meetingLoading) {
    console.log("loading!");
    return <MainPlaceHolder />;
  }
  return (
    <>
      <NavigationBar />
      <div className="main-container">
        <MainBannerCarousel
          bannerList={banners}
          backgroundColorList={bannerBackgroundColorList}
        />
        <CategoryList />
        <EditorPick />
        <Advertisement url="/images/advertisement/advertisement1.png" />
        {selectApi().map((meeting: TypeMeetingData, idx: number) => (
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
