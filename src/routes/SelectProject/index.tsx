import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Image, Text } from "../../components";
import WBGLogo from "../../assets/images/WBG.png";
import { Input } from "../../components/Input";
import { useTranslation } from "react-i18next";
import { LanguageButton } from "../../components/LanguageButton";
import { PROJECT } from "../../mock";

const SelectProject: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const DATA = [PROJECT];

  return (
    <Container
      m="auto"
      width="100%"
      flexDirection="column"
      height="calc(100vh - 32px)"
    >
      <Container
        width="100%"
        flexDirection="row"
        justifyContent="space-between"
      >
        <Image p="16px" src={WBGLogo} height={24} />
        <LanguageButton />
      </Container>

      <Text
        my="24px"
        fontSize="24px"
        lineHeight="32px"
        fontWeight={600}
        value={t("SelectProject.title")}
      />

      <Input
        onChangeText={() => {}}
        placeholder={t("SelectProject.search")}
        icon="search"
      />

      <Container mt="16px" flexDirection="column" width="100%">
        {DATA.map((project) => (
          <Container py="16px" onClick={() => navigate(`login/${project.id}`)}>
            <Container
              mr="12px"
              p="4px"
              borderRadius="24px"
              border="1px solid #E4E7E5"
              height="40px"
              width="40px"
            >
              <Image src={project.image} />
            </Container>
            <Container flexDirection="column">
              <Text
                mb="4px"
                fontSize="16px"
                fontWeight={600}
                lineHeight="24px"
                value={project.name}
              />
              <Text value={project.country} fontSize="14px" lineHeight="20px" />
            </Container>
          </Container>
        ))}
      </Container>
    </Container>
  );
};

export default SelectProject;
