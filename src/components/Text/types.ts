import { ReactNode } from "react";
import {
  ColorProps,
  FontSizeProps,
  FontWeightProps,
  SpaceProps,
} from "styled-system";

export type TextProps = {
  value?: string;
  children?: ReactNode;
} & SpaceProps &
  FontWeightProps &
  FontSizeProps &
  ColorProps;
