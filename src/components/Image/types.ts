import { ImgHTMLAttributes } from "react";
import { BorderProps, BorderRadiusProps, SpaceProps } from "styled-system";

export type ImageProps = {
  src: string;
  filter?: string;
} & SpaceProps &
  BorderProps &
  BorderRadiusProps &
  ImgHTMLAttributes<HTMLInputElement>;
