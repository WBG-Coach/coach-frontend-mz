import styled from "styled-components";
import {
  justifyContent,
  layout,
  position,
  space,
  textAlign,
} from "styled-system";
import { ButtonProps } from "./types";

export const StyledButton = styled.button<ButtonProps>`
  border: none;
  display: flex;
  cursor: pointer;
  border-radius: 50%;
  align-items: center;
  transition: all 300ms;
  justify-content: center;
  width: 56px;
  height: 56px;
  background: ${(props) =>
    props.isDisabled
      ? "#eee"
      : props.variant === "secondary"
      ? "#fff"
      : props.theme.colors.primary};
  &:hover {
    opacity: 0.7;
  }
  ${space}
  ${position}
  ${layout}
  ${textAlign}
  ${justifyContent}
`;
