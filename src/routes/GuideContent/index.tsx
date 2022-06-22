import React from "react";
import { useTranslation } from "react-i18next";
import { Container } from "../../components";
import { QuestionnaireHeader } from "../Questionnaire/QuestionnaireHeader";
import { MOCK_GUIDE } from "./mock";

const GuideContent: React.FC<{}> = () => {
  const { t } = useTranslation();

  return (
    <Container flex={1} flexDirection="column">
      <QuestionnaireHeader title={t("Questionnaire.feedback")} />
      <div dangerouslySetInnerHTML={{ __html: MOCK_GUIDE }}></div>
    </Container>
  );
};

export default GuideContent;
