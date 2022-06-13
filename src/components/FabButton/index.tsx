import React from "react";
import { Icon } from "../Icon";
import { StyledButton } from "./styles";
import { ButtonProps } from "./types";

export const FabButton: React.FC<ButtonProps> = (props) => {
  return (
    <StyledButton {...props} disabled={props.isDisabled}>
      <Icon name={props.icon} size={32} />
    </StyledButton>
  );
};
