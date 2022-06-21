import React from "react";
import { Container } from "../Container";
import { Icon } from "../Icon";

type Props = {
  title?: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export const Modal: React.FC<Props> = ({ onClose, isOpen, children }) => {
  return isOpen ? (
    <Container
      top={0}
      p="16px"
      left={0}
      right={0}
      bottom={0}
      position="fixed"
      background="#fff"
    >
      <Container
        top={20}
        right={16}
        width={24}
        onClick={onClose}
        position="absolute"
      >
        <Icon name="close" size={24} />
      </Container>

      {children}
    </Container>
  ) : (
    <></>
  );
};
