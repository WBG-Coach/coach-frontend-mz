import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Footer, Icon, Image, Text } from "../../components";
import { APPLICATIONS, SCHOOLS, TEACHERS } from "../../mocks";
import LogoSmall from "../../assets/images/logo-small.svg";
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
        <Container
          mb="24px"
          mt="-24px"
          height="94px"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Image height={32} src={LogoSmall} />
          {schoolId && (
            <Image
              height={40}
              width={40}
              src={SCHOOLS[parseInt(schoolId, 10)].image}
              border="1px solid #F0F3F5"
              borderRadius="50%"
            />
          )}
        </Container>

        {teacherId && (
          <Container
            mb="40px"
            width="100%"
            height="56px"
            alignContent="center"
            justifyContent="center"
            flexDirection="row"
          >
            <Image
              mr="12px"
              width={56}
              height={56}
              borderRadius="50%"
              src={TEACHERS[parseInt(teacherId, 10)].image}
            />
            <Container flex={1} flexDirection="column" justifyContent="center">
              <Text
                mb="8px"
                lineHeight="24px"
                fontWeight={600}
                color="#00121A"
                fontSize="20px"
              >
                {TEACHERS[parseInt(teacherId, 10)].name}
              </Text>
              <Text lineHeight="20px" color="#2B363B" fontSize="14px">
                Professor de Português
              </Text>
            </Container>
          </Container>
        )}

        <Text
          fontSize="20px"
          lineHeight="24px"
          fontWeight={600}
          mt={24}
          mb="120px"
        >
          Competences
        </Text>

        <Text
          mt={24}
          mb="8px"
          fontSize="20px"
          lineHeight="24px"
          fontWeight={600}
        >
          Sessions
        </Text>

        <Container flexWrap="wrap">
          {APPLICATIONS.map((application, index) => (
            <Container
              key={index}
              width="100%"
              height="88px"
              alignItems="center"
              justifyContent="center"
              flexDirection="row"
              borderTop={index !== 0 ? "1px solid #F0F3F5" : ""}
              onClick={() => navigate("/questionnaire")}
            >
              <Icon size={24} name="notes" mr="12px" />

              <Container
                flex={1}
                flexDirection="column"
                justifyContent="center"
              >
                <Text
                  lineHeight="24px"
                  fontWeight={600}
                  color="#00121A"
                  fontSize={16}
                >
                  {application.name}
                </Text>
                <Text lineHeight="16px" color="#455054" fontSize={12}>
                  {format(application.date, "yyyy/MM/dd")}
                </Text>
              </Container>
              <Icon size={24} name="chevron-right" />
            </Container>
          ))}
        </Container>
      </Container>
      <Footer />
    </>
  );
};

export default Home;
