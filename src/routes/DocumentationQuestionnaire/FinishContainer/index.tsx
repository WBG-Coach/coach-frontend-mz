import React from "react";
import { Button, Container, Image, Text } from "../../../components";
import FinishImage from "../../../assets/images/finish-image.svg";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const FinishContainer: React.FC<{ applicationId: number }> = ({
  applicationId,
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <>
      <Container
        mt="100px"
        alignContent="center"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Image src={FinishImage} m="auto" />
        <Text
          mb="16px"
          mt={"32px"}
          fontSize={24}
          fontWeight={600}
          textAlign="center"
          value={t("Questionnaire.finish-documentation-title")}
        />
        <Text
          fontSize={16}
          fontWeight={400}
          textAlign="center"
          value={t("Questionnaire.finish-documentation-description")}
        />
      </Container>

      <Container
        left="0"
        right="0"
        bottom="0"
        p="24px 16px"
        position="absolute"
      >
        <Button
          mt={3}
          width="100%"
          onClick={() => navigate(`/application-details/${applicationId}`)}
          value={t("Questionnaire.continue")}
        />
      </Container>
    </>
  );
};
