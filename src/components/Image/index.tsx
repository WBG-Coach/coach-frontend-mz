import React from "react";
import { StyledImage } from "./styles";
import { ImageProps } from "./types";

export const Image: React.FC<ImageProps> = (props) => {
  return (
    <StyledImage
      {...props}
      rounded
      src={props.src.startsWith("./") ? props.src.substring(2) : props.src}
    />
  );
};
