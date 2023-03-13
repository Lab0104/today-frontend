import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalType: "",
  isOpen: false,
};

/** 모달 Type에 해당하는 모달 isOpen ? Open : close 처리 */
export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, actions) => {
      const { modalType } = actions.payload;
      state.modalType === "InfoModal"
        ? (state.isOpen = true)
        : state.modalType === modalType
        ? (state.isOpen = !state.isOpen)
        : (state.isOpen = true);

      state.modalType = modalType;
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
  },
});
export const { openModal, closeModal } = modalSlice.actions;
export const selectModal = (state) => state.modal; // State 전달

export default modalSlice.reducer;
