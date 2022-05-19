import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Container, Footer, Text } from "../../components";

const TEACHERS = [
  {
    name: "Teacher 1",
  },
  {
    name: "Teacher 2",
  },
  {
    name: "Teacher 3",
  },
  {
    name: "Teacher 4",
  },
  {
    name: "Teacher 5",
  },
];

const Home: React.FC<{}> = () => {
  const navigate = useNavigate();

  return (
    <>
      <Container width="100%" height="100%" mb="100px" flexDirection="column">
        <Text fontSize={32} mt={24}>
          School Name
        </Text>
        <Container flexWrap="wrap" m="24px -8px">
          {TEACHERS.map((teacher, index) => (
            <Card
              m="8px"
              mt="16px"
              key={index}
              width="300px"
              alignContent="center"
              flexDirection="column"
            >
              <Container flexDirection="row">
                <Text mr="16px" fontSize={40}>
                  🎓
                </Text>
                <Container flexDirection="column" justifyContent="center">
                  <Text fontWeight="bold">Name</Text>
                  <Text>{teacher.name}</Text>
                </Container>
              </Container>
              <Button
                mt="24px"
                value="Assess"
                onClick={() => {
                  navigate("/questionnaire");
                }}
              />
            </Card>
          ))}
        </Container>
      </Container>
      <Footer />
    </>
  );
};

export default Home;
