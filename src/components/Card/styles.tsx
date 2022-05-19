import styled from "styled-components";
import { flexbox, layout, space } from "styled-system";
import { CardProps } from "./types";

export const StyledCard = styled.div<CardProps>`
  display: flex;
  padding: 16px;
  max-width: 90vw;
  width: 400px;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 4px 5px 0 rgb(0 0 0 / 14%), 0 1px 10px 0 rgb(0 0 0 / 12%),
    0 2px 4px -1px rgb(0 0 0 / 30%);
    
  ${layout}
  ${space}
  ${flexbox}
`;
