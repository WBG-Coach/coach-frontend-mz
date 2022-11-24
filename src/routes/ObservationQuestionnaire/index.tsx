import React, { ReactNode, useEffect, useState } from "react";
import { QuestionnaireHeader } from "./QuestionnaireHeader";
import { ButtonQuestionList } from "./ButtonQuestionList";
import { useNavigate, useParams } from "react-router-dom";
import { Answer, AnswerFile } from "../../store/type";
import { FinishContainer } from "./FinishContainer";
import { useTranslation } from "react-i18next";
import { useTheme } from "styled-components";
import { getLocation, uploadFileToS3 } from "../../util";
import { OptionsList } from "./OptionsList";
import {
  useGetQuestionsMutation,
  useAnswerQuestionnaireMutation,
} from "../../service";
import {
  Icon,
  Text,
  Button,
  TextArea,
  Container,
  LoadingDots,
} from "../../components";
import { LastAnswersList } from "./LastAnswersList";
import { useDispatch, useSelector } from "react-redux";
import { openGuide } from "../../store/guide";
import { selectCurrentUser } from "../../store/auth";
import { format } from "date-fns";
import { OnboardingApplicationModal } from "./OnboardingApplicationModal";
import { ConfirmModal } from "../../components/ConfirmModal";
import { toast } from "react-toastify";

const ObservationQuestionnaire: React.FC<{}> = () => {
  const theme: any = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const user = useSelector(selectCurrentUser);
  const [isLoadingAnswer, setIsLoadingAnswer] = useState(false);
  const [files, setFiles] = useState<AnswerFile[][]>([[]]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answerQuestionnaire, answerRequest] = useAnswerQuestionnaireMutation();
  const [notes, setNotes] = useState<Array<string | undefined>>([]);
  const [showComments, setShowComments] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [answers, setAnswers] = useState<Array<number | undefined>>([]);
  const [getQuestions, { data, isLoading }] = useGetQuestionsMutation();
  const { teacherId } = useParams<{ teacherId: string }>();

  useEffect(() => {
    if (user?.project?.observation_questionnaire?.id) {
      getQuestions({
        questionnaire_id: user.project?.observation_questionnaire.id,
        teacher_id: parseInt(teacherId || "0"),
      });
    }
  }, [user, teacherId, getQuestions]);

  useEffect(() => {
    if (data?.questions) {
      setFiles(new Array(data?.questions?.length).fill([]));
      setNotes(new Array(data?.questions?.length).fill(undefined));
      setAnswers(new Array(data?.questions?.length).fill(undefined));
    }
  }, [data?.questions]);

  const addImage = async (file: File) => {
    try {
      const fileUrl = await uploadFileToS3(file);

      setFiles(
        files.map((fileList, index) =>
          index === currentQuestion ? [...fileList, fileUrl] : fileList
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

  const answerQuestion = (newOptionID: number) => {
    setAnswers(
      answers.map((currentOption, index) =>
        index === currentQuestion ? newOptionID : currentOption
      )
    );

    if (
      data?.questions &&
      data?.questions[currentQuestion]?.question.type === "LIST"
    )
      goToNextQuestion();
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

  const sendQuestionnaire = async () => {
    setIsLoadingAnswer(true);
    setShowConfirmModal(false);
    try {
      const location = await getLocation();

      await answerQuestionnaire({
        project_id: user.project?.id || 0,
        questionnaire_application: {
          coach_id: user.id || 0,
          teacher_id: parseInt(teacherId || "0"),
          school_id: user.selectedSchool?.id || 0,
          application_date: format(new Date(), "yyyy-MM-dd"),
        },
        answers:
          (data?.questions &&
            data?.questions.map(
              (questionnaireQuestion, index): Answer => ({
                questionnaire_question_id: questionnaireQuestion.id,
                option_id: answers[index] || 0,
                notes: notes[index] || "",
                files: files[index],
                ...location,
              })
            )) ||
          [],
      });
    } catch {
      toast.error("API ERROR");
    }
    setIsLoadingAnswer(false);
  };

  const changeQuestion = (index: number) => {
    setShowComments(false);
    setCurrentQuestion(index);
  };

  return (
    <>
      {isLoading || isLoadingAnswer ? (
        <LoadingDots />
      ) : (
        <Container flex={1} flexDirection="column">
          <QuestionnaireHeader
            title={t("Questionnaire.title")}
            onClose={() => navigate(`/teacher/${teacherId}`)}
          />

          {answerRequest.data?.id ? (
            <FinishContainer applicationId={answerRequest.data.id} />
          ) : (
            <>
              <ButtonQuestionList
                questions={data?.questions || []}
                onClick={changeQuestion}
                currentQuestion={currentQuestion}
              />

              <Container flexDirection="column">
                <Text fontSize={18} fontWeight="bold">
                  {data?.questions &&
                    data?.questions[currentQuestion]?.question?.text}
                </Text>

                {data?.questions &&
                  data?.questions[currentQuestion]?.question?.competence && (
                    <Container
                      mt="8px"
                      p="12px"
                      mb="32px"
                      width="100%"
                      borderRadius="20px"
                      background="#F4F5F5"
                      flexDirection="column"
                      onClick={() =>
                        dispatch(
                          openGuide(
                            data?.questions[currentQuestion]?.question
                              ?.competence.content_guide_id
                          )
                        )
                      }
                    >
                      <Container mb="8px" alignItems="center">
                        <Icon
                          name="puzzle-piece"
                          size={16}
                          mr="4px"
                          color="#49504C"
                        />
                        <Text
                          fontSize={"12px"}
                          lineHeight="16px"
                          color="#49504C"
                          value={
                            data?.questions[currentQuestion]?.question
                              ?.competence.title || ""
                          }
                        />
                      </Container>
                      <Text
                        fontSize="14px"
                        lineHeight="20px"
                        fontWeight="500"
                        value={
                          data?.questions[currentQuestion]?.question?.competence
                            .subtitle || ""
                        }
                      />
                    </Container>
                  )}

                {data?.questions &&
                  data?.questions.map(
                    (_, index) =>
                      index === currentQuestion && (
                        <OptionsList
                          key={index}
                          onClick={answerQuestion}
                          selectedOptionId={answers[currentQuestion]}
                          type={
                            data?.questions[currentQuestion]?.question.type ||
                            ""
                          }
                          options={
                            data?.questions[currentQuestion]?.question
                              .options || []
                          }
                        />
                      )
                  )}
              </Container>

              {data?.questions &&
                data?.questions[currentQuestion]?.question.type !== "LIST" && (
                  <>
                    {showComments || notes[currentQuestion] ? (
                      <Container mt="16px" flexDirection="column">
                        {notes.map(
                          (
                            note: string | undefined,
                            index: number
                          ): ReactNode =>
                            currentQuestion === index && (
                              <TextArea
                                key={index}
                                value={note}
                                onLoadFile={addImage}
                                onChangeText={(text) => noteQuestion(text)}
                              />
                            )
                        )}
                      </Container>
                    ) : (
                      <Container
                        background="#F4F5F5"
                        mt="16px"
                        p="12px"
                        borderRadius="12px"
                        onClick={() => setShowComments(true)}
                      >
                        <Icon name="plus" size={24} mr="8px" />
                        <Text
                          fontSize="16px"
                          fontWeight="500"
                          lineHeight="24px"
                          value={t("Questionnaire.add-comment")}
                        />
                      </Container>
                    )}
                  </>
                )}

              <Container flexDirection="column">
                {files.map(
                  (fileList: AnswerFile[], index: number): ReactNode =>
                    currentQuestion === index &&
                    fileList.map((file) => (
                      <Container
                        p="16px"
                        mt="16px"
                        key={index}
                        borderRadius="8px"
                        border="1px solid"
                        borderColor={theme.colors.primary}
                        justifyContent="space-between"
                        onClick={() => {
                          window.open(file.url, "_blank");
                        }}
                      >
                        <Text value={file.name} color={theme.colors.primary} />
                        <Icon
                          size={24}
                          name="file-blank"
                          color={theme.colors.primary}
                        />
                      </Container>
                    ))
                )}
              </Container>

              {data?.questions &&
                data?.questions[currentQuestion]?.question.last_answers && (
                  <LastAnswersList
                    lastAnswers={
                      data?.questions[currentQuestion].question.last_answers ||
                      []
                    }
                  />
                )}

              {data?.questions &&
                data?.questions[currentQuestion]?.question.type !== "LIST" && (
                  <Container
                    left="0"
                    right="0"
                    bottom="0"
                    p="24px 16px"
                    position="fixed"
                  >
                    {currentQuestion + 1 === data?.questions?.length ? (
                      <Button
                        mt={3}
                        width="100%"
                        onClick={() => setShowConfirmModal(true)}
                        value={t("Questionnaire.finish")}
                        isDisabled={answers.includes(undefined)}
                      />
                    ) : (
                      <Button
                        mt={3}
                        width="100%"
                        onClick={goToNextQuestion}
                        value={t("Questionnaire.continue")}
                        isDisabled={!answers[currentQuestion]}
                      />
                    )}
                  </Container>
                )}
            </>
          )}
        </Container>
      )}
      <ConfirmModal
        isOpen={showConfirmModal}
        title={t("Questionnaire.observation-confirm-title")}
        description={t("Questionnaire.observation-confirm-description")}
      >
        <Button
          mb="12px"
          value={t("Questionnaire.finish")}
          onClick={sendQuestionnaire}
        />
        <Button
          variant="secondary"
          value={t("Questionnaire.cancel-finish")}
          onClick={() => setShowConfirmModal(false)}
        />
      </ConfirmModal>
      <OnboardingApplicationModal />
    </>
  );
};

export default ObservationQuestionnaire;
