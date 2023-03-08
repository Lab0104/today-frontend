import { useState, useEffect } from "react";
import _ from "lodash";

const useWidthThrottle = () => {
  const [width, setWidth] = useState(window.innerWidth);

  const handleResize = _.throttle(() => {
    setWidth((val) => window.innerWidth);
  }, 300);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  return width;
};

export default useWidthThrottle;
