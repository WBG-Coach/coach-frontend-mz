import styled from "styled-components";
import { space } from "styled-system";

export const StyledInputContainer = styled.span<any>`
  ${space}
  position: relative;
  background-color: #f9fafb;
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  padding: 16px;
  border: 1px solid #e3e5e8;
`;

export const StyledInput = styled.input`
  font-family: "Inter", sans-serif;
  margin: 0;
  border: none;
  border-radius: 8px;
  background: transparent;
  width: calc(100% - 32px);
`;
