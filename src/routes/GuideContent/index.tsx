import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { Container, LoadingDots } from "../../components";
import { useGetContentGuideMutation } from "../../service";
import { QuestionnaireHeader } from "../ObservationQuestionnaire/QuestionnaireHeader";

const GuideContent: React.FC<{}> = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const [getContentGuide, { data, isLoading }] = useGetContentGuideMutation();

  useEffect(() => {
    getContentGuide(parseInt(id || "", 10));
  }, [id, getContentGuide]);

  return isLoading ? (
    <LoadingDots />
  ) : (
    <Container flex={1} flexDirection="column">
      <QuestionnaireHeader title={t("Questionnaire.feedback")} />
      <div dangerouslySetInnerHTML={{ __html: data?.text || "" }}></div>
    </Container>
  );
};

export default GuideContent;
