import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user_id: 0,
    email: "",
    isSaved: false,
    login_method: "",
    isLogged: false,
  },
  reducers: {
    login: (state, action) => {
      console.log(action);
      state.user_id = action.payload.user_id;
      state.email = action.payload.email;
      state.isSaved = action.payload.isSaved;
      state.isLogged = true;
      state.login_method = action.payload.login_method;
    },
    logout: (state) => {
      state.user_id = 0;
      state.email = "";
      state.isSaved = false;
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
