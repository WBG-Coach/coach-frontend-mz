import React from "react";
import { Icon } from "../Icon";
import { StyledButton } from "./styles";
import { ButtonProps } from "./types";

export const OptionButton: React.FC<ButtonProps> = (props) => {
  return (
    <StyledButton {...props}>
      {props.icon && <Icon name={props.icon} mr={3} size={24} />}
      {props.value}
    </StyledButton>
  );
};
