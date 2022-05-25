import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Container, Text } from "../../components";
import { questions } from "../../mocks";

const Questionary: React.FC<{}> = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);

  useEffect(() => {
    if (currentQuestion === 5) navigate(-1);
  }, [navigate, currentQuestion]);

  return (
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
      <Card minWidth="calc(100% - 32px)" mt={24} flexDirection="column">
        <Container justifyContent="space-between">
          <Button
            value={questions[currentQuestion]?.competence}
            onClick={() => {
              alert("Open details modal");
            }}
          />
          <Text fontSize={18}>
            {currentQuestion + 1 + "/" + questions.length}
          </Text>
        </Container>

        <Text fontSize={18} my={24} fontWeight="bold">
          {questions[currentQuestion]?.title}
        </Text>

        <Container flexDirection="column">
          <textarea style={{ height: 100 }} placeholder="..." />
        </Container>

        {questions[currentQuestion]?.type === "choose" && (
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
        )}
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

export default Questionary;
