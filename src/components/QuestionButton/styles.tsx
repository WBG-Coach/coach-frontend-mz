import styled from "styled-components";
import { layout, space } from "styled-system";
import { ButtonProps } from "./types";

export const StyledQuestionButton = styled.button<ButtonProps>`
  width: auto;
  border: none;
  display: flex;
  height: 32px;
  min-width: 32px;
  padding: 0 12px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  font-style: normal;
  border-radius: 20px;
  align-items: center;
  transition: all 300ms;
  justify-content: center;
  font-family: "Inter", sans-serif;
  border: 1px solid #e3e5e8;
  color: ${(props) => (props.selected ? "#fff" : "#191A1B")};
  background: ${(props) =>
    props.selected ? props.theme.colors.primary : "#fff"};
  &:hover {
    opacity: 0.7;
  }
  ${space}
  ${layout}
`;
