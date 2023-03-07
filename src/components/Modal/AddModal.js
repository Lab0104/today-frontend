/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";

import { useDispatch } from "react-redux";
import { closeModal } from "../../store/ModalSlice";
import { Container, ExitButton } from "./CommonStyles";

const AddModal = () => {
  const dispatch = useDispatch();
  return (
    <Container>
      <div className="modalTitle">
        <h4>모임 추가하기</h4>
        <ExitButton onClick={() => dispatch(closeModal())}>
          <i className="bi bi-x-lg"></i>
        </ExitButton>
      </div>
      <Content>
        <input className="title" placeholder="모임 제목"></input>
        <input
          className="titleAlt"
          placeholder="모임 소 제목(10글자 이내로 입력해 주세요.)"
        ></input>
        <input className="category" placeholder="모임 종류"></input>
        <input
          className="location"
          placeholder="모임 인원 / 위치 / 시간"
        ></input>
        <input className="deadLine" placeholder="모임 신청 마감 기한"></input>
        <input className="description" placeholder="모임 내용"></input>
        <button onClick={() => dispatch(closeModal())}>개설 하기</button>
      </Content>
    </Container>
  );
};

const Content = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  background: #eeeeee;
  padding: 10px;

  & input {
    height: 50px;
    border-radius: 15px;
  }

  & .description {
    height: 300px;
  }

  & button {
    height: 50px;
    border-radius: 10px;
  }
`;

export default AddModal;
