import React, { ReactNode, useEffect, useState } from "react";
import { QuestionnaireHeader } from "./QuestionnaireHeader";
import { ButtonQuestionList } from "./ButtonQuestionList";
import { useParams } from "react-router-dom";
import { Answer, AnswerFile } from "../../store/type";
import { FinishContainer } from "./FinishContainer";
import { useTranslation } from "react-i18next";
import { useTheme } from "styled-components";
import { getLocation, uploadFileToS3 } from "../../util";
import { OptionsList } from "./OptionsList";
import {
  useGetQuestionsMutation,
  useGetApplicationMutation,
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
import { useDispatch } from "react-redux";
import { openGuide } from "../../store/guide";

const ObservationQuestionnaire: React.FC<{}> = () => {
  const theme: any = useTheme();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [isLoadingAnswer, setIsLoadingAnswer] = useState(false);
  const [isFinish, setFinish] = useState(false);
  const [files, setFiles] = useState<AnswerFile[][]>([[]]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answerQuestionnaire] = useAnswerQuestionnaireMutation();
  const [notes, setNotes] = useState<Array<string | undefined>>([]);
  const [answers, setAnswers] = useState<Array<number | undefined>>([]);
  const [getQuestions, { data, isLoading }] = useGetQuestionsMutation();
  const [getApplication, applicationRequest] = useGetApplicationMutation();
  const { applicationId } = useParams<{ applicationId: string }>();

  useEffect(() => {
    if (applicationId) {
      getQuestions({
        questionnaire_application_id: parseInt(applicationId, 10),
      });
      getApplication({ id: parseInt(applicationId, 10) });
    }
  }, [applicationId, getQuestions, getApplication]);

  useEffect(() => {
    if (data?.questions) {
      setFiles(new Array(data?.questions.length).fill([]));
      setNotes(new Array(data?.questions.length).fill(undefined));
      setAnswers(new Array(data?.questions.length).fill(undefined));
    }
  }, [data]);

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

    if (data?.questions[currentQuestion]?.question.type === "LIST")
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
    const location = await getLocation();
    await answerQuestionnaire({
      ...location,
      questionnaire_application_id: parseInt(applicationId || "", 10),
      answers:
        data?.questions.map(
          (questionnaireQuestion, index): Answer => ({
            questionnaire_question_id: questionnaireQuestion.id,
            option_id: answers[index] || 0,
            notes: notes[index] || "",
            files: files[index],
          })
        ) || [],
    });
    setIsLoadingAnswer(false);
    setFinish(true);
  };

  return isLoading || isLoadingAnswer || applicationRequest.isLoading ? (
    <LoadingDots />
  ) : (
    <Container flex={1} flexDirection="column">
      <QuestionnaireHeader title={t("Questionnaire.title")} />

      {isFinish ? (
        <FinishContainer />
      ) : (
        <>
          <ButtonQuestionList
            currentQuestion={currentQuestion}
            onClick={(index) => setCurrentQuestion(index)}
            questions={data?.questions || []}
          />

          <Container flexDirection="column">
            <Text fontSize={18} fontWeight="bold">
              {data?.questions[currentQuestion]?.question?.text}
            </Text>

            {data?.questions[currentQuestion]?.question?.competence && (
              <Container mb="24px">
                <Container
                  mt="8px"
                  p="8px 16px"
                  width="auto"
                  borderRadius="20px"
                  background="#F0F2F5"
                  onClick={() =>
                    dispatch(
                      openGuide(
                        data?.questions[currentQuestion]?.question?.competence
                          .content_guide_id
                      )
                    )
                  }
                >
                  <Text
                    value={
                      data?.questions[currentQuestion]?.question?.competence
                        .title || ""
                    }
                  />
                </Container>
              </Container>
            )}

            {data?.questions.map(
              (_, index) =>
                index === currentQuestion && (
                  <OptionsList
                    onClick={answerQuestion}
                    selectedOptionId={answers[currentQuestion]}
                    type={data?.questions[currentQuestion]?.question.type || ""}
                    options={
                      data?.questions[currentQuestion]?.question.options || []
                    }
                  />
                )
            )}
          </Container>

          {data?.questions[currentQuestion]?.question.type !== "LIST" && (
            <Container mt="16px" flexDirection="column">
              {notes.map(
                (note: string | undefined, index: number): ReactNode =>
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
          )}

          <Container mt="16px" flexDirection="column">
            {files.map(
              (fileList: AnswerFile[], index: number): ReactNode =>
                currentQuestion === index &&
                fileList.map((file) => (
                  <Container
                    p="16px"
                    mt="16px"
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

          {data?.questions[currentQuestion]?.question.last_answers && (
            <LastAnswersList
              lastAnwsers={
                data.questions[currentQuestion].question.last_answers || []
              }
            />
          )}

          {data?.questions[currentQuestion]?.question.type !== "LIST" && (
            <Container
              left="0"
              right="0"
              bottom="0"
              p="24px 16px"
              position="fixed"
            >
              {currentQuestion + 1 === data?.questions.length ? (
                <Button
                  mt={3}
                  width="100%"
                  onClick={sendQuestionnaire}
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
  );
};

export default ObservationQuestionnaire;
