import styled from "styled-components";
import { position, space } from "styled-system";
import { IconProps } from "./types";

export const StyledIcon = styled.img<IconProps>`
  ${space}
  ${position}
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
`;
