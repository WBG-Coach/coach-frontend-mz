import { ReactNode } from "react";
import {
  BackgroundProps,
  BorderProps,
  FlexboxProps,
  LayoutProps,
  PositionProps,
  SpaceProps,
} from "styled-system";

export type ContainerProps = {
  children?: ReactNode;
  onClick?: () => void;
  hoverColor?: string;
} & LayoutProps &
  SpaceProps &
  FlexboxProps &
  BorderProps &
  BackgroundProps &
  PositionProps;
