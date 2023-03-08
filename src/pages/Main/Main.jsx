/** @jsxImportSource @emotion/react */
import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import axios from "axios";
import { useQuery } from "react-query";
import Carousel from "../../components/Carousel/Carousel";
import FlexColumnContainer from "../../components/FlexColumnContainer/FlexColumnContainer";
import FlexwrapContainer from "../../components/FlexwrapContainer/FlexwrapContainer";
import Pagination from "../../components/Pagination/Pagination";
import Skeleton from "../../components/Skeleton/Skeleton";
import Modal from "../../components/Modal/Modal";
import ModalMeeting from "../../components/ModalContents/ModalMeeting";
import "./Main.css";
import FooterDescription from "../../components/Footer/FooterDescription";
import FooterMenus from "../../components/Footer/FooterMenus";

import useWidthThrottle from "../../hooks/useWidthThrottle";

const Placeholder = () => (
  <FlexColumnContainer style={{ width: "100%" }}>
    <Skeleton width={100} height={30} rounded />
    <FlexwrapContainer>
      {Array.from({ length: 3 }).map((_, index) => (
        <Skeleton
          key={index}
          style={{ width: "30%", height: "100px" }}
          rounded
        />
      ))}
    </FlexwrapContainer>
  </FlexColumnContainer>
);
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
const MainContainer = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  padding: 30px;
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

function Main() {
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
  const [meetingsCount, setMeetingsCount] = useState(null);
  const [meetingIndex, setMeetingIndex] = useState(null);
  const handleOpen = (count, id) => {
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

  const handlePageChange = (currentPage) => {
    setPage(currentPage);
  };
  /* Pagination End */

  const [meetings, setMeetings] = useState(null);
  const { isLoading, error } = useQuery(
    "meeting",
    async () => {
      await fetch("/meetings")
        .then((res) => res.json())
        .then((json) => {
          setMeetings((prev) => json);
        });
    },
    {
      refetchOnWindowFocus: false, // 윈도우 포커스 시 재실행 여부
      retry: 0, // 실패 시 재호출 횟수
    }
  );
  if (isLoading)
    return Array.from({ length: 3 }).map((_, index) => (
      <Placeholder key={index} />
    ));
  if (error) return <div>404 Not Found</div>;

  return (
    <>
      <MainContainer>
        {/* Modal Start */}
        <Modal isOpen={isOpen} onClose={handleClose} selector={"modal-root"}>
          <ModalBody>
            {meetingsCount !== null && meetingIndex !== null ? (
              <ModalMeeting
                list={meetings[meetingsCount].list[meetingIndex]}
                onClose={handleClose}
              />
            ) : (
              <p>Not Found 404</p>
            )}
          </ModalBody>
        </Modal>
        {/* Modal End */}

        {/* Pagination Start */}
        <div style={{ display: "" }}>
          <ul>
            {items.map((item) => (
              <li key={item._id}>{item.name}</li>
            ))}
          </ul>
          <Pagination
            count={totalPages}
            page={page}
            onPageChange={handlePageChange}
          ></Pagination>
        </div>
        {/* Pagination End */}

        {isLoading
          ? Array.from({ length: 3 }).map((_, index) => (
              <Placeholder key={index} />
            ))
          : meetings &&
            meetings.map((meeting, idx) => (
              <MeetingList key={idx}>
                <Title>{meeting.title}</Title>
                <Carousel
                  list={meeting.list}
                  itemCount={itemCount}
                  count={idx}
                  onClickModal={handleOpen}
                />
              </MeetingList>
            ))}
      </MainContainer>
      <FooterDescription />
      <FooterMenus />
    </>
  );
}

export default Main;
