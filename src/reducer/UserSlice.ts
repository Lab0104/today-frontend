import { createSlice } from "@reduxjs/toolkit";

import { TypeUser } from "userTypes";

const initialState: TypeUser = {
  user_id: 0,
  email: "",
  nickname: "",
  address: "",
  score: 0,
  profile_image: "",
  background_image: "",
  isSaved: false,
  login_method: "",
  isLogged: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user_id = action.payload.user_id;
      state.email = action.payload.email;
      state.nickname = action.payload.nickname;
      state.address = action.payload.address;
      state.score = action.payload.score;
      state.profile_image = action.payload.profile_image;
      state.background_image = action.payload.background_image;
      state.isSaved = action.payload.isSaved;
      state.isLogged = true;
      state.login_method = action.payload.login_method;
    },
    logout: (state) => {
      state.user_id = 0;
      state.email = "";
      state.nickname = "";
      state.address = "";
      state.score = 0;
      state.profile_image = "";
      state.background_image = "";
      state.isSaved = false;
      state.isLogged = false;
      state.login_method = "";
    },
    kakaoLogin: (state) => {
      state.isLogged = true;
      state.login_method = "kakao";
    },
    profileUpload: (state, action) => {
      state.profile_image = action.payload.profileImage;
    },
    backgroundUpload: (state, action) => {
      state.background_image = action.payload.backgroundImage;
    },
    updateProfile: (state, action) => {
      state.nickname = action.payload.nickname;
      state.address = action.payload.address;
    },
  },
});

export const { login, logout, kakaoLogin, profileUpload, backgroundUpload } =
  userSlice.actions;

export default userSlice.reducer;
