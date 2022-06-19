import React from "react";
import { Icon } from "../Icon";
import {
  StyledInputFileIcon,
  StyledInputList,
  StyledTextArea,
  StyledTextAreaContainer,
} from "./styles";
import { TextAreaProps } from "./types";

export const TextArea: React.FC<TextAreaProps> = ({
  value,
  onChangeText: onChange,
  onLoadFile,
  ...props
}) => {
  return (
    <StyledTextAreaContainer {...props}>
      <StyledTextArea
        value={value}
        onChange={(e: any): void => onChange(e.target.value)}
      />
      {onLoadFile && (
        <>
          <StyledInputList>
            <StyledInputFileIcon htmlFor="camera">
              <Icon name="camera" size={24} />
            </StyledInputFileIcon>
            <StyledInputFileIcon htmlFor="file">
              <Icon name="file-blank" size={24} />
            </StyledInputFileIcon>
          </StyledInputList>
          <input
            id="file"
            type="file"
            style={{ display: "none" }}
            onChange={(e) => {
              onLoadFile(e.target.files?.item(0));
            }}
          />
          <input
            capture
            id="camera"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) => {
              onLoadFile(e.target.files?.item(0));
            }}
          />
        </>
      )}
    </StyledTextAreaContainer>
  );
};
