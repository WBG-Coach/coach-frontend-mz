import styled, { css } from "styled-components";
import {
  background,
  border,
  flexbox,
  layout,
  position,
  space,
} from "styled-system";
import { ContainerProps } from "./types";

export const StyledContainer = styled.div<ContainerProps>`
  ${layout}
  ${space}
  ${flexbox}
  ${position}
  ${border}
  ${background}
  
  transition: all 300ms;
  display: flex;

  ${(props) =>
    props.onClick &&
    css`
      cursor: pointer;
      &:hover {
        opacity: 0.7;
        ${props.hoverColor && `background: ${props.hoverColor};`}
      }
    `}
`;
