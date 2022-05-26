import styled from "styled-components";
import { FooterProps } from "./types";

export const StyledFooter = styled.div<FooterProps>`
  position: fixed;
  align-items: center;
  padding: 0 24px;
  bottom: 0;
  right: 0;
  left: 0;
  height: 65px;
  display: flex;
  flex-direction: row;
  background-color: #fff;
  justify-content: center;
  border-top: 1px solid #f0f3f5;
`;
