import React from "react";
import { useTranslation } from "react-i18next";
import { Container } from "../../../components";
import { QuestionnaireQuestion } from "../../../store/type";
import { QuestionButton } from "../../../components/QuestionButton";

type Props = {
  questions: QuestionnaireQuestion[];
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
      hideScrollbar={true}
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
              ? t("Questionnaire.question-number", { value: index })
              : index
          }
        />
      ))}
    </Container>
  );
};
