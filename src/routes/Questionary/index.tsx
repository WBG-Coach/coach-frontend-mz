import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Container, Text } from "../../components";

const questions = [
  {
    title:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum",
    type: "choose",
  },
  {
    title: "Cras turpis lectus, consectetur at ante at, faucibus sagittis",
    type: "write",
  },
  {
    title:
      "Cras nec ex non tortor laoreet bibendum ut ac libero. Sed dui felis, tincidunt at eros et, pretium pulvinar arcu. Donec sollicitudin lacus at orci posuere faucibus. Suspendisse potenti.",
    type: "choose",
  },
  {
    title: "Quisque feugiat laoreet neque, ut vestibulum felis rhoncus nec.",
    type: "choose",
  },
  {
    title:
      "Morbi in maximus ex. Praesent nunc ex, venenatis eu sem vel, egestas suscipit velit.",
    type: "write",
  },
];

const Questionary: React.FC<{}> = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);

  useEffect(() => {
    if (currentQuestion === 5) navigate("/home");
  }, [navigate, currentQuestion]);

  return (
    <Container flex={1} flexDirection="column">
      <Container alignItems="center" onClick={() => navigate("/home")}>
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
      <Text fontSize={32} mt={24}>
        Selected teacher name
      </Text>
      <Card minWidth="calc(100% - 32px)" mt={24} flexDirection="column">
        <Container justifyContent="space-between">
          <Text>{questions[currentQuestion]?.type}</Text>
          <Text fontSize={18}>
            {currentQuestion + 1 + "/" + questions.length}
          </Text>
        </Container>

        <Text fontSize={18} my={24} fontWeight="bold">
          {questions[currentQuestion]?.title}
        </Text>

        <Container flexDirection="column">
          <textarea style={{ height: 100 }} placeholder="..." />
          {questions[currentQuestion]?.type === "write" && (
            <Button
              mt={3}
              value="Send"
              onClick={() => setCurrentQuestion(currentQuestion + 1)}
            />
          )}
        </Container>

        {questions[currentQuestion]?.type === "choose" && (
          <Container mt="24px">
            <Button
              mr={2}
              value="YES"
              width="100%"
              onClick={() => setCurrentQuestion(currentQuestion + 1)}
            />
            <Button
              ml={2}
              value="NO"
              width="100%"
              onClick={() => setCurrentQuestion(currentQuestion + 1)}
            />
          </Container>
        )}
      </Card>
    </Container>
  );
};

export default Questionary;
