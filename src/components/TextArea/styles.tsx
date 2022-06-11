import styled from "styled-components";
import { space } from "styled-system";

export const StyledTextAreaContainer = styled.span<any>`
  ${space}
  position: relative;
  background-color: #f9fafb;
  border-radius: 8px;
`;
export const StyledTextArea = styled.textarea<any>`
  font-family: "Inter", sans-serif;
  margin: 0;
  border: none;
  padding: 16px;
  min-height: 200px;
  border-radius: 8px;
  background: transparent;
  width: calc(100% - 32px);
  border: 1px solid #e3e5e8;
`;
export const StyledInputFileIcon = styled.label<any>`
  position: absolute;
  padding: 16px;
  bottom: 0;
  right: 0;
`;
