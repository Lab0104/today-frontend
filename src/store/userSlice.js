import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    email: null,
    password: null,
    isSaved: false,
    isLogged: false,
  },
  reducers: {
    login: (state, action) => {
      console.log(action);
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.isSaved = action.payload.isSaved;
      state.isLogged = true;
    },
    logout: (state) => {
      state.email = null;
      state.password = null;
      state.isLogged = false;
    },
    kakaoLogin: (state) => {
      state.isLogged = true;
    },
  },
});

export const { login, logout, kakaoLogin } = userSlice.actions;

export default userSlice.reducer;
