import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button, Container, Icon, Text, TextArea } from "../../components";
import { QuestionnaireHeader } from "../ObservationQuestionnaire/QuestionnaireHeader";
import {
  useAnswerFeedbackMutation,
  useGetAnswersMutation,
  useGetQuestionsMutation,
} from "../../service";
import { Answer } from "../../store/type";

const FeedbackQuestionnaire: React.FC<{}> = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [answer, setAnswer] = useState<Answer>();
  const [currentStep, setCurrentStep] = useState(0);
  const [getAnswer, { data }] = useGetAnswersMutation();
  const [getQuestions, questionsRequest] = useGetQuestionsMutation();
  const [answerFeedback] = useAnswerFeedbackMutation();
  const [notes, setNotes] = useState<string[]>([]);
  const { applicationId, questionnaireId } = useParams<{
    applicationId: string;
    questionnaireId: string;
  }>();

  useEffect(() => {
    if (questionnaireId)
      getQuestions(parseInt(questionnaireId, 10)).then((response: any) =>
        setNotes(new Array(response?.data?.questions.length).fill(""))
      );
  }, [getQuestions, questionnaireId]);

  useEffect(() => {
    if (applicationId) getAnswer(parseInt(applicationId, 10));
  }, [applicationId, getAnswer]);

  const noteQuestion = (text: string, index: number) => {
    setNotes(notes.map((oldNode, i) => (i === index ? text : oldNode)));
  };

  const goToFeedbackQuestions = () => {
    setCurrentStep(1);
  };

  const sendQuestionnaire = () => {
    if (answer?.id) {
      answerFeedback({
        answer_id: answer.id,
        feedback_answers: notes.map((note, index) => ({
          notes: note,
          questionnaire_question_id:
            questionsRequest?.data?.questions[index].id || 0,
        })),
      }).then(() => {
        navigate(-1);
      });
    }
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
            value={"Selecione uma competência para dar o feedback"}
          />
          <Container mt="24px" mb="100px" flexDirection="column">
            {data?.map(
              (currentAnswer) =>
                currentAnswer.option?.question?.competence && (
                  <Container
                    p="16px"
                    mb="12px"
                    borderRadius="8px"
                    flexDirection="column"
                    justifyContent="center"
                    onClick={() => setAnswer(currentAnswer)}
                    border={
                      answer?.id === currentAnswer?.id
                        ? "1px solid #3373CC"
                        : "1px solid #E3E5E8"
                    }
                  >
                    <Text
                      color="#494B50"
                      fontSize={"14px"}
                      value={currentAnswer?.option.question.competence.title}
                    />
                    <Text
                      my="8px"
                      fontSize={"16px"}
                      value={currentAnswer?.option.question.competence.subtitle}
                    />
                    <Container
                      justifyContent="center"
                      alignItems="center"
                      width="70px"
                      border="1px solid"
                      borderColor={currentAnswer?.option.selected_color}
                      background={currentAnswer?.option.selected_color}
                      borderRadius="12px"
                    >
                      <Text
                        value={currentAnswer?.option.text}
                        color="#fff"
                        m="auto"
                        mr="4px"
                      />
                      <Icon
                        mr="8px"
                        size={16}
                        color="#fff"
                        name={currentAnswer?.option?.selected_icon || ""}
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
              isDisabled={!answer?.id}
            />
          </Container>
        </Container>
      ) : (
        <Container flex={1} flexDirection="column">
          <Container
            flexDirection="column"
            mb="40px"
            background="#F0F2F5"
            borderRadius="8px"
            p="12px"
          >
            <Text
              mb="4px"
              fontSize="10px"
              color="#494B50"
              lineHeight="16px"
              fontWeight={400}
              value={answer?.option?.question?.competence.title}
            />
            <Text
              fontSize="14px"
              color="#191A1B"
              lineHeight="16px"
              fontWeight={600}
              value={answer?.option?.question?.competence.subtitle}
            />
          </Container>

          {questionsRequest?.data?.questions?.map(
            (questionnaireQuestion, index) => (
              <Container key={index} flexDirection="column">
                <Text
                  mb="8px"
                  color="#494B50"
                  fontSize="14px"
                  lineHeight="18px"
                  value={questionnaireQuestion.question.text}
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

export default FeedbackQuestionnaire;
