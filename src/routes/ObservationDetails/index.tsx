import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ButtonQuestionList } from "./ButtonQuestionList";
import { QuestionnaireHeader } from "./QuestionnaireHeader";
import { useGetAnswersMutation } from "../../service";
import {
  Text,
  Button,
  Container,
  LoadingDots,
  OptionButton,
  Icon,
} from "../../components";
import { useTheme } from "styled-components";

const ObservationDetails: React.FC<{}> = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const theme: any = useTheme();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const { applicationId } = useParams<{ applicationId: string }>();
  const [getAnswers, { data, isLoading }] = useGetAnswersMutation();

  useEffect(() => {
    if (applicationId) getAnswers(parseInt(applicationId, 10));
  }, [applicationId, getAnswers]);

  const goToNextQuestion = () => {
    setCurrentQuestion(currentQuestion + 1);
  };

  const close = async () => {
    navigate(-1);
  };

  return isLoading || !data ? (
    <LoadingDots />
  ) : (
    <Container flex={1} flexDirection="column">
      <QuestionnaireHeader title={t("Questionnaire.title")} />

      <ButtonQuestionList
        currentQuestion={currentQuestion}
        onClick={(index) => setCurrentQuestion(index)}
        questions={data || []}
      />

      <Container flexDirection="column">
        <Text fontSize={18} fontWeight="bold">
          {data[currentQuestion].option.question.text}
        </Text>

        {data[currentQuestion].option.question?.competence && (
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
                  data[currentQuestion].option.question?.competence.title || ""
                }
              />
            </Container>
          </Container>
        )}

        <Container mt="24px" flexDirection="column">
          <OptionButton
            mb="16px"
            textAlign="left"
            isSelected={true}
            variant="secondary"
            onClick={() => {}}
            value={data[currentQuestion].option.text}
            selectedColor={data[currentQuestion].option.selected_color}
            selectedIcon={data[currentQuestion].option.selected_icon as any}
          />
        </Container>
      </Container>

      <Container mt="16px" flexDirection="column">
        <Text
          mb="4px"
          color="#494B50"
          fontSize="14px"
          lineHeight="18px"
          value={t("Questionnaire.annotation")}
        />
        <Text
          fontSize="16px"
          color="#191A1B"
          lineHeight="24px"
          value={data[currentQuestion].notes || "-"}
        />
      </Container>

      <Container mt="16px" mb="100px" flexDirection="column">
        {data[currentQuestion].files.map((file: any) => (
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
            <Text
              value={`${
                file.name.length > 35 ? file.name.substring(0, 35) : file.name
              }`}
              color={theme.colors.primary}
            />
            <Icon size={24} name="file-blank" color={theme.colors.primary} />
          </Container>
        ))}
      </Container>

      <Container
        left="0"
        right="0"
        bottom="0"
        p="24px 16px"
        position="absolute"
      >
        {currentQuestion + 1 === data.length ? (
          <Button
            mt={3}
            width="100%"
            onClick={close}
            value={t("Questionnaire.return")}
          />
        ) : (
          <Button
            mt={3}
            width="100%"
            onClick={goToNextQuestion}
            value={t("Questionnaire.continue")}
          />
        )}
      </Container>
    </Container>
  );
};

export default ObservationDetails;
