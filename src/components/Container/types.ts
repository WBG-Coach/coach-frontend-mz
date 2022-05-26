import { ReactNode } from "react";
import {
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
  PositionProps;
