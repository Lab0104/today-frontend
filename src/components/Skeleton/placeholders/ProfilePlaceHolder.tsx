import React from "react";
import Skeleton from "../Skeleton";

import "./placeholder.scss";

export default function ProfilePlaceHolder() {
  return (
    <div className="placeholder-container">
      <Skeleton width={100} height={80} widthUnit={"%"} rounded />
      <Skeleton width={80} height={300} widthUnit={"%"} rounded />
      <Skeleton width={100} height={120} widthUnit={"%"} rounded />
      <Skeleton width={80} height={300} widthUnit={"%"} rounded />
      <Skeleton width={100} height={120} widthUnit={"%"} rounded />
    </div>
  );
}
