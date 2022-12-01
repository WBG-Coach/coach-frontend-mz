import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Button,
  Container,
  Icon,
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
import { useDispatch, useSelector } from "react-redux";
import { getLocation } from "../../util";
import FirstFeedbackQuestion from "./FirstFeedbackQuestion";
import { selectCurrentUser } from "../../store/auth";
import { FeedbackOnboardingModal } from "./FeedbackOnboardingModal";
import { Tabs } from "../../components/Tabs";
import { openGuide } from "../../store/guide";

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
  const [currentTab, setCurrentTab] = useState(0);
  const dispatch = useDispatch();

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

              <Tabs
                onChange={setCurrentTab}
                currentTab={currentTab}
                data={[
                  t("Questionnaire.preparation-notes"),
                  t("Questionnaire.support-material"),
                ]}
              />
              {currentTab === 0 ? (
                <>
                  {questionsRequest?.data?.questions?.map(
                    (questionnaireQuestion, index) => (
                      <Container mt="8px" key={index} flexDirection="column">
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
                  <Container
                    borderRadius="12px"
                    background="#FAFAFA"
                    p="16px"
                    flexDirection="column"
                  >
                    <Container alignItems="center">
                      <Icon name="exclamation-circle" mr="4px" size={20} />
                      <Text
                        value={t("Questionnaire.infos-header")}
                        fontSize="14px"
                      />
                    </Container>
                    <ul>
                      <li>
                        <Text
                          value="Comece com uma pergunta de acolhimento"
                          fontSize="14px"
                          lineHeight="20px"
                        />
                      </li>
                      <li>
                        <Text
                          value="Explique ao professor o porquê de ter escolhido essa competência"
                          fontSize="14px"
                          lineHeight="20px"
                        />
                      </li>
                      <li>
                        <Text
                          value="Prepare-se para demonstrar a competência pedagógica seleccionada"
                          fontSize="14px"
                          lineHeight="20px"
                        />
                      </li>
                      <li>
                        <Text
                          value="Deixe tempo suficiente para o professor praticar"
                          fontSize="14px"
                          lineHeight="20px"
                        />
                      </li>
                      <li>
                        <Text
                          value="Dê retorno ao professor"
                          fontSize="14px"
                          lineHeight="20px"
                        />
                      </li>
                      <li>
                        <Text
                          value="Marque o dia e hora do próximo encontro"
                          fontSize="14px"
                          lineHeight="20px"
                        />
                      </li>
                    </ul>
                  </Container>
                </>
              ) : (
                <>
                  <Container
                    mb="40px"
                    alignItems="flex-start"
                    borderRadius="12px"
                    flexDirection="column"
                  >
                    <Container py="16px" alignItems="center">
                      <Icon name="notes" size={16} mr="8px" />
                      <Container flexDirection="column">
                        <Text
                          fontSize="14px"
                          color="#49504C"
                          lineHeight="18px"
                          value={t("Questionnaire.class-plan")}
                        />

                        {data && (
                          <Text mt="12px" value={data[0].option?.text} />
                        )}
                      </Container>
                    </Container>

                    <Container
                      p="10px 16px"
                      borderRadius="12px"
                      background="#F4F5F5"
                      onClick={() =>
                        data &&
                        dispatch(openGuide(data[0].option?.content_guide_id))
                      }
                    >
                      <Text value={t("Questionnaire.see-class-plan")} />
                    </Container>
                  </Container>

                  <Container
                    mb="40px"
                    alignItems="flex-start"
                    borderRadius="12px"
                    flexDirection="column"
                  >
                    <Container py="16px" alignItems="center">
                      <Icon name="puzzle-piece-solid" size={16} mr="8px" />
                      <Container flexDirection="column">
                        <Text
                          fontSize="14px"
                          color="#49504C"
                          lineHeight="18px"
                          value={t("Questionnaire.selected-competency")}
                        />
                        <Text
                          mt="12px"
                          value={answer?.option?.question?.competence?.subtitle}
                        />
                      </Container>
                    </Container>

                    <Container
                      p="10px 16px"
                      borderRadius="12px"
                      background="#F4F5F5"
                      onClick={() =>
                        data &&
                        dispatch(openGuide(data[0].option?.content_guide_id))
                      }
                    >
                      <Text value={t("Questionnaire.see-competence")} />
                    </Container>
                  </Container>
                </>
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
