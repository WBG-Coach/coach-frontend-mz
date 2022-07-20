import React, { useState } from "react";
import { StyledFooter, StyledGuideModal } from "./styles";
import { FooterProps } from "./types";
import { Container } from "../Container";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/auth";
import { Text } from "../Text";
import { useLocation, useNavigate } from "react-router-dom";
import { Icon } from "../Icon";
import { Image } from "../Image";
import { useTranslation } from "react-i18next";
import { PROJECT } from "../../mock";
import PDF from "react-pdf-js";
const Guide = require("../../assets/Coach_Guide.pdf");

export const Footer: React.FC<FooterProps> = (props) => {
  const user = useSelector(selectCurrentUser);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const [showGuide, setShowGuide] = useState(false);
  const [numberPages, setNumberPages] = useState(0);
  const [page, setPage] = useState(1);

  return (
    <>
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
          <Icon
            mb="8px"
            name="home"
            size={24}
            color={pathname !== "/profile" ? PROJECT.primaryColor : "#2C4668"}
          />
          <Text
            fontSize={12}
            color={pathname !== "/profile" ? PROJECT.primaryColor : "#2C4668"}
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
          onClick={() => setShowGuide(true)}
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
          {user?.image_url ? (
            <Image
              mb="8px"
              width={24}
              height={24}
              borderRadius="50%"
              src={user?.image_url || ""}
            />
          ) : (
            <Container
              mb="4px"
              height="28px"
              width="28px"
              alignItems="center"
              borderRadius="14px"
              background={
                pathname === "/profile" ? PROJECT.primaryColor : "#F0F2F5"
              }
              justifyContent="center"
            >
              <Text
                fontSize={10}
                color={pathname === "/profile" ? "#fff" : "#2C4668"}
                value={user?.name
                  ?.substring(0, 1)
                  .concat(user?.last_name?.substring(0, 1) || "")}
              />
            </Container>
          )}
          <Text
            fontSize={12}
            color={pathname === "/profile" ? PROJECT.primaryColor : "#2C4668"}
            value="Profile"
          />
        </Container>
      </StyledFooter>

      {showGuide && (
        <StyledGuideModal>
          <Container
            width="100%"
            height="50px"
            justifyContent="flex-end"
            alignItems="center"
          >
            <Container mr="16px" onClick={() => setShowGuide(false)}>
              <Icon name="close" size={24} />
            </Container>
          </Container>
          <Container
            overflowX="scroll"
            height="100%"
            maxHeight="calc(100vh - 100px)"
          >
            <PDF file={Guide} page={page} onDocumentComplete={setNumberPages} />
          </Container>
          <Container
            height="50px"
            width="100%"
            alignItems="center"
            justifyContent="space-between"
          >
            <Container onClick={() => page > 1 && setPage(page - 1)} ml="16px">
              <Icon name="chevron-right" size={24} rotate={180} />
            </Container>
            <Text value={`${page}/${numberPages}`} />
            <Container
              onClick={() => page < numberPages && setPage(page + 1)}
              mr="16px"
            >
              <Icon name="chevron-right" size={24} />
            </Container>
          </Container>
        </StyledGuideModal>
      )}
    </>
  );
};
