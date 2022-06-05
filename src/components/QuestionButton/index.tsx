import React from "react";
import { ButtonProps } from "./types";
import { StyledQuestionButton } from "./styles";

export const QuestionButton: React.FC<ButtonProps> = (props) => {
  return <StyledQuestionButton {...props}>{props.value}</StyledQuestionButton>;
};
