/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Container, Content } from "./CommonStyles";
import { useGetPostQuery, useUpdatePostMutation } from "../../services/postApi";

const FilterModal = () => {
  // 자동으로 데이터를 패치하고 쿼리 값을 가져오는 쿼리 hook을 사용
  // const { data, error, isLoading } = useGetPostQuery({ name: "meetings" });
  // 각각의 hooks은 생성된 엔드포인트에서도 접근 가능함

  const { data, isLoading, error } = useGetPostQuery({ name: "search" });
  const mutation = useUpdatePostMutation();
  const deleteMeeting = mutation[0];
  return (
    <Container width="300px">
      <Content>
        {error ? (
          <>Oh no, there was an error</>
        ) : isLoading ? (
          <>Loading...</>
        ) : data ? (
          <>
            {data.map((listData, idx) => {
              return (
                <div key={idx}>
                  <p>
                    {idx}번 {listData.title}
                  </p>
                  <p>{listData.address}</p>
                  <button
                    onClick={() => {
                      deleteMeeting({
                        name: "update",
                        value: listData.title,
                      });
                    }}
                  >
                    삭제
                  </button>
                  <hr></hr>
                </div>
              );
            })}
          </>
        ) : null}
      </Content>
    </Container>
  );
};

export default FilterModal;
