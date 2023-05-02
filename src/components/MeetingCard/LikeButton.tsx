import { useState } from "react";
import { HiHeart, HiOutlineHeart } from "react-icons/hi";

const ICON_STYLE = {
  fontSize: "20px",
  cursor: "pointer",
};

function LikeButton({ likeProp }: { likeProp: boolean | undefined }) {
  const [like, setLike] = useState(likeProp);
  const handleLikeClick = () => {
    setLike((prev) => {
      const value = !prev;
      console.log(value);
      // value 값으로 like 값을 수정하는 post api 요청 필요
      return value;
    });
  };
  return (
    <>
      {like ? (
        <HiHeart style={ICON_STYLE} onClick={handleLikeClick} />
      ) : (
        <HiOutlineHeart style={ICON_STYLE} onClick={handleLikeClick} />
      )}
    </>
  );
}

export default LikeButton;
