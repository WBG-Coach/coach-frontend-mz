import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button, Container, Icon, Text, TextArea } from "../../components";
import { QuestionnaireHeader } from "../Questionnaire/QuestionnaireHeader";
import { getLocalFeedbacks, setLocalFeedbacks } from "../../storage";
import { useGetAnswersMutation } from "../../service";

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

const QuestionnaireFeedback: React.FC<{}> = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [getAnswer, { data }] = useGetAnswersMutation();
  const [notes, setNotes] = useState<string[]>(
    new Array(questions.length).fill("")
  );
  const { applicationId, questionnaireId } = useParams<{
    applicationId: string;
    questionnaireId: string;
  }>();

  useEffect(() => {
    if (applicationId) getAnswer(parseInt(applicationId, 10));
  }, [applicationId, getAnswer]);
  // const [getQuestions, { data, isLoading }] = useGetQuestionsMutation();

  /*useEffect(() => {
    if (questionnaireId) getQuestions(parseInt(questionnaireId, 10));
  }, [questionnaireId, getQuestions]);*/

  /*useEffect(() => {
    if (data?.questions) {
      setAnswers(new Array(data?.questions.length).fill(undefined));
      setNotes(new Array(data?.questions.length).fill(undefined));
    }
  }, [data]);*/

  const noteQuestion = (text: string, index: number) => {
    setNotes(notes.map((oldNode, i) => (i === index ? text : oldNode)));
  };

  const goToFeedbackQuestions = () => {
    setCurrentStep(1);
  };

  const sendQuestionnaire = () => {
    console.log(applicationId);
    console.log(questionnaireId);
    console.log(notes);
    setLocalFeedbacks([...getLocalFeedbacks(), notes]);
    navigate(-1);
  };

  return (
    <>
      <QuestionnaireHeader title={t("Questionnaire.title-feedback")} />
      {currentStep === 0 ? (
        <Container flex={1} flexDirection="column">
          <Text
            mt="16px"
            mb="24px"
            fontSize={18}
            fontWeight="bold"
            value={questions[0]?.text}
          />
          <Container mt="24px" mb="100px" flexDirection="column">
            {data?.map(
              ({ option }) =>
                option?.question?.competence && (
                  <Container
                    p="16px"
                    mb="12px"
                    borderRadius="8px"
                    flexDirection="column"
                    justifyContent="center"
                    onClick={() =>
                      noteQuestion(option.question.competence.title, 0)
                    }
                    border={
                      notes[0] === option.question.competence.title
                        ? "1px solid #3373CC"
                        : "1px solid #E3E5E8"
                    }
                  >
                    <Text
                      color="#494B50"
                      fontSize={"14px"}
                      value={option.question.competence.title}
                    />
                    <Text
                      my="8px"
                      fontSize={"16px"}
                      value={option.question.competence.subtitle}
                    />
                    <Container
                      justifyContent="center"
                      alignItems="center"
                      width="70px"
                      border="1px solid"
                      borderColor={option.selected_color}
                      background={option.selected_color}
                      borderRadius="12px"
                    >
                      <Text
                        value={option.text}
                        color="#fff"
                        m="auto"
                        mr="4px"
                      />
                      <Icon
                        mr="8px"
                        name={option.selected_icon}
                        size={16}
                        color="#fff"
                      />
                    </Container>
                  </Container>
                )
            )}
          </Container>

          <Container
            left="0"
            right="0"
            bottom="0"
            p="24px 16px"
            position="fixed"
          >
            <Button
              mt={3}
              width="100%"
              onClick={goToFeedbackQuestions}
              value={t("Questionnaire.continue")}
              isDisabled={!notes[0]}
            />
          </Container>
        </Container>
      ) : (
        <Container flex={1} flexDirection="column">
          <Container mb="40px" background="#F0F2F5" borderRadius="8px" p="12px">
            <Text
              fontSize="14px"
              color="#191A1B"
              lineHeight="16px"
              fontWeight={600}
              value={notes[0]}
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
                  <TextArea
                    mb="20px"
                    value={notes[index]}
                    onChangeText={(text) => noteQuestion(text, index)}
                  />
                </Container>
              )
          )}

          <Container mb="100px" />

          <Container
            left="0"
            right="0"
            bottom="0"
            p="24px 16px"
            position="fixed"
          >
            <Button
              mt={3}
              width="100%"
              onClick={sendQuestionnaire}
              isDisabled={notes.includes("")}
              value={t("Questionnaire.save")}
            />
          </Container>
        </Container>
      )}
    </>
  );
};

export default QuestionnaireFeedback;
