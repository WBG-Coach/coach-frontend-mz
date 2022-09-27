import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Container, Icon, LoadingDots, Text } from "../../../components";
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
  const [isLoading, setIsLoading] = useState(true);
  const [maxFeedbacksPerCompetence, setMaxFeedbacksPerCompetence] =
    useState(false);
  const [countFeedback, setCountFeedbacks] = useState<Count[]>([]);

  const [countCompetenceFeedback] = useCountCompetenceFeedbacksMutation();
  const [getApplication] = useGetApplicationMutation();

  useEffect(() => {
    if (applicationId && answers) {
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

  const haveOnlyPositive = useMemo(
    () =>
      !answers?.find((item) => item.option?.selected_icon === "thumbs-down"),
    [answers]
  );

  const selectAnswer = (answer: Answer) => {
    if (
      countFeedback &&
      countFeedback[answers?.findIndex((item) => item.id === answer?.id) || 0]
        ?.quantity > 2
    ) {
      setMaxFeedbacksPerCompetence(true);
    } else {
      onConfirmAnswer(answer);
    }
  };

  return isLoading ? (
    <LoadingDots />
  ) : (
    <Container flex={1} flexDirection="column">
      <Text
        my="8px"
        fontSize={20}
        fontWeight="600"
        lineHeight="24px"
        value={t("Questionnaire.title-feedback")}
      />
      <Text
        mb="32px"
        fontSize={14}
        color="#49504C"
        lineHeight="20px"
        value={t("Questionnaire.description-feedback")}
      />

      <Container flexDirection="column">
        {maxFeedbacksPerCompetence && (
          <Text
            mb="16px"
            color="#e53935"
            value="Você ja fez 3 feedbacks nesta competência"
          />
        )}

        {answers?.map(
          (currentAnswer, index) =>
            currentAnswer.option?.question?.competence &&
            (haveOnlyPositive ||
              currentAnswer.option.selected_icon === "thumbs-down") && (
              <Container
                p="16px"
                key={index}
                borderRadius="8px"
                flexDirection="row"
                alignItems="center"
                justifyContent="center"
                borderBottom="1px solid #F4F5F5"
                onClick={() => selectAnswer(currentAnswer)}
              >
                <Container
                  mr="8px"
                  width="24px"
                  height="24px"
                  alignItems="center"
                  borderRadius="12px"
                  justifyContent="center"
                  background={currentAnswer?.option.selected_color}
                >
                  <Icon
                    size={16}
                    color="#fff"
                    name={currentAnswer?.option?.selected_icon || ""}
                  />
                </Container>
                <Container flexDirection="column" flex={1}>
                  <Text
                    mb="4px"
                    color="#49504C"
                    fontSize={"14px"}
                    lineHeight="20px"
                    value={currentAnswer?.option.question.competence.title}
                  />
                  <Text
                    fontSize={"14px"}
                    lineHeight="20px"
                    fontWeight="500"
                    value={currentAnswer?.option.question.competence.subtitle}
                  />
                </Container>
                <Icon size={24} name="chevron-right" color="#7D827F" />
              </Container>
            )
        )}
      </Container>
    </Container>
  );
};

export default FirstFeedbackQuestion;
