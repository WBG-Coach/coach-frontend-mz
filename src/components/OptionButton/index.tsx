import React from "react";
import { Icon } from "../Icon";
import { StyledButton } from "./styles";
import { ButtonProps } from "./types";

export const OptionButton: React.FC<ButtonProps> = (props) => {
  return (
    <StyledButton {...props}>
      {props.value}
      {props.selectedIcon && props.isSelected && (
        <Icon name={props.selectedIcon} mr={3} size={24} />
      )}
    </StyledButton>
  );
};
