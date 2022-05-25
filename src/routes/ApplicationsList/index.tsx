import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, Container, Footer, Text } from "../../components";
import { APPLICATIONS, SCHOOLS, TEACHERS } from "../../mocks";
import { format } from "date-fns";

const Home: React.FC<{}> = () => {
  const { schoolId, teacherId } = useParams<{
    schoolId: string;
    teacherId: string;
  }>();
  const navigate = useNavigate();

  return (
    <>
      <Container width="100%" height="100%" mb="100px" flexDirection="column">
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
        <Container>
          {schoolId && (
            <Text fontSize={32} mt={24} mr={4}>
              🏫 {SCHOOLS[parseInt(schoolId, 10)].name}
            </Text>
          )}
          {teacherId && (
            <Text fontSize={32} mt={24}>
              🎓 {TEACHERS[parseInt(teacherId, 10)].name}
            </Text>
          )}
        </Container>

        <Text fontSize={32} mt={24}>
          Choose a application
        </Text>

        <Container flexWrap="wrap" m="24px -8px">
          {APPLICATIONS.map((application, index) => (
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
                  📝
                </Text>
                <Container flexDirection="column" justifyContent="center">
                  <Text fontWeight="bold">{application.name}</Text>
                  <Text>{format(application.date, "yyyy-MM-dd")}</Text>
                </Container>
              </Container>
              <Button
                mt="24px"
                value="Assess"
                onClick={() => {
                  navigate("/questionary");
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
