import React from "react";
import { StyledFooter } from "./styles";
import { FooterProps } from "./types";
import { Container } from "../Container";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/auth";
import { Text } from "../Text";
import { useNavigate } from "react-router-dom";
import { Icon } from "../Icon";
import { Image } from "../Image";
import { useTheme } from "styled-components";
import { useTranslation } from "react-i18next";
const Guide = require("../../assets/Coach_Guide.pdf");

export const Footer: React.FC<FooterProps> = (props) => {
  const user = useSelector(selectCurrentUser);
  const navigate = useNavigate();
  const theme: any = useTheme();
  const { t } = useTranslation();

  const openGuide = () => {
    window.open(Guide, "_black");
  };

  return (
    <StyledFooter {...props}>
      <Container
        flex={1}
        height="100%"
        alignItems="center"
        flexDirection="column"
        justifyContent="center"
        hoverColor="#0071BC20"
        onClick={() => navigate("/teachers")}
      >
        <Icon mb="8px" name="home" size={24} color={theme.colors.primary} />
        <Text
          fontSize={12}
          color={theme.colors.primary}
          value={t("Menu.home")}
        />
      </Container>

      <Container
        flex={1}
        height="100%"
        alignItems="center"
        flexDirection="column"
        justifyContent="center"
        hoverColor="#0071BC20"
        onClick={openGuide}
      >
        <Icon mb="8px" name="file" size={24} color="#2C4668" />
        <Text fontSize={12} color="#2C4668" value={t("Menu.guide")} />
      </Container>

      <Container
        flex={1}
        height="100%"
        alignItems="center"
        flexDirection="column"
        justifyContent="center"
        hoverColor="#0071BC20"
        onClick={() => navigate("/profile")}
      >
        <Image
          mb="8px"
          width={24}
          height={24}
          borderRadius="50%"
          src={user?.image_url || ""}
        />
        <Text fontSize={12} color="#2C4668" value="Profile" />
      </Container>
    </StyledFooter>
  );
};
