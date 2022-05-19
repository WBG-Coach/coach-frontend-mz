import styled from "styled-components";
import { FooterProps } from "./types";

export const StyledFooter = styled.div<FooterProps>`
  position: fixed;
  align-items: center;
  padding: 0 24px;
  bottom: 0;
  right: 0;
  left: 0;
  height: 80px;
  display: flex;
  flex-direction: row;
  background-color: #fff;
  justify-content: center;
  box-shadow: rgba(67, 71, 85, 0.27) 0px 0px 0.25em,
    rgba(90, 125, 188, 0.05) 0px 0.25em 1em;
`;
