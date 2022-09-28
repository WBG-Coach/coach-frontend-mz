import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Icon, Text } from "../../../components";
type Props = {
  title: string;
};

export const QuestionnaireHeader: React.FC<Props> = ({ title }) => {
  const navigate = useNavigate();

  return (
    <Container mb="8px" flexDirection="row" p="16px 0" mt="-16px">
      <Container flex={1} justifyContent="center">
        <Container width="24px" />
        <Text
          fontSize="16px"
          color="#191A1B"
          fontWeight={600}
          lineHeight="24px"
          value={title}
        />
      </Container>
      <Container onClick={() => navigate(-1)}>
        <Icon name="close" size={24} />
      </Container>
    </Container>
  );
};
