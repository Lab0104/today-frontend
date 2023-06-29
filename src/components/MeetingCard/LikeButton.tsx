import { useState } from "react";
import { HiHeart } from "@react-icons/all-files/hi/HiHeart";
import { HiOutlineHeart } from "@react-icons/all-files/hi/HiOutlineHeart";
import { useSelector } from "react-redux";

import { TypeUser } from "userTypes";

const ICON_STYLE = {
  fontSize: "20px",
  cursor: "pointer",
};

function LikeButton({
  meet_id,
  likeProp,
}: {
  meet_id: number;
  likeProp: boolean | undefined;
}) {
  const [like, setLike] = useState(likeProp);
  const { user_id } = useSelector((state: { user: TypeUser }) => state.user);

  const onLikeClick = async (user_id: string, meet_id: number) => {
    console.log("like button clicked!");
    setLike((prev) => {
      const value = !prev;
      console.log(value);
      // value 값으로 like 값을 수정하는 post api 요청 필요
      return value;
    });
    const req = await fetch("/api/meetings/like", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id,
        meet_id,
      }),
    });
    const res = await req.json();
    console.log(res);
  };

  return (
    <>
      {like ? (
        <HiHeart
          style={ICON_STYLE}
          onClick={() => onLikeClick(user_id, meet_id)}
        />
      ) : (
        <HiOutlineHeart
          style={ICON_STYLE}
          onClick={() => onLikeClick(user_id, meet_id)}
        />
      )}
    </>
  );
}

export default LikeButton;
