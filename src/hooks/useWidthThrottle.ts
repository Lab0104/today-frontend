import { useRef, useEffect } from "react";
import { throttle } from "lodash";

const useWidthThrottle = () => {
  const width = useRef<number>(window.innerWidth);

  const handleResize = throttle(() => {
    width.current = window.innerWidth;
  }, 1000);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return width.current;
};

export default useWidthThrottle;
