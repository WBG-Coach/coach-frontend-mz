import React from "react";
import { StyledImage } from "./styles";
import { ImageProps } from "./types";

export const Image: React.FC<ImageProps> = (props) => {
  return (
    <StyledImage
      {...props}
      src={
        props.src.startsWith("./")
          ? props.src.replace("./", window.location.origin + "/")
          : props.src
      }
    />
  );
};
