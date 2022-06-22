import React from "react";
import { Icon } from "../Icon";
import { StyledInput, StyledInputContainer } from "./styles";
import { InputProps } from "./types";

export const Input: React.FC<InputProps> = ({
  icon,
  value,
  placeholder,
  onChangeText: onChange,
  ...props
}) => {
  return (
    <StyledInputContainer {...props}>
      {icon && <Icon mr="8px" color="#494B50" size={24} name={icon} />}
      <StyledInput
        value={value}
        placeholder={placeholder}
        onChange={(e: any): void => onChange(e.target.value)}
      />
    </StyledInputContainer>
  );
};
