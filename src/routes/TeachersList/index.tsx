import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, Container, Footer, Text } from "../../components";
import { SCHOOLS, TEACHERS } from "../../mocks";

const TeachersList: React.FC<{}> = () => {
  const navigate = useNavigate();
  const { schoolId } = useParams<{ schoolId: string }>();

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
        {schoolId && (
          <Text fontSize={32} mt={24}>
            🏫 {SCHOOLS[parseInt(schoolId, 10)].name}
          </Text>
        )}
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

export default TeachersList;
