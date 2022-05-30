import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, Container, Text } from "../../components";
import { LoadingDots } from "../../components/LoadingDots";
import { useGetQuestionsMutation } from "../../service";

const Questionnaire: React.FC<{}> = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const { applicationId } = useParams<{ applicationId: string }>();
  const [getQuestions, { data, isLoading }] = useGetQuestionsMutation();

  useEffect(() => {
    if (applicationId) getQuestions(parseInt(applicationId, 10));
  }, [applicationId, getQuestions]);

  return isLoading ? (
    <LoadingDots />
  ) : (
    <Container flex={1} flexDirection="column">
      <Container alignItems="center" onClick={() => navigate(-1)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="#0071BC"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
          />
        </svg>
        <Text color="#0071BC" value="Back" />
      </Container>
      <Container my={3} flexDirection="row">
        {data?.questions.map((_, index) => (
          <Button
            mr={3}
            onClick={() => setCurrentQuestion(index)}
            value={`Question ${index + 1}`}
            variant={index === currentQuestion ? "primary" : "secondary"}
          />
        ))}
      </Container>
      <Card minWidth="calc(100% - 32px)" mt={24} flexDirection="column">
        <Container justifyContent="space-between">
          <Button
            variant="secondary"
            value={
              data?.questions[currentQuestion]?.question.competence.name || ""
            }
            onClick={() => {
              alert("Open details modal");
            }}
          />
          <Text fontSize={18}>
            {currentQuestion + 1 + "/" + data?.questions.length}
          </Text>
        </Container>

        <Text fontSize={18} my={24} fontWeight="bold">
          {data?.questions[currentQuestion]?.question?.text}
        </Text>

        <Container flexDirection="column">
          <textarea style={{ height: 100 }} placeholder="..." />
        </Container>

        <Container mt="24px">
          <Button
            variant="secondary"
            mr={2}
            value="YES"
            width="100%"
            onClick={() => {}}
          />
          <Button
            variant="secondary"
            ml={2}
            value="NO"
            width="100%"
            onClick={() => {}}
          />
        </Container>
      </Card>

      <Button
        mt={3}
        value="Next"
        width="100%"
        onClick={() => setCurrentQuestion(currentQuestion + 1)}
      />
    </Container>
  );
};

export default Questionnaire;
