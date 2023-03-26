import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ModalState = {
  modalType: string;
  isOpen: boolean;
};

const initialState: ModalState = {
  modalType: "",
  isOpen: false,
};

/** 모달 Type에 해당하는 모달 isOpen ? Open : close 처리 */
export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, actions: PayloadAction<{ modalType: string }>) => {
      state.modalType === "InfoModal"
        ? (state.isOpen = true)
        : state.modalType === actions.payload.modalType
        ? (state.isOpen = !state.isOpen)
        : (state.isOpen = true);

      state.modalType = actions.payload.modalType;
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
  },
});
export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
