import React from "react";
import { useTranslation } from "react-i18next";
import { Container, Icon, Text } from "../../../components";
import { Answer } from "../../../store/type";

type Props = {
  lastAnswers?: Answer[];
};

export const LastAnswersList: React.FC<Props> = ({
  lastAnswers: lastAnwsers,
}) => {
  const { t } = useTranslation();

  return !!lastAnwsers ? (
    <Container mt="24px" mb="100px" flexDirection="column">
      <Text
        mb="24px"
        fontSize="20px"
        fontWeight={600}
        value={t("Questionnaire.previous-sessions")}
      />
      {lastAnwsers.map((answer) => (
        <Container mb="24px" flexDirection="row" alignItems="center">
          <Container
            mr="8px"
            width="24px"
            height="24px"
            borderRadius="12px"
            background={answer.option?.selected_color}
          >
            {answer.option?.selected_icon && (
              <Icon
                m="auto"
                size={16}
                color="#fff"
                name={answer.option?.selected_icon}
              />
            )}
          </Container>
          <Container flexDirection="column">
            <Text fontWeight={600} mb="4px" value={answer.option?.text || ""} />
            <Text value={answer.notes} />
          </Container>
        </Container>
      ))}
    </Container>
  ) : (
    <></>
  );
};
