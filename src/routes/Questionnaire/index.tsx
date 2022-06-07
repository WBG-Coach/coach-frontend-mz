import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Container, Icon, OptionButton, Text } from "../../components";
import { LoadingDots } from "../../components/LoadingDots";
import { QuestionButton } from "../../components/QuestionButton";
import { useGetQuestionsMutation } from "../../service";

const Questionnaire: React.FC<{}> = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [getQuestions, { data, isLoading }] = useGetQuestionsMutation();
  const [answers, setAnswers] = useState<number[]>([]);
  const { applicationId, questionnaireId } = useParams<{
    applicationId: string;
    questionnaireId: string;
  }>();
  console.log(applicationId);

  useEffect(() => {
    if (questionnaireId) getQuestions(parseInt(questionnaireId, 10));
  }, [questionnaireId, getQuestions]);

  const answerQuestion = (currentQuestion: number, optionId: number) => {
    if (answers[currentQuestion]) {
      setAnswers(
        answers.map((oldOption, index) =>
          index === currentQuestion ? optionId : oldOption
        )
      );
    } else {
      setAnswers([...answers, optionId]);
    }
  };

  return isLoading ? (
    <LoadingDots />
  ) : (
    <Container flex={1} flexDirection="column">
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
      <Container
        mx={-16}
        p="16px"
        mb="24px"
        flexDirection="row"
        overflowX="scroll"
        borderBottom="1px solid #F0F2F5"
      >
        {data?.questions.map((_, index) => (
          <QuestionButton
            mr={3}
            selected={index === currentQuestion}
            onClick={() => setCurrentQuestion(index)}
            value={
              index === currentQuestion
                ? `Question ${index + 1}`
                : `${index + 1}`
            }
          />
        ))}
      </Container>

      <Container flexDirection="column">
        <Text fontSize={18} fontWeight="bold">
          {data?.questions[currentQuestion]?.question?.text}
        </Text>
        <Container mb="24px">
          <Container
            mt="8px"
            p="4px 8px"
            width="auto"
            borderRadius="20px"
            background="#F0F2F5"
          >
            <Text
              value={
                data?.questions[currentQuestion]?.question.competence.name || ""
              }
            />
          </Container>
        </Container>

        <Container mt="24px" flexDirection="column">
          {data?.questions[currentQuestion]?.question.options.map((option) => (
            <OptionButton
              mb="16px"
              width="100%"
              textAlign="left"
              variant="secondary"
              value={option.text}
              justifyContent="flex-start"
              selectedColor={option.selected_color}
              isSelected={answers[currentQuestion] === option.id}
              onClick={() => answerQuestion(currentQuestion, option.id)}
            />
          ))}
        </Container>
      </Container>

      <Container mt="16px" flexDirection="column">
        <textarea style={{ height: 100 }} placeholder="..." />
      </Container>

      <Container
        left="0"
        right="0"
        bottom="0"
        p="24px 16px"
        position="absolute"
      >
        <Button
          mt={3}
          width="100%"
          value={t("Questionnaire.continue")}
          onClick={() => setCurrentQuestion(currentQuestion + 1)}
        />
      </Container>
    </Container>
  );
};

export default Questionnaire;
