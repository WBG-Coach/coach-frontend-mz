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
    <Container width="100%" flexDirection="column">
      <Text fontSize={32} mt={24}>
        Selected teacher name
      </Text>
      <Card width="100%" mt={24} flexDirection="column">
        <Container justifyContent="space-between">
          <Text>{questions[currentQuestion]?.type}</Text>
          <Text fontSize={18}>
            {currentQuestion + 1 + "/" + questions.length}
          </Text>
        </Container>

        <Text fontSize={18} my={24} fontWeight="bold">
          {questions[currentQuestion]?.title}
        </Text>

        {questions[currentQuestion]?.type === "choose" ? (
          <Container>
            <Button
              mr={2}
              value="A"
              width="100%"
              onClick={() => setCurrentQuestion(currentQuestion + 1)}
            />
            <Button
              ml={2}
              value="B"
              width="100%"
              onClick={() => setCurrentQuestion(currentQuestion + 1)}
            />
          </Container>
        ) : (
          <Container flexDirection="column">
            <textarea style={{ height: 100 }} />
            <Button
              mt={3}
              value="Send"
              onClick={() => setCurrentQuestion(currentQuestion + 1)}
            />
          </Container>
        )}
      </Card>
    </Container>
  );
};

export default Questionary;
