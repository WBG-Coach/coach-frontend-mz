import React, { ReactNode, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Container,
  Icon,
  Image,
  OptionButton,
  Text,
  TextArea,
} from "../../components";
import { useGetQuestionsMutation } from "../../service";
import { LoadingDots } from "../../components/LoadingDots";
import FinishImage from "../../assets/images/finish-image.svg";
import { QuestionButton } from "../../components/QuestionButton";

const Questionnaire: React.FC<{}> = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isFinish, setFinish] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [getQuestions, { data, isLoading }] = useGetQuestionsMutation();
  const [answers, setAnswers] = useState<number[]>([]);
  const [notes, setNotes] = useState<string[]>([]);
  const { applicationId, questionnaireId } = useParams<{
    applicationId: string;
    questionnaireId: string;
  }>();

  useEffect(() => {
    if (questionnaireId) getQuestions(parseInt(questionnaireId, 10));
  }, [questionnaireId, getQuestions]);

  useEffect(() => {
    if (data?.questions) {
      setAnswers(new Array(data?.questions.length).fill(undefined));
      setNotes(new Array(data?.questions.length).fill(undefined));
    }
  }, [data]);

  const answerQuestion = (optionId: number) => {
    setAnswers(
      answers.map((oldOption, index) =>
        index === currentQuestion ? optionId : oldOption
      )
    );
  };

  const noteQuestion = (text: string) => {
    setNotes(
      notes.map((oldNode, index) =>
        index === currentQuestion ? text : oldNode
      )
    );
  };

  const goToNextQuestion = () => {
    setCurrentQuestion(currentQuestion + 1);
  };

  const sendQuestionnaire = () => {
    console.log(applicationId);
    console.log(answers);
    console.log(notes);
    setFinish(true);
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

      {isFinish ? (
        <Container
          mt={"100px"}
          flexDirection="column"
          justifyContent={"center"}
          alignContent="center"
        >
          <Image src={FinishImage} m="auto" />
          <Text
            mt={"32px"}
            fontSize={24}
            textAlign="center"
            value="Sessão concluída!"
            mb="16px"
            fontWeight={600}
          />
          <Text
            textAlign="center"
            fontSize={16}
            fontWeight={400}
            value="Parabéns, Coach! Fique a vontade para ver o resumo dessa sessão a qualquer momento."
          />
        </Container>
      ) : (
        <>
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
                key={index}
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
                    data?.questions[currentQuestion]?.question.competence
                      .name || ""
                  }
                />
              </Container>
            </Container>

            <Container mt="24px" flexDirection="column">
              {data?.questions[currentQuestion]?.question.options.map(
                (option) => (
                  <OptionButton
                    key={option.id}
                    mb="16px"
                    width="100%"
                    textAlign="left"
                    variant="secondary"
                    value={option.text}
                    justifyContent="flex-start"
                    selectedColor={option.selected_color}
                    onClick={() => answerQuestion(option.id)}
                    isSelected={answers[currentQuestion] === option.id}
                  />
                )
              )}
            </Container>
          </Container>

          <Container mt="16px" flexDirection="column">
            {notes.map(
              (note: string, index: number): ReactNode =>
                currentQuestion === index && (
                  <TextArea
                    key={index}
                    value={note}
                    onLoadFile={() => {}}
                    onChangeText={(text) => noteQuestion(text)}
                  />
                )
            )}
          </Container>
        </>
      )}

      <Container
        left="0"
        right="0"
        bottom="0"
        p="24px 16px"
        position="absolute"
      >
        {isFinish ? (
          <Button
            mt={3}
            width="100%"
            variant="secondary"
            onClick={() => navigate(-1)}
            value={t("Questionnaire.see-summary")}
          />
        ) : currentQuestion + 1 === data?.questions.length ? (
          <Button
            mt={3}
            width="100%"
            onClick={sendQuestionnaire}
            value={t("Questionnaire.finish")}
          />
        ) : (
          <Button
            mt={3}
            width="100%"
            isDisabled={!answers[currentQuestion]}
            value={t("Questionnaire.continue")}
            onClick={goToNextQuestion}
          />
        )}
      </Container>
    </Container>
  );
};

export default Questionnaire;
