import React from "react";
import { useTranslation } from "react-i18next";
import { QuestionnaireHeader } from "../ObservationQuestionnaire/QuestionnaireHeader";

const FeedbackQuestionnaire: React.FC<{}> = () => {
  const { t } = useTranslation();

  return <QuestionnaireHeader title={t("Questionnaire.title-feedback")} />;
};

export default FeedbackQuestionnaire;
