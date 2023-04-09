import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    email: null,
    password: null,
    isSaved: false,
    isLogged: false,
    login_method: "",
  },
  reducers: {
    login: (state, action) => {
      console.log(action);
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.isSaved = action.payload.isSaved;
      state.isLogged = true;
      state.login_method = action.payload.login_method;
    },
    logout: (state) => {
      state.email = null;
      state.password = null;
      state.isLogged = false;
      state.login_method = "";
    },
    kakaoLogin: (state) => {
      state.isLogged = true;
      state.login_method = "kakao";
    },
  },
});

export const { login, logout, kakaoLogin } = userSlice.actions;

export default userSlice.reducer;
