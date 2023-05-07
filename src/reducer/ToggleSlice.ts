import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: ToggleState = {
  toggleButton: [false, false, false, false],
  toggleSort: [true, false, false, false],
};
type ToggleState = {
  toggleButton: boolean[];
  toggleSort: boolean[];
};

/** Modal 창 및 MapPage에서 토글 창 연동 필요 */
export const toggleSlice = createSlice({
  name: "toggle",
  initialState,
  reducers: {
    toggleButtons: (state, actions: PayloadAction<{ idx: number }>) => {
      const { idx } = actions.payload;
      const list = [false, false, false, false];
      list[idx] = !state.toggleButton[idx];
      state.toggleButton = [...list];
    },
    toggleSorts: (state, actions: PayloadAction<{ idx: number }>) => {
      const list = [false, false, false, false];
      list[actions.payload.idx] = true;
      state.toggleSort = [...list];
    },
    toggleClose: (state) => {
      const list = [false, false, false, false];
      state.toggleButton = [...list];
    },
  },
});
export const { toggleButtons, toggleSorts, toggleClose } = toggleSlice.actions;
export default toggleSlice.reducer;
