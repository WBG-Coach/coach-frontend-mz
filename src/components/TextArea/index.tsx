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
            onChange={onLoadFile}
          />
          <input
            capture
            id="camera"
            type="file"
            accept="image/*"
            onChange={onLoadFile}
            style={{ display: "none" }}
          />
        </>
      )}
    </StyledTextAreaContainer>
  );
};
