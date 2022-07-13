import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Container, Icon, ListItem, Text } from "../../../components";
import { openGuide } from "../../../store/guide";
import { Answer } from "../../../store/type";

type Props = {
  data: Answer[];
};

export const CompetenceList: React.FC<Props> = ({ data }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
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
              <ListItem
                key={index}
                title={answer?.option?.question?.competence.title}
                description={answer?.option?.question?.competence.subtitle}
                onClick={() => {
                  dispatch(
                    openGuide(
                      answer?.option?.question?.competence.content_guide_id
                    )
                  );
                }}
                leftContent={
                  <Container
                    width="24px"
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
                }
              />
            )
        )}
      </Container>
    </Container>
  );
};
