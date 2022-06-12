import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Container, Icon, Text } from "../../../components";

export const QuestionnaireHeader: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Container mb="8px" flexDirection="row" p="16px 0" mt="-16px">
      <Container flex={1} justifyContent="center">
        <Container width="24px" />
        <Text
          fontSize="16px"
          color="#191A1B"
          fontWeight={600}
          lineHeight="24px"
          value={t("Questionnaire.title")}
        />
      </Container>
      <Container onClick={() => navigate(-1)}>
        <Icon name="close" size={24} />
      </Container>
    </Container>
  );
};
