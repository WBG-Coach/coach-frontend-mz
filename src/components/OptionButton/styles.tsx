import styled from "styled-components";
import { justifyContent, layout, space, textAlign } from "styled-system";
import { ButtonProps } from "./types";

export const StyledButton = styled.button<ButtonProps>`
  width: 100%;
  flex: 1;
  border: none;
  display: flex;
  cursor: pointer;
  font-size: 16px;
  line-height: 24px;
  font-style: normal;
  padding: 12px 24px;
  border-radius: 12px;
  transition: all 300ms;
  flex-direction: row;
  justify-content: space-between;
  font-family: "Inter", sans-serif;
  font-weight: ${(props) => (props.isSelected ? 600 : 400)};
  border: 2px solid
    ${(props) =>
      props.isSelected
        ? props.selectedColor || props.theme.colors.primary
        : "#E3E5E8"};
  color: #191a1b;
  background: ${(props) =>
    props.variant === "secondary" ? "#fff" : props.theme.colors.primary};
  &:hover {
    opacity: 0.7;
  }
  ${space}
  ${layout}
  ${textAlign}
  ${justifyContent}
`;
