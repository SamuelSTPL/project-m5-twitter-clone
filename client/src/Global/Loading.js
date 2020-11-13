import React from "react";
import Loader from "react-loader-spinner";
import { COLORS } from "./constants";

export const Loading = (width) => {
  return (
    <div>
      <Loader type="Hearts" color={COLORS.primary} width={width} />
    </div>
  );
};
