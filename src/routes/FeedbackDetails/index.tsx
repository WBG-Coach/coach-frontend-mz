import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Icon, Text } from "../../components";
import {
  useGetAnswersMutation,
  useGetApplicationMutation,
} from "../../service";
import { getLocalFeedbacks } from "../../storage";
import { TeacherInfo } from "../TeacherDetails/TeacherInfo";
import { QuestionnaireHeader } from "../ObservationQuestionnaire/QuestionnaireHeader";

const questions = [
  {
    text: "Selecione uma competência pedagógica a melhorar",
  },
  {
    text: "Pergunta de acolhimento",
  },
  {
    text: "Aspecto positivo 1",
  },
  {
    text: "Aspecto positivo 2",
  },
  {
    text: "Aspecto positivo 3",
  },
  {
    text: "Por que escolheu essa Competência Pedagógica?",
  },
];

const FeedbackDetails: React.FC<{}> = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState<any>();
  const [getApplication, { data }] = useGetApplicationMutation();
  const [getAnswers, answersRequest] = useGetAnswersMutation();
  const { feedbackId, applicationId } = useParams<{
    feedbackId: string;
    applicationId: string;
  }>();

  useEffect(() => {
    if (feedbackId) {
      setFeedback(getLocalFeedbacks()[parseInt(feedbackId, 10)]);
    }
  }, [feedbackId]);

  useEffect(() => {
    if (applicationId) {
      getApplication({ id: parseInt(applicationId, 10) });
      getAnswers(parseInt(applicationId, 10));
    }
  }, [applicationId, getApplication, getAnswers]);

  return feedback ? (
    <Container flex={1} flexDirection="column">
      <QuestionnaireHeader title={t("Questionnaire.feedback")} />

      <Text
        mb="16px"
        fontSize="20px"
        fontWeight={600}
        lineHeight="24px"
        value={t("Questionnaire.session-title", { value: data?.id })}
      />

      <TeacherInfo teacher={data?.teacher} />

      <Container
        p="12px"
        mb="40px"
        borderRadius="12px"
        background="#F0F2F5"
        flexDirection="column"
        onClick={() => navigate("/guide-content")}
      >
        <Text
          fontSize="14px"
          color="#494B50"
          lineHeight="18px"
          value={t("Questionnaire.class-plan")}
        />

        {answersRequest.data && (
          <Text mt="12px" value={answersRequest?.data[0].option?.text} />
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
        onClick={() => navigate("/guide-content")}
      >
        <Text
          fontSize="14px"
          color="#494B50"
          lineHeight="18px"
          value={t("Questionnaire.competence-to-work")}
        />

        <Text mt="12px" value={feedback?.competence?.subtitle} />

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

      {questions.map(
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
                value={question.text}
              />
              <Text mb="20px" value={feedback?.notes[index]} />
            </Container>
          )
      )}
    </Container>
  ) : (
    <></>
  );
};

export default FeedbackDetails;
