import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Button,
  Container,
  OptionButton,
  Text,
  TextArea,
} from "../../components";
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

const options = [
  {
    id: 1,
    text: "Competencia 2",
    selected_color: undefined,
    selected_icon: undefined,
  },
  {
    id: 2,
    text: "Competencia 5",
    selected_color: undefined,
    selected_icon: undefined,
  },
];

const QuestionnaireFeedback: React.FC<{}> = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Array<number | undefined>>([]);
  const [notes, setNotes] = useState<Array<string | undefined>>([]);
  const { applicationId, questionnaireId } = useParams<{
    applicationId: string;
    questionnaireId: string;
  }>();
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

  const selectOption = (optionId: number) => {
    setAnswers([optionId]);
  };

  const noteQuestion = (text: string, index: number) => {
    setNotes(notes.map((oldNode, i) => (i === index ? text : oldNode)));
  };

  const goToFeedbackQuestions = () => {
    setCurrentStep(1);
  };

  const sendQuestionnaire = () => {
    console.log(applicationId);
    console.log(questionnaireId);
    console.log(answers);
    console.log(notes);
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
          <Container mt="24px" flexDirection="column">
            {options.map((option) => (
              <OptionButton
                key={option.id}
                mb="16px"
                textAlign="left"
                variant="secondary"
                value={option.text}
                selectedColor={option.selected_color}
                onClick={() => selectOption(option.id)}
                selectedIcon={option.selected_icon as any}
                isSelected={answers[0] === option.id}
              />
            ))}
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
              onClick={goToFeedbackQuestions}
              value={t("Questionnaire.continue")}
              isDisabled={!answers[0]}
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
              value={options.find((option) => answers[0] === option.id)?.text}
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
              value={t("Questionnaire.save")}
            />
          </Container>
        </Container>
      )}
    </>
  );
};

export default QuestionnaireFeedback;
