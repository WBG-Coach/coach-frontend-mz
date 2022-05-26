import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Footer, Icon, Image, Text } from "../../components";
import LogoSmall from "../../assets/images/logo-small.svg";
import { SCHOOLS, TEACHERS } from "../../mocks";

const TeachersList: React.FC<{}> = () => {
  const navigate = useNavigate();
  const { schoolId } = useParams<{ schoolId: string }>();

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

        {schoolId && (
          <Text fontSize={24} fontWeight={600} color="#00121A">
            {SCHOOLS[parseInt(schoolId, 10)].name}
          </Text>
        )}

        <Text
          mb="4px"
          mt="32px"
          fontSize={20}
          lineHeight="24px"
          fontWeight={600}
          value="Teachers"
          color="#00121A"
        />
        <Text
          fontSize={14}
          fontWeight={400}
          color="#2B363B"
          lineHeight="20px"
          value="These are the teachers allocated to you."
        />

        <Container flexWrap="wrap" my="16px">
          {TEACHERS.map((teacher, index) => (
            <Container
              key={index}
              width="100%"
              height="88px"
              alignContent="center"
              justifyContent="center"
              flexDirection="row"
              borderTop={index !== 0 ? "1px solid #F0F3F5" : ""}
              onClick={() => navigate(`${index}`)}
            >
              <Image
                mr="12px"
                width={56}
                height={56}
                borderRadius="50%"
                src={teacher.image}
              />
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
                  {teacher.name}
                </Text>
                <Text lineHeight="16px" color="#455054" fontSize={12}>
                  Professor de Português
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

export default TeachersList;
