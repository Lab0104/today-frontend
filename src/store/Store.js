import { configureStore, createSlice } from "@reduxjs/toolkit";
import ModalSlice from "./ModalSlice";

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

export default configureStore({
  reducer: {
    searchKeyword: searchKeyword.reducer,
    searchData: searchData.reducer,
    modal: ModalSlice,
  },
});
