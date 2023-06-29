import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../reducer/UserSlice";

import SpinnerPlaceHolder from "../../components/Skeleton/placeholders/SpinnerPlaceHolder";
import "./Login.scss";
// import { TypeUser } from "userTypes";

const KAKAO_HOST = "https://kauth.kakao.com";
const KAKAO_REST_API_KEY = process.env.REACT_APP_KAKAO_LOGIN_API_REST_API_KEY;
const KAKAO_REDIRECT_URI = process.env.REACT_APP_KAKAO_LOGIN_API_REDIRECT_URI;
const KAKAO_CLIENT_SECRET = process.env.REACT_APP_KAKAO_LOGIN_API_CLIENT_SECRET;

export default function KakaoLogin() {
  const dispatch = useDispatch();
  // const { access_token, refresh_token } = useSelector(
  //   (state: { user: TypeUser }) => state.user
  // );
  const navigate = useNavigate();
  const location = useLocation();
  const code = location.search.split("=")[1];

  const requestLogin = async (email: string) => {
    try {
      const req = await fetch("/api/login/kakao", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
        }),
      });
      const res = await req.json();
      return res;
    } catch (err) {
      console.log(err);
    }
  };

  const getKakaoToken = async () => {
    try {
      const req = await fetch(
        `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&code=${code}&client_secret=${KAKAO_CLIENT_SECRET}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
          },
        }
      );
      const res = await req.json();
      console.log(res);

      return res;
    } catch (err) {
      console.log(err);
    }
  };

  const tokenVerifyCheck = (token: any) => {
    const currentUnixTime = Math.floor(new Date().getTime() / 1000);
    console.log(token.iss === KAKAO_HOST);
    console.log(token.aud === KAKAO_REST_API_KEY);
    console.log(token.exp > currentUnixTime);
    return (
      token.iss === KAKAO_HOST &&
      token.aud === KAKAO_REST_API_KEY &&
      token.exp > currentUnixTime
    );
  };

  const decodeToken = async (encodeToken: any) => {
    const encoded = await encodeToken;
    const access_token = encoded.access_token;
    const refresh_token = encoded.refresh_token;
    const decodeString = decodeURIComponent(
      escape(window.atob(encoded.id_token.split(".")[1]))
    );
    const decodeData = {
      ...JSON.parse(decodeString),
      access_token,
      refresh_token,
    };
    console.log(decodeData);

    if (tokenVerifyCheck(decodeData)) {
      return decodeData;
    } else {
      return false;
    }
  };

  const insertUserData = async (decodedata: any) => {
    let userData = await decodedata;
    const authUser: any = await requestLogin(userData.email);
    if (authUser.user.length) {
      userData = { ...userData, user_id: authUser.user[0].user_id };
    }
    dispatch(
      login({
        user_id: userData.user_id ? userData.user_id : "",
        email: userData.email,
        nickname: userData.nickname,
        profile_image: userData.picture,
        access_token: userData.access_token,
        refresh_token: userData.refresh_token,
        login_method: "kakao",
      })
    );
    navigate("/");
  };

  useEffect(() => {
    console.log(KAKAO_REST_API_KEY);
    if (!location.search) return;
    const userData = decodeToken(getKakaoToken());
    insertUserData(userData);
  }, []);

  return (
    <>
      <div className="login-container">
        <SpinnerPlaceHolder />
      </div>
    </>
  );
}
