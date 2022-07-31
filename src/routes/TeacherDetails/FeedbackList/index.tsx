import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Button, Container, Icon, Text } from "../../../components";
import { Feedback } from "../../../store/type";

type Props = {
  data: Feedback[];
};

export const FeedbackList: React.FC<Props> = ({ data }) => {
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
          value={t("TeacherDetails.feedbacks")}
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
          (feedback, index) =>
            feedback.questionnaire_application?.status !== "DONE" &&
            feedback?.competence && (
              <Container
                p="16px"
                mb="16px"
                key={index}
                overflow="visible"
                borderRadius="12px"
                position="relative"
                background="#F0F2F5"
                flexDirection="column"
                border="1px solid #E3E5E8"
                justifyContent="space-between"
              >
                <Text
                  mb="8px"
                  color="#494B50"
                  fontSize="14px"
                  lineHeight="18px"
                  fontWeight={400}
                  value={feedback?.competence?.title}
                />
                <Text
                  color="#000000"
                  fontSize="16px"
                  lineHeight="24px"
                  fontWeight={500}
                  value={feedback?.competence?.subtitle}
                />
                <Button
                  mt="24px"
                  onClick={() => {
                    navigate(`/feedback-details/${feedback.id}`);
                  }}
                  value={t("TeacherDetails.see-feedback")}
                />
              </Container>
            )
        )}
      </Container>
    </Container>
  );
};
