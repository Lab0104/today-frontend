/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { css } from "@emotion/react";
import { HiHeart, HiOutlineHeart } from "react-icons/hi";

const heartStyle = css`
  font-size: 20px;
  cursor: pointer;
`;

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
        <HiHeart css={heartStyle} onClick={handleLikeClick} />
      ) : (
        <HiOutlineHeart css={heartStyle} onClick={handleLikeClick} />
      )}
    </>
  );
}

export default LikeButton;
