import React from "react";
import { useTranslation } from "react-i18next";
import { Container } from "../../../components";
import { QuestionButton } from "../../../components/QuestionButton";
import { Answer, QuestionnaireQuestion } from "../../../store/type";

type Props = {
  questions: QuestionnaireQuestion[] | Answer[];
  currentQuestion: number;
  onClick: (index: number) => void;
};

export const ButtonQuestionList: React.FC<Props> = ({
  questions,
  currentQuestion,
  onClick,
}) => {
  const { t } = useTranslation();

  return (
    <Container
      mx={-16}
      p="16px"
      mb="24px"
      flexDirection="row"
      overflowX="scroll"
      borderBottom="1px solid #F0F2F5"
    >
      {questions.map((_, index) => (
        <QuestionButton
          mr={3}
          key={index}
          selected={index === currentQuestion}
          onClick={() => onClick(index)}
          value={
            index === currentQuestion
              ? t("Questionnaire.question-number", { value: index + 1 })
              : index + 1
          }
        />
      ))}
    </Container>
  );
};
