import styled from "styled-components";
import { layout, space } from "styled-system";
import { ButtonProps } from "./types";

export const StyledButton = styled.button<ButtonProps>`
  border: none;
  cursor: pointer;
  font-size: 16px;
  padding: 12px 16px;
  border-radius: 8px;
  transition: all 300ms;
  font-family: "Montserrat", sans-serif;
  border: 1px solid ${(props) => props.theme.colors.primary};
  color: ${(props) =>
    props.variant === "secondary" ? props.theme.colors.primary : "#fff"};
  background: ${(props) =>
    props.variant === "secondary" ? "#fff" : props.theme.colors.primary};
  &:hover {
    opacity: 0.7;
  }
  ${space}
  ${layout}
`;
