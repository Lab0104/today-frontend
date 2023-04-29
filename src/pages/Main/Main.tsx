/** @jsxImportSource @emotion/react */
import { useSelector } from "react-redux";
import MeetingCardModal from "components/Modal/MeetingCardModal";
import MainPlaceHolder from "components/Skeleton/placeholders/MainPlaceHolder";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import MainBannerCarousel from "components/Carousel/MainBannerCarousel";
import CategoryList from "components/CategoryList/CategoryList";
import MeetingCarousel from "../../components/Carousel/MeetingCarousel";
import FooterDescription from "../../components/Footer/FooterDescription";
import FooterMenus from "../../components/Footer/FooterMenus";

import { getCurrentTimeToNumber } from "utils/time";
import { useGetPostQuery } from "services/postApi";

import { TypeMeetingData, TypeModalState } from "mainPageTypes";
import { TypeUser } from "userTypes";
import "./Main.scss";

export default function Main() {
  console.log("main");

  const currentTime = getCurrentTimeToNumber();
  const { user_id: userId, isLogged } = useSelector(
    (state: { user: TypeUser }) => state.user
  );
  const { isOpen } = useSelector(
    (state: { mainModal: TypeModalState }) => state.mainModal
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
    return <div>404 Not Found</div>;
  }

  return (
    <>
      <NavigationBar />
      <div className="main-container">
        {/* Modal Start */}
        <MeetingCardModal isOpen={isOpen} selector="modal-root" />
        {/* Modal End */}
        <MainBannerCarousel />
        <CategoryList />
        {meetingData &&
          meetingData.map((meeting: TypeMeetingData, idx: number) => (
            <div className="meetingList" key={idx}>
              <p className="list-title">{meeting.title}</p>
              <MeetingCarousel list={meeting.list} currentTime={currentTime} />
            </div>
          ))}
      </div>
      <FooterDescription />
      <FooterMenus />
    </>
  );
}
