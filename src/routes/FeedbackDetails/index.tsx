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

      <Text
        mb="16px"
        fontSize="14px"
        color="#494B50"
        lineHeight="18px"
        value={t("Questionnaire.teacher")}
      />

      <TeacherInfo teacher={data?.teacher} />

      <Text
        mb="16px"
        fontSize="14px"
        color="#494B50"
        lineHeight="18px"
        value={t("Questionnaire.class-plan")}
      />

      <Container
        flexDirection="row"
        mb="40px"
        alignItems="center"
        onClick={() => navigate("/guide-content")}
      >
        <Container
          mr="8px"
          width="40px"
          height="40px"
          borderRadius="20px"
          alignItems="center"
          background="#F0F2F5"
          justifyContent="center"
        >
          <Icon name="graduation" size={24} />
        </Container>
        <Container flex={1}>
          {answersRequest.data && (
            <Text value={answersRequest?.data[0].option?.text} />
          )}
        </Container>
        <Icon name="chevron-right" size={24} color="#94979E" />
      </Container>

      <Text
        mb="16px"
        fontSize="20px"
        fontWeight={600}
        lineHeight="24px"
        value={t("Questionnaire.title-feedback")}
      />

      <Container
        p="12px"
        mb="40px"
        borderRadius="8px"
        background="#F0F2F5"
        flexDirection="column"
        onClick={() => navigate("/guide-content")}
      >
        <Text
          mb="8px"
          fontSize="12px"
          color="#494B50"
          lineHeight="12px"
          value={feedback?.competence?.title}
        />
        <Text
          fontSize="14px"
          color="#191A1B"
          lineHeight="16px"
          fontWeight={600}
          value={feedback?.competence?.subtitle}
        />
      </Container>

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
