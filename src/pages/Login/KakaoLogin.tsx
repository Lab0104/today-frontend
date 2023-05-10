import { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { REST_API_KEY, REDIRECT_URI, CLIENT_SECRET } from "./dataKakaoLogin";
import { useDispatch } from "react-redux";
import { kakaoLogin, profileUpload } from "../../reducer/UserSlice";

import SpinnerPlaceHolder from "../../components/Skeleton/placeholders/SpinnerPlaceHolder";
import "./Login.scss";
// import { TypeUser } from "userTypes";

const KAKAO_HOST = "https://kauth.kakao.com";

export default function KakaoLogin() {
  const dispatch = useDispatch();
  // const { access_token, refresh_token } = useSelector(
  //   (state: { user: TypeUser }) => state.user
  // );
  const navigate = useNavigate();
  const location = useLocation();
  const code = location.search.split("=")[1];

  const access_token = useRef<string>("");

  const TokenVerifyCheck = (token: any) => {
    const currentUnixTime = Math.floor(new Date().getTime() / 1000);
    console.log(token.iss === KAKAO_HOST);
    console.log(token.aud === REST_API_KEY);
    console.log(token.exp > currentUnixTime);
    return (
      token.iss === KAKAO_HOST &&
      token.aud === REST_API_KEY &&
      token.exp > currentUnixTime
    );
  };

  const getUserData = async (token: string) => {
    try {
      const req = await fetch("https://kapi.kakao.com/v2/user/me", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
          Authorization: `Bearer ${token}`,
        },
      });
      const res = await req.json();
      console.log(res);

      dispatch(
        profileUpload({
          profileImage: res.properties.profile_image,
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  const getKakaoToken = async () => {
    try {
      const req = await fetch(
        `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${code}&client_secret=${CLIENT_SECRET}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
          },
        }
      );
      const res = await req.json();
      console.log(res);
      access_token.current = res.access_token;
      await getUserData(access_token.current);

      const userString = decodeURIComponent(
        escape(window.atob(res.id_token.split(".")[1]))
      );
      const userData = JSON.parse(userString);
      if (TokenVerifyCheck(userData)) {
        dispatch(
          kakaoLogin({
            email: userData.email,
            nickname: userData.nickname,
            access_token: res.access_token,
            refresh_token: res.refresh_token,
          })
        );
      }
      console.log(userData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!location.search) return;
    getKakaoToken();
    navigate("/");
  }, []);

  return (
    <>
      <div className="login-container">
        <SpinnerPlaceHolder size={100} />
      </div>
    </>
  );
}
