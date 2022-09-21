import { ReactNode } from "react";
import {
  BackgroundProps,
  BorderProps,
  FlexboxProps,
  LayoutProps,
  PositionProps,
  SpaceProps,
  GridGapProps,
} from "styled-system";

export type ContainerProps = {
  children?: ReactNode;
  onClick?: () => void;
  hoverColor?: string;
  rotate?: number;
  hideScrollbar?: boolean;
} & LayoutProps &
  SpaceProps &
  FlexboxProps &
  BorderProps &
  BackgroundProps &
  PositionProps &
  GridGapProps;
