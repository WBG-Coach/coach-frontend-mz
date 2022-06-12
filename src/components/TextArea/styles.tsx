import styled from "styled-components";
import { space } from "styled-system";

export const StyledTextAreaContainer = styled.span<any>`
  ${space}
  position: relative;
  background-color: #f9fafb;
  border-radius: 8px;
`;

export const StyledTextArea = styled.textarea`
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

export const StyledInputList = styled.div`
  bottom: 0;
  right: 0;
  display: flex;
  position: absolute;
  flex-direction: row;
  padding: 16px;
`;

export const StyledInputFileIcon = styled.label<any>`
  margin-left: 16px;
`;
