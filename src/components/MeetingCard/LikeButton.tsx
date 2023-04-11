import { useState } from "react";

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
    <span
      className={
        like ? "material-symbols-outlined like" : "material-symbols-outlined"
      }
      onClick={handleLikeClick}
    >
      favorite
    </span>
  );
}

export default LikeButton;
