import React, { ReactNode, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Answer } from "../../store/type";
import { useTranslation } from "react-i18next";
import { getLocation } from "../../util";
import {
  useGetQuestionsMutation,
  useAnswerQuestionnaireMutation,
} from "../../service";
import {
  Text,
  Button,
  TextArea,
  Container,
  LoadingDots,
} from "../../components";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/auth";
import { QuestionnaireHeader } from "../ObservationQuestionnaire/QuestionnaireHeader";
import { ButtonQuestionList } from "../ObservationQuestionnaire/ButtonQuestionList";
import { OptionsList } from "../ObservationQuestionnaire/OptionsList";
import { FinishContainer } from "./FinishContainer";

const DocumentationQuestionnaire: React.FC<{}> = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const user = useSelector(selectCurrentUser);
  const [isLoadingAnswer, setIsLoadingAnswer] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answerQuestionnaire, answerRequest] = useAnswerQuestionnaireMutation();
  const [notes, setNotes] = useState<Array<string | undefined>>([]);
  const [answers, setAnswers] = useState<Array<number | undefined>>([]);
  const [getQuestions, { data, isLoading }] = useGetQuestionsMutation();
  const { teacherId, applicationId } = useParams<{
    teacherId: string;
    applicationId: string;
  }>();

  useEffect(() => {
    if (user.project?.doc_questionnaire?.id) {
      getQuestions({
        questionnaire_id: user.project?.doc_questionnaire?.id,
        teacher_id: parseInt(teacherId || "0"),
      });
    }
  }, [user, teacherId, getQuestions]);

  useEffect(() => {
    if (data?.questions) {
      setNotes(new Array(data?.questions?.length).fill(undefined));
      setAnswers(new Array(data?.questions?.length).fill(undefined));
    }
  }, [data?.questions]);

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
    const location = await getLocation();
    await answerQuestionnaire({
      questionnaire_application_id: parseInt(applicationId || ""),
      answers:
        (data?.questions &&
          data?.questions.map(
            (questionnaireQuestion, index): Answer => ({
              questionnaire_question_id: questionnaireQuestion.id,
              option_id: answers[index] || 0,
              notes: notes[index] || "",
              ...location,
            })
          )) ||
        [],
    });
    setIsLoadingAnswer(false);
  };

  const changeQuestion = (index: number) => {
    setCurrentQuestion(index);
  };

  return isLoading || isLoadingAnswer ? (
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
              data?.questions.map(
                (_, index) =>
                  index === currentQuestion && (
                    <OptionsList
                      onClick={answerQuestion}
                      selectedOptionId={answers[currentQuestion]}
                      type={
                        data?.questions[currentQuestion]?.question.type || ""
                      }
                      options={
                        data?.questions[currentQuestion]?.question.options || []
                      }
                    />
                  )
              )}
          </Container>

          {data?.questions[currentQuestion].question.type === "TEXT" && (
            <Container mt="16px" flexDirection="column">
              {notes.map(
                (note: string | undefined, index: number): ReactNode =>
                  currentQuestion === index && (
                    <TextArea
                      key={index}
                      value={note}
                      onChangeText={(text) => noteQuestion(text)}
                    />
                  )
              )}
            </Container>
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
                    onClick={sendQuestionnaire}
                    value={t("Questionnaire.finish")}
                    isDisabled={
                      !!data?.questions.find(
                        (item, index) => !notes[index] && !answers[index]
                      )
                    }
                  />
                ) : (
                  <Button
                    mt={3}
                    width="100%"
                    onClick={goToNextQuestion}
                    value={t("Questionnaire.continue")}
                    isDisabled={
                      !answers[currentQuestion] && !notes[currentQuestion]
                    }
                  />
                )}
              </Container>
            )}
        </>
      )}
    </Container>
  );
};

export default DocumentationQuestionnaire;
