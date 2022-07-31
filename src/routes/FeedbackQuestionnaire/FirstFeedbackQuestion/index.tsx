import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  Container,
  Icon,
  LoadingDots,
  Text,
} from "../../../components";
import {
  useCountCompetenceFeedbacksMutation,
  useGetApplicationMutation,
} from "../../../service";
import { Answer, Count } from "../../../store/type";

const FirstFeedbackQuestion: React.FC<{
  applicationId: number;
  answers: Answer[];
  onConfirmAnswer: (answer: Answer) => void;
}> = ({ applicationId, onConfirmAnswer, answers }) => {
  const { t } = useTranslation();
  const [answer, setAnswer] = useState<Answer>();
  const [isLoading, setIsLoading] = useState(true);
  const [haveThumbsDown, setHaveThumbsDown] = useState(false);
  const [countFeedback, setCountFeedbacks] = useState<Count[]>([]);

  const [countCompetenceFeedback] = useCountCompetenceFeedbacksMutation();
  const [getApplication] = useGetApplicationMutation();

  useEffect(() => {
    if (applicationId && answers) {
      setHaveThumbsDown(
        !!answers.find((item) => item.option?.selected_icon === "thumbs-down")
      );
      getApplication({ id: applicationId }).then((application: any) => {
        Promise.all(
          answers.map((answer): Promise<Count> => {
            if (answer.option?.question?.competency_id)
              return countCompetenceFeedback({
                competence_id: answer.option?.question?.competency_id,
                teacher_id: application.data.teacher_id,
              }).then((response: any) => response.data);
            return Promise.resolve({ quantity: 0 });
          })
        ).then((counts) => {
          setIsLoading(false);
          setCountFeedbacks(counts);
        });
      });
    }
  }, [applicationId, countCompetenceFeedback, getApplication, answers]);

  const invalidAnswer = useMemo(
    () => answer?.option?.selected_icon === "thumbs-up",
    [answer]
  );

  const maxFeedbacksPerCompetence = useMemo(
    () =>
      countFeedback &&
      countFeedback[answers?.findIndex((item) => item.id === answer?.id) || 0]
        ?.quantity > 2,
    [answer, countFeedback, answers]
  );

  return isLoading ? (
    <LoadingDots />
  ) : (
    <Container flex={1} flexDirection="column">
      <Text
        mt="16px"
        mb="24px"
        fontSize={18}
        fontWeight="bold"
        value={"Selecione uma competência para dar o feedback"}
      />
      <Container mt="24px" mb="100px" flexDirection="column">
        {invalidAnswer && haveThumbsDown && (
          <Text
            mb="16px"
            color="#e53935"
            value="Selecione uma competência a melhorar"
          />
        )}
        {maxFeedbacksPerCompetence && (
          <Text
            mb="16px"
            color="#e53935"
            value="Você ja fez 3 feedbacks nesta competência"
          />
        )}

        {answers?.map(
          (currentAnswer, index) =>
            currentAnswer.option?.question?.competence && (
              <Container
                p="16px"
                mb="12px"
                key={index}
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

      <Container left="0" right="0" bottom="0" p="24px 16px" position="fixed">
        <Button
          mt={3}
          width="100%"
          onClick={() => answer && onConfirmAnswer(answer)}
          value={t("Questionnaire.continue")}
          isDisabled={invalidAnswer || maxFeedbacksPerCompetence}
        />
      </Container>
    </Container>
  );
};

export default FirstFeedbackQuestion;
