import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const mainApi = createApi({
  reducerPath: "mainApi", // 없는 경우는 api가 디폴트로 정해진다.
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  // 재 랜드링을 위한 테그 설정. RTK Query의 기본 랜드링은 tag시스템으로 동작한다.
  // 만약 자료가 수정되었을 때 Tag를 invalides로 설정하면 해당 tag가 설정된
  // 캐쉬 자료를 리플레시하는 기본 tag 이름 정의 , 예 ['Users', 'Posts']
  tagTypes: ["main"],
  //각각의 query(get)/mutation(set) 동작을 여기서 정의한다.
  endpoints: (builder) => ({
    // build.query는 get에 해당되는 query이다.
    getMeetingList: builder.query({
      query: () => ({ url: "meetings" }),
      // query: (id) => ({ url: `post/${id}` }),
      // arg는 호출하는 곳에 전달한 기본 parameter 값, 여기서는 id

      // 쿼리 결과에 tag을 주입한다. 나중에 invalidesTags로 재 호출/랜드링한다.
      providesTags: (result, error, arg) => [{ type: "main" }],
    }),

    // mutation은 데이터 조작을 정의한다, POST, PUT, DELETE, PATCH
    postMeetingList: builder.mutation({
      query: () => ({
        url: "meetings",
        method: "GET",
      }),

      //Post로 등록된 모든 캐쉬 내용을 업데이트, tag에 따라 수정한 곳만 업데이트 가능.
      // [{type:'Post', id}]가 등록되어 있고 이 것을 invalidatesTags로 호출하면 행당 id만 재 호출/랜드링.
      invalidatesTags: (result, error, arg) => [{ type: "main" }],
    }),
  }),
});
//정의된 endpoints을 기반으로 자동 생성됨. getPost=>useGetPostQuery
export const { useGetMeetingListQuery, usePostMeetingListMutation } = mainApi;
