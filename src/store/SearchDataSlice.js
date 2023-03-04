import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchData: [],
};

export const SearchDataSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    changeData(state, actions) {
      const { searchData } = actions.payload;
      state.searchData = searchData;
    },
  },
});
export const { changeData } = SearchDataSlice.actions;
export const selectSearchData = (state) => state.search;

export default SearchDataSlice.reducer;
