import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Container, Icon, Text } from "../../../components";
import { Answer } from "../../../store/type";

type Props = {
  data: Answer[];
};

export const CompetenceList: React.FC<Props> = ({ data }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Container flexDirection="column" borderBottom="1px solid #F0F2F5">
      <Container
        py="24px"
        justifyContent="space-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Text
          fontSize="20px"
          lineHeight="24px"
          fontWeight={600}
          value={t("TeacherDetails.competences")}
        />
        <Icon rotate={isOpen ? 90 : 0} size={24} name="chevron-right" />
      </Container>

      <Container
        height="auto"
        overflow="hidden"
        flexDirection="column"
        maxHeight={isOpen ? "1000px" : "0px"}
      >
        {data.map(
          (answer, index) =>
            answer?.option?.question?.competence && (
              <Container
                p="12px"
                mb="12px"
                key={index}
                overflow="visible"
                position="relative"
                borderRadius="8px"
                flexDirection="column"
                border="1px solid #E3E5E8"
                justifyContent="space-between"
                onClick={() =>
                  navigate(
                    `/guide-content/${answer?.option?.question?.competence.content_guide_id}`
                  )
                }
              >
                <Text
                  mb="8px"
                  color="#494B50"
                  fontSize="14px"
                  lineHeight="18px"
                  fontWeight={500}
                  value={answer?.option?.question?.competence?.title}
                />
                <Text
                  mb="8px"
                  color="#000000"
                  fontSize="16px"
                  lineHeight="24px"
                  fontWeight={500}
                  value={answer?.option?.question?.competence?.subtitle}
                />
                <Container
                  width="32px"
                  height="24px"
                  alignItems="center"
                  borderRadius="24px"
                  justifyContent="center"
                  background={answer?.option?.selected_color}
                >
                  <Icon
                    size={16}
                    color="#fff"
                    name={answer?.option?.selected_icon || ""}
                  />
                </Container>
              </Container>
            )
        )}
      </Container>
    </Container>
  );
};
