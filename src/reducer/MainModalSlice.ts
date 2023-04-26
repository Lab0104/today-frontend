import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { TypeModalState, TypeMeetingList } from "mainPageTypes";

const initialState: TypeModalState = {
  modalType: "",
  isOpen: false,
  modalContent: null,
};

/** 모달 Type에 해당하는 모달 isOpen ? Open : close 처리 */
export const mainModalSlice = createSlice({
  name: "mainModal",
  initialState,
  reducers: {
    openModal: (state, actions: PayloadAction<{ modalType: string }>) => {
      state.isOpen = true;
      state.modalType = actions.payload.modalType;
    },
    closeModal: (state) => {
      state.modalType = "";
      state.isOpen = false;
      state.modalContent = null;
    },
    setModalContent: (
      state,
      actions: PayloadAction<{ modalContent: TypeMeetingList | null }>
    ) => {
      state.modalContent = actions.payload.modalContent && {
        ...actions.payload.modalContent,
      };
    },
  },
});
export const { openModal, closeModal, setModalContent } =
  mainModalSlice.actions;
export default mainModalSlice.reducer;
