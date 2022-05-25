import React from "react";
import { StyledFooter } from "./styles";
import { FooterProps } from "./types";
import { Container } from "../Container";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/auth";
import { Text } from "../Text";
import { useNavigate } from "react-router-dom";
const Guide = require("../../assets/Coach_Guide.pdf");

export const Footer: React.FC<FooterProps> = (props) => {
  const user: any = useSelector(selectCurrentUser);
  const navigate = useNavigate();

  const openGuide = () => {
    window.open(Guide, "_black");
  };

  return (
    user && (
      <StyledFooter {...props}>
        <Container
          flex={1}
          height="100%"
          alignItems="center"
          justifyContent="center"
          hoverColor="#0071BC20"
          onClick={() => navigate("/applications")}
        >
          <Text
            fontSize={18}
            color="#0071BC"
            fontWeight="600"
            value="Assessments"
          />
        </Container>
        <Container
          flex={1}
          height="100%"
          alignItems="center"
          justifyContent="center"
          hoverColor="#0071BC20"
          onClick={openGuide}
        >
          <Text
            fontSize={18}
            color="#0071BC"
            fontWeight="600"
            value="Coach guide"
          />
        </Container>
      </StyledFooter>
    )
  );
};
