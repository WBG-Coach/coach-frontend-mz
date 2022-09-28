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
} from "../../components";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/auth";

const DocumentationDetails: React.FC<{}> = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const { applicationId } = useParams<{ applicationId: string }>();
  const [getAnswers, { data, isLoading }] = useGetAnswersMutation();

  useEffect(() => {
    if (user.project?.doc_questionnaire?.id && applicationId) {
      getAnswers({
        questionnaire_application_id: parseInt(applicationId, 10),
        questionnaire_id: user.project.doc_questionnaire.id,
      });
    }
  }, [user, applicationId, getAnswers]);

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
          {data[currentQuestion].option?.question?.text || ""}
        </Text>

        {data[currentQuestion].option?.text && (
          <Container mt="24px" flexDirection="column">
            <OptionButton
              mb="16px"
              textAlign="left"
              isSelected={true}
              variant="secondary"
              onClick={() => {}}
              value={data[currentQuestion].option?.text || ""}
              selectedColor={data[currentQuestion].option?.selected_color}
            />
          </Container>
        )}
        {data[currentQuestion].notes && (
          <Text
            fontSize="16px"
            color="#191A1B"
            lineHeight="24px"
            value={data[currentQuestion].notes || "-"}
          />
        )}
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

export default DocumentationDetails;
