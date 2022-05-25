import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Container, Footer, Text } from "../../components";
import { SCHOOLS } from "../../mocks";

const SchoolsList: React.FC<{}> = () => {
  const navigate = useNavigate();

  return (
    <>
      <Container width="100%" height="100%" mb="100px" flexDirection="column">
        <Text fontSize={32} mt={24}>
          Choose a school
        </Text>
        <Container flexWrap="wrap" m="24px -8px">
          {SCHOOLS.map((teacher, index) => (
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
                  🏫
                </Text>
                <Container flexDirection="column" justifyContent="center">
                  <Text fontWeight="bold">Name</Text>
                  <Text>{teacher.name}</Text>
                </Container>
              </Container>
              <Button
                mt="24px"
                value="Choose"
                onClick={() => {
                  navigate(`${index}`);
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

export default SchoolsList;
