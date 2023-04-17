import { useState, useEffect } from "react";
import _ from "lodash";

const getCount = (width: number) => {
  if (width < 660) return 1;
  else if (width < 930) return 2;
  else if (width < 1200) return 3;
  else return 4;
};

const useItemCountCarousel = () => {
  const [itemCount, setItemCount] = useState(getCount(window.innerWidth));

  const handleResize = _.throttle(() => {
    const width = window.innerWidth;
    if (width < 660) {
      setItemCount(1);
    } else if (width < 930) {
      setItemCount(2);
    } else if (width < 1200) {
      setItemCount(3);
    } else {
      setItemCount(4);
    }
  }, 1000);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return itemCount;
};

export default useItemCountCarousel;
