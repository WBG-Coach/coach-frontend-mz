import React, { ReactNode, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FinishContainer } from "./FinishContainer";
import { ButtonQuestionList } from "./ButtonQuestionList";
import { QuestionnaireHeader } from "./QuestionnaireHeader";
import {
  useAnswerQuestionnaireMutation,
  useGetApplicationMutation,
  useGetQuestionsMutation,
} from "../../service";
import {
  Text,
  Button,
  TextArea,
  Container,
  LoadingDots,
  OptionButton,
  Icon,
} from "../../components";
import { Answer, AnswerFile } from "../../store/type";
import { uploadFileToS3 } from "../../util";
import { useTheme } from "styled-components";

const Questionnaire: React.FC<{}> = () => {
  const theme: any = useTheme();
  const { t } = useTranslation();
  const [isFinish, setFinish] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [getQuestions, { data, isLoading }] = useGetQuestionsMutation();
  const [getApplication, applicationRequest] = useGetApplicationMutation();
  const [answerQuestionnaire] = useAnswerQuestionnaireMutation();
  const [answers, setAnswers] = useState<Array<number | undefined>>([]);
  const [files, setFiles] = useState<AnswerFile[][]>([[]]);
  const [notes, setNotes] = useState<Array<string | undefined>>([]);
  const { applicationId, questionnaireId } = useParams<{
    applicationId: string;
    questionnaireId: string;
  }>();

  useEffect(() => {
    if (questionnaireId) getQuestions(parseInt(questionnaireId, 10));
  }, [questionnaireId, getQuestions]);

  useEffect(() => {
    if (applicationId) getApplication({ id: parseInt(applicationId, 10) });
  }, [applicationId, getApplication]);

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
    await answerQuestionnaire({
      questionnaire_application_id: parseInt(applicationId || "", 10),
      answers:
        data?.questions.map(
          (questionnaireQuestion, index): Answer => ({
            questionnaire_question_id: questionnaireQuestion.id,
            option_id: answers[index] || 0,
            notes: notes[index] || "",
          })
        ) || [],
    });
    setFinish(true);
  };

  return isLoading || applicationRequest.isLoading ? (
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
                  p="4px 8px"
                  width="auto"
                  borderRadius="20px"
                  background="#F0F2F5"
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

            <Container mt="24px" flexDirection="column">
              {data?.questions[currentQuestion]?.question.options.map(
                (option) => (
                  <OptionButton
                    key={option.id}
                    mb="16px"
                    textAlign="left"
                    variant="secondary"
                    value={option.text}
                    selectedColor={option.selected_color}
                    onClick={() => answerQuestion(option.id)}
                    selectedIcon={option.selected_icon as any}
                    isSelected={answers[currentQuestion] === option.id}
                  />
                )
              )}
            </Container>
          </Container>

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

          <Container mt="16px" mb="100px" flexDirection="column">
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
        </>
      )}
    </Container>
  );
};

export default Questionnaire;
