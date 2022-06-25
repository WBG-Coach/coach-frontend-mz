import React from "react";
import { Container } from "../Container";
import { Icon } from "../Icon";
import { Text } from "../Text";
import AddButtonProps from "./types";

export const AddButton: React.FC<AddButtonProps> = ({ label, onClick }) => {
  return (
    <Container p="16px 0" alignItems="center" width="100%" onClick={onClick}>
      <Container
        p="12px"
        mr="12px"
        borderRadius="50%"
        border="1px solid #F0F2F5"
      >
        <Icon size={24} name="plus" color="#000000" />
      </Container>
      <Text
        fontSize="16px"
        fontWeight={600}
        lineHeight="24px"
        color="#000000"
        value={label}
      />
    </Container>
  );
};
