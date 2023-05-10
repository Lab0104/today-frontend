import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  limitTime: 0,
  emailSendClick: true,
  isTimeout: false,
};

export const EmailVerify = createSlice({
  name: "emailVerify",
  initialState,
  reducers: {
    setLimitTime: (state, action) => {
      state.limitTime = action.payload.limitTime;
    },
    setEmailSendClick: (state, action) => {
      state.emailSendClick = action.payload.emailSendClick;
    },
    setIsTimeout: (state, action) => {
      state.isTimeout = action.payload.isTimeout;
    },
  },
});

export const { setLimitTime, setEmailSendClick, setIsTimeout } =
  EmailVerify.actions;

export default EmailVerify.reducer;
