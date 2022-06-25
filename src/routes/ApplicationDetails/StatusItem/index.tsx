import React from "react";
import { Container, Text } from "../../../components";

type Props = { label: string; description: string; onClick: () => void };

export const StatusItem: React.FC<Props> = ({
  label,
  description,
  onClick,
}) => {
  return (
    <Container
      mb="24px"
      height="70px"
      onClick={onClick}
      flexDirection="row"
      alignItems="center"
    >
      <Container
        mr="12px"
        width="20px"
        height="20px"
        border="1px solid #E3E5E8"
        borderRadius="50%"
      />
      <Container
        flex={1}
        padding="12px"
        borderRadius="8px"
        flexDirection="column"
        justifyContent="center"
        border="1px solid #E3E5E8"
      >
        <Text
          mb="4px"
          value={label}
          fontSize="16px"
          fontWeight={600}
          color="#191A1B"
          lineHeight="24px"
        />
        <Text
          fontSize="14px"
          color="#494B50"
          lineHeight="18px"
          value={description}
        />
      </Container>
    </Container>
  );
};
