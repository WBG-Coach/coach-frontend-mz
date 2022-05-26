import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Image, Text } from "../../components";
import LogoSmall from "../../assets/images/logo-small.svg";
import { SCHOOLS } from "../../mocks";
import useDeviceDetection from "../../hooks/IsMobile";

const SchoolsList: React.FC<{}> = () => {
  const { isMobile } = useDeviceDetection();
  const navigate = useNavigate();

  return (
    <Container width="100%" height="100%" mb="100px" flexDirection="column">
      <Image height={32} src={LogoSmall} mb="40px" />
      <Text fontSize={32} fontWeight={600} textAlign="center" mb="32px">
        Choose a school
      </Text>
      <Container flexWrap="wrap" justifyContent="center">
        {SCHOOLS.map((school, index) => (
          <Container
            m="8px"
            mt="16px"
            key={index}
            alignItems="center"
            alignContent="center"
            flexDirection="column"
            onClick={() => navigate(`${index}`)}
            width={isMobile ? "calc(50% - 16px)" : 200}
          >
            <Image
              src={school.image}
              width={80}
              height={80}
              border="1px solid #F0F3F5"
              borderRadius="50%"
            />
            <Text mt="16px" mb="24px" fontSize={14} value={school.name} />
          </Container>
        ))}
      </Container>
    </Container>
  );
};

export default SchoolsList;
