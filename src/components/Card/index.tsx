import React from "react";
import { StyledCard } from "./styles";
import { CardProps } from "./types";

export const Card: React.FC<CardProps> = (props) => {
  return <StyledCard {...props}>{props.children}</StyledCard>;
};
