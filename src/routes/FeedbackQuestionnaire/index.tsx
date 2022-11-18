import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Button,
  Container,
  LoadingDots,
  Text,
  TextArea,
} from "../../components";
import { QuestionnaireHeader } from "../ObservationQuestionnaire/QuestionnaireHeader";
import {
  useAnswerFeedbackMutation,
  useGetAnswersMutation,
  useGetQuestionsMutation,
} from "../../service";
import { Answer } from "../../store/type";
import { useSelector } from "react-redux";
import { getLocation } from "../../util";
import FirstFeedbackQuestion from "./FirstFeedbackQuestion";
import { selectCurrentUser } from "../../store/auth";
import { FeedbackOnboardingModal } from "./FeedbackOnboardingModal";

const FeedbackQuestionnaire: React.FC<{}> = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);
  const [answer, setAnswer] = useState<Answer>();
  const [getAnswers, { data }] = useGetAnswersMutation();
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoadingAnswer, setIsLoadingAnswer] = useState(false);
  const [getQuestions, questionsRequest] = useGetQuestionsMutation();
  const [answerFeedback] = useAnswerFeedbackMutation();
  const [notes, setNotes] = useState<string[]>([]);
  const { teacherId, applicationId } = useParams<{
    teacherId: string;
    applicationId: string;
  }>();

  useEffect(() => {
    if (applicationId) {
      getQuestions({
        questionnaire_id: user.project?.feedback_questionnaire?.id || 0,
        teacher_id: parseInt(teacherId || ""),
      }).then((response: any) =>
        setNotes(new Array(response?.data?.questions.length).fill(""))
      );
    }
  }, [applicationId, getQuestions, teacherId, user]);

  const noteQuestion = (text: string, index: number) => {
    setNotes(notes.map((oldNode, i) => (i === index ? text : oldNode)));
  };

  const sendQuestionnaire = async () => {
    if (answer?.id) {
      setIsLoadingAnswer(true);
      const location = await getLocation();

      await answerFeedback({
        ...location,
        answer_id: answer.id,
        feedback_answers: notes.map((note, index) => ({
          notes: note,
          questionnaire_question_id:
            questionsRequest?.data?.questions[index].id || 0,
        })),
      });

      setIsLoadingAnswer(false);
      navigate(`/feedback-details/${applicationId}`);
    }
  };

  const onSelectAnswer = (selectedAnswer: Answer) => {
    setCurrentStep(1);
    setAnswer(selectedAnswer);
  };

  useEffect(() => {
    if (user.project?.observation_questionnaire?.id && applicationId) {
      getAnswers({
        questionnaire_application_id: parseInt(applicationId, 10),
        questionnaire_id: user.project.observation_questionnaire.id,
      });
    }
  }, [user, applicationId, getAnswers]);

  return (
    <>
      {isLoadingAnswer ? (
        <LoadingDots />
      ) : (
        <>
          <QuestionnaireHeader
            title={t("Questionnaire.header-feedback")}
            onClose={() => navigate(`/application-details/${applicationId}`)}
          />
          {currentStep === 0 ? (
            <FirstFeedbackQuestion
              answers={data || []}
              onConfirmAnswer={onSelectAnswer}
              applicationId={parseInt(applicationId || "", 10)}
            />
          ) : (
            <Container flex={1} flexDirection="column">
              <Text
                my="8px"
                fontSize={20}
                fontWeight="600"
                lineHeight="24px"
                value={t("Questionnaire.title-feedback-form")}
              />
              <Text
                mb="32px"
                fontSize={14}
                color="#49504C"
                lineHeight="20px"
                value={t("Questionnaire.description-feedback-form")}
              />

              {questionsRequest?.data?.questions?.map(
                (questionnaireQuestion, index) => (
                  <Container key={index} flexDirection="column">
                    <Text
                      mb="8px"
                      fontWeight="600"
                      fontSize="14px"
                      lineHeight="18px"
                      value={
                        questionnaireQuestion.question.text +
                        `(${t("Validations.optional")})`
                      }
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
                  value={t("Questionnaire.finish-feedback")}
                />
              </Container>
            </Container>
          )}
        </>
      )}
      <FeedbackOnboardingModal />
    </>
  );
};

export default FeedbackQuestionnaire;
