import React from "react";
import { Icon } from "../Icon";
import { StyledButton } from "./styles";
import { ButtonProps } from "./types";

export const OptionButton: React.FC<ButtonProps> = (props) => {
  return (
    <StyledButton {...props}>
      {props.value}
      {props.selectedIcon && props.isSelected && (
        <Icon
          size={24}
          name={props.selectedIcon}
          color={props.selectedColor || ""}
        />
      )}
    </StyledButton>
  );
};
