import { configureStore, createSlice } from "@reduxjs/toolkit";

// const { kakao } = window;

// const kakaoMap = createSlice({
//   name: "kakaoMap",
//   initialState: null,
//   reducers: {
//     initMap(state, action) {
//       //좌표값
//       const center = new kakao.maps.LatLng(37.566826, 126.9786567);
//       const options = {
//         center,
//         level: 5,
//       };
//       return new kakao.maps.Map(action.payload, options);
//     },
//   },
// });

const searchKeyword = createSlice({
  name: "searchKeyword",
  initialState: "",
  reducers: {
    changeKeyword(state, a) {
      return a.payload;
    },
  },
});
export let { changeKeyword } = searchKeyword.actions;

const searchData = createSlice({
  name: "searchData",
  initialState: [],
  reducers: {
    changeData(state, a) {
      return a.payload;
    },
  },
});

export let { changeData } = searchData.actions;

const markersData = createSlice({
  name: "markersData",
  initialState: [],
  reducers: {
    changeMarkers(state, a) {
      return a.payload;
    },
    pushMarkers(state, a) {
      console.log(a.payload);
      state.push(a.payload);
    },
  },
});

export let { changeMarkers, pushMarkers } = markersData.actions;

const infowindow = createSlice({
  name: "infowindow",
  initialState: null,
});

export default configureStore({
  reducer: {
    // kakaoMap: kakaoMap.reducer,
    searchKeyword: searchKeyword.reducer,
    searchData: searchData.reducer,
    markersData: markersData.reducer,
    infowindow: infowindow.reducer,
  },
});
