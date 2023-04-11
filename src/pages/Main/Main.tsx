/** @jsxImportSource @emotion/react */
import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";

import MainPlaceHolder from "components/Skeleton/placeholders/MainPlaceHolder";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import Modal from "../../components/Modal/Modal";
import ModalMeeting from "../../components/ModalContents/ModalMeeting";
import MainBannerCarousel from "components/Carousel/MainBannerCarousel";
import CategoryList from "components/CategoryList/CategoryList";
import MeetingCarousel from "../../components/Carousel/MeetingCarousel";
import FooterDescription from "../../components/Footer/FooterDescription";
import FooterMenus from "../../components/Footer/FooterMenus";

import useWidthThrottle from "../../hooks/useWidthThrottle";
import { getCurrentTimeToNumber } from "utils/time";
import { useGetPostQuery } from "services/postApi";

import { TypeMeetingData } from "mainPageTypes";
import { TypeUser } from "mainPageTypes";
import "./Main.scss";

export default function Main() {
  const isLogged = useSelector((state: TypeUser) => state.user.isLogged);

  const currentTime = getCurrentTimeToNumber();
  const width = useWidthThrottle();
  const getCount = useCallback(() => {
    if (width < 660) return 1;
    else if (width < 930) return 2;
    else if (width < 1200) return 3;
    else return 4;
  }, [width]);
  const [itemCount, setItemCount] = useState(getCount());

  useEffect(() => {
    setItemCount(getCount());
  }, [getCount]);

  /* Modal Start */
  const [isOpen, setIsOpen] = useState(false);
  const [meetingsCount, setMeetingsCount] = useState(0);
  const [meetingIndex, setMeetingIndex] = useState(0);
  const handleOpen = (count: number, id: number) => {
    setIsOpen(true);
    setMeetingsCount((prev) => count);
    setMeetingIndex((prev) => id);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  /* Modal End */

  const { data, isLoading, error } = useGetPostQuery({
    name: isLogged ? "meetings/login" : "meetings",
  });
  // const dispatch = useDispatch();
  // const meetingList = useSelector(
  //   (state: { meetingList: listType[] | null }) => state.meetingList
  // );
  // const [meetings, setMeetings] = useState<null | listType[]>(null);
  // const { isLoading, error } = useQuery(
  //   "meeting",
  //   async () => {
  //     try {
  //       await fetch("/api/meetings")
  //         .then((res) => res.json())
  //         .then((json) => {
  //           console.log(json);
  //           setMeetings((prev) => json);
  //           dispatch(insertMeetingList(json));
  //         });
  //     } catch (err) {
  //       setMeetings(null);
  //       console.log(err);
  //     }
  //   },
  //   {
  //     refetchOnWindowFocus: false, // 윈도우 포커스 시 재실행 여부
  //     retry: 0, // 실패 시 재호출 횟수
  //   }
  // );
  if (isLoading) return <MainPlaceHolder />;
  if (error) return <div>404 Not Found</div>;

  return (
    <>
      <NavigationBar />
      <div className="main-container">
        {/* Modal Start */}
        <Modal isOpen={isOpen} onClose={handleClose} selector="modal-root">
          <div className="modalBody">
            {meetingsCount !== null && meetingIndex !== null ? (
              <ModalMeeting
                list={data && data[meetingsCount].list[meetingIndex]}
                onClose={handleClose}
                currentTime={currentTime}
              />
            ) : (
              <p>Not Found 404</p>
            )}
          </div>
        </Modal>
        {/* Modal End */}
        <MainBannerCarousel />
        <CategoryList />
        {data &&
          data.map((meeting: TypeMeetingData, idx: number) => (
            <div className="meetingList" key={idx}>
              <div className="title">{meeting.title}</div>
              <MeetingCarousel
                list={meeting.list}
                itemCount={itemCount}
                count={idx}
                onClickModal={handleOpen}
                currentTime={currentTime}
                isLogged={isLogged}
              />
            </div>
          ))}
      </div>
      <FooterDescription />
      <FooterMenus />
    </>
  );
}
