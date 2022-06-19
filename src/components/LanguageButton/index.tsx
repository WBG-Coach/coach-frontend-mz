import React from "react";
import UsaFlag from "../../assets/images/flags/usa.png";
import MozanbiqueFlag from "../../assets/images/flags/mozanbique.png";
import { useTranslation } from "react-i18next";
import { Container } from "../Container";
import { Image } from "../Image";

const IMAGES: any = {
  "pt-MZ": MozanbiqueFlag,
  "en-US": UsaFlag,
};

export const LanguageButton: React.FC<{}> = () => {
  const { i18n } = useTranslation();

  const handleLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  return (
    <>
      <Container>
        <Container
          onClick={() =>
            handleLanguage(i18n.language === "pt-MZ" ? "en-US" : "pt-MZ")
          }
        >
          <Image src={IMAGES[i18n.language]} width={40} />
        </Container>
      </Container>
    </>
  );
};
