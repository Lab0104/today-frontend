import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toggleButton: [false, false, false, false],
  toggleMetting: [],
  toggleType: "",
  isOpen: false,
};

/** Modal 창 및 MapPage에서 토글 창 연동 필요 */
export const toggleSlice = createSlice({
  name: "toggle",
  initialState,
  reducers: {
    toggleButtons: (state, actions) => {
      const { idx } = actions.payload;
      const list = [false, false, false, false];
      list[idx] = !state.toggleButton[idx];
      state.toggleButton = [...list];
    },
  },
});
export const { toggleButtons } = toggleSlice.actions;
export const selectToggle = (state) => state.toggle; // State 전달

export default toggleSlice.reducer;
