import React from "react";
import Skeleton from "../Skeleton";

import "./placeholder.scss";

export default function MainPlaceHolder() {
  return (
    <div className="placeholder-container">
      <Skeleton width={100} height={80} widthUnit={"%"} rounded />
      <Skeleton width={100} height={300} widthUnit={"%"} rounded />
      {Array.from({ length: 4 }).map((_, idx) => (
        <div className="flexColumn" key={idx}>
          <Skeleton width={100} height={30} rounded />
          <div className="flexWrap">
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton
                key={index}
                width={30}
                widthUnit={"%"}
                height={100}
                rounded
              />
            ))}
          </div>
        </div>
      ))}
      <Skeleton width={100} height={120} widthUnit={"%"} rounded />
      <Skeleton width={100} height={120} widthUnit={"%"} rounded />
    </div>
  );
}
