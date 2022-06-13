import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { Container, Text } from "../../components";
import { getLocalFeedbacks } from "../../storage";
import { QuestionnaireHeader } from "../Questionnaire/QuestionnaireHeader";

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
  const [feedback, setFeedback] = useState<any>();
  const { index } = useParams<{ index: string }>();

  useEffect(() => {
    if (index) {
      setFeedback(getLocalFeedbacks()[parseInt(index, 10)]);
    }
  }, [index]);

  return feedback ? (
    <Container flex={1} flexDirection="column">
      <QuestionnaireHeader title={t("Questionnaire.title-feedback")} />

      <Container mb="40px" background="#F0F2F5" borderRadius="8px" p="12px">
        <Text
          fontSize="14px"
          color="#191A1B"
          lineHeight="16px"
          fontWeight={600}
          value={feedback[0]}
        />
      </Container>

      {questions.map(
        (question, index) =>
          index !== 0 && (
            <Container key={index} flexDirection="column">
              <Text
                mb="8px"
                color="#494B50"
                fontSize="14px"
                lineHeight="18px"
                value={question.text}
              />
              <Text mb="20px" value={feedback[index]} />
            </Container>
          )
      )}
    </Container>
  ) : (
    <></>
  );
};

export default FeedbackDetails;
