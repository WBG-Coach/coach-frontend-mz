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
  const [showComments, setShowComments] = useState(false);
  const [answers, setAnswers] = useState<Array<number | undefined>>([]);
  const [getQuestions, { data, isLoading }] = useGetQuestionsMutation();
  const { teacherId } = useParams<{ teacherId: string }>();

  useEffect(() => {
    // TODO: REMOVE THIS FIXED ID
    getQuestions({
      questionnaire_id: 1,
    });
  }, [getQuestions]);

  useEffect(() => {
    if (data) {
      setFiles(new Array(data?.length).fill([]));
      setNotes(new Array(data?.length).fill(undefined));
      setAnswers(new Array(data?.length).fill(undefined));
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

    if (data && data[currentQuestion]?.question.type === "LIST")
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
      questionnaire_application_id: parseInt(teacherId || "", 10),
      answers:
        (data &&
          data.map(
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
    setIsLoadingAnswer(false);
    setFinish(true);
  };

  const changeQuestion = (index: number) => {
    setShowComments(false);
    setCurrentQuestion(index);
  };

  return isLoading || isLoadingAnswer ? (
    <LoadingDots />
  ) : (
    <Container flex={1} flexDirection="column">
      <QuestionnaireHeader title={t("Questionnaire.title")} />

      {isFinish ? (
        <FinishContainer />
      ) : (
        <>
          <ButtonQuestionList
            questions={data || []}
            onClick={changeQuestion}
            currentQuestion={currentQuestion}
          />

          <Container flexDirection="column">
            <Text fontSize={18} fontWeight="bold">
              {data && data[currentQuestion]?.question?.text}
            </Text>

            {data && data[currentQuestion]?.question?.competence && (
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
                        data[currentQuestion]?.question?.competence
                          .content_guide_id
                      )
                    )
                  }
                >
                  <Text
                    value={
                      data[currentQuestion]?.question?.competence.title || ""
                    }
                  />
                </Container>
              </Container>
            )}

            {data &&
              data.map(
                (_, index) =>
                  index === currentQuestion && (
                    <OptionsList
                      onClick={answerQuestion}
                      selectedOptionId={answers[currentQuestion]}
                      type={data[currentQuestion]?.question.type || ""}
                      options={data[currentQuestion]?.question.options || []}
                    />
                  )
              )}
          </Container>

          {data && data[currentQuestion]?.question.type !== "LIST" && (
            <>
              {showComments || notes[currentQuestion] ? (
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
              ) : (
                <Container
                  background="#F4F5F5"
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

          {data && data[currentQuestion]?.question.last_answers && (
            <LastAnswersList
              lastAnswers={data[currentQuestion].question.last_answers || []}
            />
          )}

          {data && data[currentQuestion]?.question.type !== "LIST" && (
            <Container
              left="0"
              right="0"
              bottom="0"
              p="24px 16px"
              position="fixed"
            >
              {currentQuestion + 1 === data?.length ? (
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
