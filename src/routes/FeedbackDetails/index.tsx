import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { Container, LoadingDots, Text } from "../../components";
import { useGetAnswersMutation, useGetFeedbackMutation } from "../../service";
import { TeacherInfo } from "../TeacherDetails/TeacherInfo";
import { QuestionnaireHeader } from "../ObservationQuestionnaire/QuestionnaireHeader";
import { useDispatch } from "react-redux";
import { openGuide } from "../../store/guide";

const FeedbackDetails: React.FC<{}> = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [getFeedback, { data, isLoading }] = useGetFeedbackMutation();
  const [getAnswers, answersRequest] = useGetAnswersMutation();
  const { feedbackId } = useParams<{
    feedbackId: string;
  }>();

  useEffect(() => {
    if (feedbackId) {
      getFeedback(parseInt(feedbackId, 10));
    }
  }, [feedbackId, getFeedback]);

  useEffect(() => {
    if (data?.questionnaire_application_id) {
      getAnswers(data.questionnaire_application_id);
    }
  }, [data, getAnswers]);

  return isLoading ? (
    <LoadingDots />
  ) : (
    <Container flex={1} flexDirection="column">
      <QuestionnaireHeader title={t("Questionnaire.feedback")} />

      <Text
        mb="16px"
        fontSize="20px"
        fontWeight={600}
        lineHeight="24px"
        value={t("Questionnaire.session-title", { value: data?.id })}
      />

      <TeacherInfo teacher={data?.questionnaire_application?.teacher} />

      <Container
        p="12px"
        mb="40px"
        borderRadius="12px"
        background="#F0F2F5"
        flexDirection="column"
        onClick={() =>
          answersRequest?.data &&
          dispatch(openGuide(answersRequest?.data[0].option?.content_guide_id))
        }
      >
        <Text
          fontSize="14px"
          color="#494B50"
          lineHeight="18px"
          value={t("Questionnaire.class-plan")}
        />

        {answersRequest?.data && (
          <Text mt="12px" value={answersRequest.data[0].option?.text} />
        )}

        <Container my="12px" height="1px" background="#E3E5E8" width="100%" />

        <Text color="primary" value={t("Questionnaire.see-class-plan")} />
      </Container>

      <Container
        p="12px"
        mb="40px"
        borderRadius="12px"
        background="#F0F2F5"
        flexDirection="column"
        onClick={() => dispatch(openGuide(data?.competence?.content_guide_id))}
      >
        <Text
          fontSize="14px"
          color="#494B50"
          lineHeight="18px"
          value={t("Questionnaire.selected-competency")}
        />

        <Text mt="12px" value={data?.competence?.subtitle} />

        <Container my="12px" height="1px" background="#E3E5E8" width="100%" />

        <Text color="primary" value={t("Questionnaire.see-competence")} />
      </Container>

      <Text
        mb="16px"
        fontSize="20px"
        fontWeight={600}
        lineHeight="24px"
        value={t("Questionnaire.title-feedback")}
      />

      {data?.feedback_answers.map(
        (question, index) =>
          index !== 0 && (
            <Container
              key={index}
              mb="24px"
              flexDirection="column"
              borderBottom="1px solid #E3E5E8"
            >
              <Text
                mb="8px"
                color="#494B50"
                fontSize="14px"
                lineHeight="18px"
                value={question?.questionnaire_question?.question.text}
              />
              <Text mb="20px" value={question.notes} />
            </Container>
          )
      )}
    </Container>
  );
};

export default FeedbackDetails;
