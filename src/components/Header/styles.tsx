import styled from "styled-components";
import { HeaderProps } from "./types";

export const StyledHeader = styled.div<HeaderProps>`
  position: fixed;
  align-items: center;
  padding: 0 24px;
  top: 0;
  right: 0;
  left: 0;
  height: 100px;
  display: flex;
  flex-direction: row;
  background-color: #fff;
  box-shadow: rgba(67, 71, 85, 0.27) 0px 0px 0.25em,
    rgba(90, 125, 188, 0.05) 0px 0.25em 1em;
`;
