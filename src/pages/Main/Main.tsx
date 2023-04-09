/** @jsxImportSource @emotion/react */
import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import axios from "axios";
import { useQuery } from "react-query";

import NavigationBar from "../../components/NavigationBar/NavigationBar";
import MeetingCarousel from "../../components/Carousel/MeetingCarousel";
import CardCarousel from "../../components/Carousel/CardCarousel";
import FlexColumnContainer from "../../components/FlexColumnContainer/FlexColumnContainer";
import FlexwrapContainer from "../../components/FlexwrapContainer/FlexwrapContainer";
import Pagination from "../../components/Pagination/Pagination";
import Skeleton from "../../components/Skeleton/Skeleton";
import Modal from "../../components/Modal/Modal";
import ModalMeeting from "../../components/ModalContents/ModalMeeting";
import FooterDescription from "../../components/Footer/FooterDescription";
import FooterMenus from "../../components/Footer/FooterMenus";

import useWidthThrottle from "../../hooks/useWidthThrottle";
import { getCurrentTimeToNumber } from "utils/time";

export type listType = {
  title: string;
  list: {
    meet_id: number;
    title: string;
    maximum_participants: number;
    registered_participants_count: number;
    address: string;
    deadline: string;
    date: string;
    category: string;
    like: boolean;
  }[];
};

function Placeholder() {
  return (
    <FlexColumnContainer style={{ width: "100%" }}>
      <Skeleton width={100} height={30} rounded />
      <FlexwrapContainer>
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton
            key={index}
            width={30}
            widthUnit={"%"}
            height={100}
            rounded
          />
        ))}
      </FlexwrapContainer>
    </FlexColumnContainer>
  );
}

export default function Main() {
  const currentTime = getCurrentTimeToNumber();
  const width = useWidthThrottle();
  const [itemCount, setItemCount] = useState(0);
  useEffect(() => {
    if (width < 660) setItemCount(1);
    else if (width < 930) setItemCount(2);
    else if (width < 1200) setItemCount(3);
    else setItemCount(4);
  }, [width]);

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

  /* Pagination Start */
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const params = { page, size: 10 };
      const {
        data: { totalPages, data },
      } = await axios.get("https://api.instantwebtools.net/v1/passenger", {
        params,
      });
      setTotalPages(totalPages);
      setItems((prev) => data);
    };
    fetch();
  }, [page]);

  const handlePageChange = (currentPage: number) => {
    setPage(currentPage);
  };
  /* Pagination End */

  const [meetings, setMeetings] = useState<null | listType[]>(null);
  const { isLoading, error } = useQuery(
    "meeting",
    async () => {
      try {
        await fetch("/api/meetings")
          .then((res) => res.json())
          .then((json) => {
            setMeetings((prev) => json);
          });
      } catch (err) {
        setMeetings(null);
        console.log(err);
      }
    },
    {
      refetchOnWindowFocus: false, // 윈도우 포커스 시 재실행 여부
      retry: 0, // 실패 시 재호출 횟수
    }
  );
  if (isLoading)
    return (
      <>
        {Array.from({ length: 4 }).map((_, idx) => (
          <Placeholder key={idx} />
        ))}
      </>
    );
  if (error) return <div>404 Not Found</div>;

  return (
    <>
      {meetings !== null ? (
        <>
          <NavigationBar />
          <MainContainer width={width}>
            {/* Modal Start */}
            <Modal isOpen={isOpen} onClose={handleClose} selector="modal-root">
              <ModalBody>
                {meetingsCount !== null && meetingIndex !== null ? (
                  <ModalMeeting
                    list={
                      meetings && meetings[meetingsCount].list[meetingIndex]
                    }
                    onClose={handleClose}
                    currentTime={currentTime}
                  />
                ) : (
                  <p>Not Found 404</p>
                )}
              </ModalBody>
            </Modal>
            {/* Modal End */}
            <CardCarousel />
            {/* Pagination Start */}
            <div style={{ display: "none", marginTop: "100px" }}>
              <ul>
                {items.map((item: { _id: number; name: string }) => (
                  <li key={item._id}>{item.name}</li>
                ))}
              </ul>
              <Pagination
                count={totalPages}
                page={page}
                onPageChange={handlePageChange}
              />
            </div>
            {/* Pagination End */}
            <ListContainer>
              {isLoading
                ? Array.from({ length: 3 }).map((_, index) => (
                    <Placeholder key={index} />
                  ))
                : meetings &&
                  meetings.map((meeting, idx) => (
                    <MeetingList key={idx}>
                      <Title>{meeting.title}</Title>
                      <MeetingCarousel
                        list={meeting.list}
                        itemCount={itemCount}
                        count={idx}
                        onClickModal={handleOpen}
                        currentTime={currentTime}
                      />
                    </MeetingList>
                  ))}
            </ListContainer>
          </MainContainer>
          <FooterDescription />
          <FooterMenus />
        </>
      ) : (
        <div>Page not Found 404</div>
      )}
    </>
  );
}

const ListContainer = styled.div``;
const MeetingList = styled.div`
  display: flex;
  flex-direction: column;
  margin: 40px 0;
`;
const Title = styled.div`
  text-align: left;
  font-size: 20px;
  font-weight: 700;
`;
const MainContainer = styled.div<{ width: number }>`
  max-width: 1120px;
  min-width: 375px;
  padding: 30px;
  margin: 0 auto;
  box-sizing: border-box;
  ${({ width }) =>
    width > 600
      ? css`
          padding-top: 120px;
        `
      : css`
          padding-top: 180px;
        `}
`;
const ModalBody = styled.div`
  border-radius: 8px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  background-color: #fff;
  max-height: calc(100vh - 16px);
  overflow: hidden auto;
  position: relative;
  padding-block: 12px;
  padding-inline: 24px;
`;
