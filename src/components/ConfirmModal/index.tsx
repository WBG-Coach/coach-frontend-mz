import React from "react";
import { Container } from "../Container";
import { Text } from "../Text";

type Props = {
  title?: string;
  description?: string;
  isOpen: boolean;
  children: React.ReactNode;
};

export const ConfirmModal: React.FC<Props> = ({
  isOpen,
  children,
  title,
  description,
}) => {
  return isOpen ? (
    <Container
      top={0}
      p="16px"
      left={0}
      right={0}
      bottom={0}
      position="fixed"
      alignItems="center"
      justifyContent="center"
      background="rgba(0, 0, 0, 0.75)"
    >
      <Container
        p="16px"
        minWidth="260px"
        borderRadius="12px"
        position="absolute"
        background="#fff"
        flexDirection="column"
      >
        {title && (
          <Text
            value={title}
            mb={description ? "4px" : "24px"}
            fontWeight={600}
            fontSize="20px"
            lineHeight="28px"
          />
        )}
        {description && (
          <Text
            mb="24px"
            value={description}
            color="#4D4D4D"
            fontSize="14px"
            lineHeight="20px"
          />
        )}
        {children}
      </Container>
    </Container>
  ) : (
    <></>
  );
};
