import React, { useEffect } from "react";
import { Icon } from "../Icon";
import {
  StyledInputFileIcon,
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
  useEffect(() => {
    console.log(value);
  }, [value]);

  return (
    <StyledTextAreaContainer {...props}>
      <StyledTextArea
        value={value}
        onChange={(e: any): void => onChange(e.target.value)}
      />
      <StyledInputFileIcon for="file">
        <Icon name="file-blank" size={24} />
      </StyledInputFileIcon>
      <input
        id="file"
        type="file"
        style={{ display: "none" }}
        onChange={onLoadFile}
      />
    </StyledTextAreaContainer>
  );
};
