import { createSlice } from "@reduxjs/toolkit";

import { TypeUser } from "userTypes";

const initialState: TypeUser = {
  user_id: 0,
  email: "이메일을 등록해주세요",
  nickname: "닉네임을 등록해주세요",
  address: "주소지를 등록해주세요",
  score: 0,
  profile_image: "",
  background_image: "",
  isSaved: false,
  login_method: "",
  isLogged: false,
  access_token: "",
  refresh_token: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user_id = action.payload.user_id
        ? action.payload.user_id
        : state.user_id;
      state.email = action.payload.email ? action.payload.email : state.email;
      state.nickname = action.payload.nickname
        ? action.payload.nickname
        : state.nickname;
      state.address = action.payload.address
        ? action.payload.address
        : state.address;
      state.score = action.payload.score ? action.payload.score : state.score;
      state.profile_image = action.payload.profile_image
        ? action.payload.profile_image
        : state.profile_image;
      state.background_image = action.payload.background_image
        ? action.payload.background_image
        : state.background_image;
      state.isSaved = action.payload.isSaved
        ? action.payload.isSaved
        : state.isSaved;
      state.isLogged = true;
      state.login_method = action.payload.login_method
        ? action.payload.login_method
        : state.login_method;
      state.access_token = action.payload.access_token
        ? action.payload.access_token
        : state.access_token;
      state.refresh_token = action.payload.refresh_token
        ? action.payload.refresh_token
        : state.refresh_token;
    },
    logout: (state) => {
      state.user_id = 0;
      state.email = "이메일을 등록해주세요";
      state.nickname = "닉네임을 등록해주세요";
      state.address = "주소지를 등록해주세요";
      state.score = 0;
      state.profile_image = "";
      state.background_image = "";
      state.isSaved = false;
      state.isLogged = false;
      state.login_method = "";
      state.access_token = "";
      state.refresh_token = "";
    },
    profileUpload: (state, action) => {
      state.profile_image = action.payload.profile_image;
    },
    backgroundUpload: (state, action) => {
      state.background_image = action.payload.background_image;
    },
    updateProfile: (state, action) => {
      state.nickname = action.payload.nickname;
      state.address = action.payload.address;
    },
  },
});

export const { login, logout, profileUpload, backgroundUpload, updateProfile } =
  userSlice.actions;

export default userSlice.reducer;
