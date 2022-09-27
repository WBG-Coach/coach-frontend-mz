import React from "react";
import { format } from "date-fns";
import { Application } from "../../../store/type";
import { Container, Icon, Text } from "../../../components";
import { useTranslation } from "react-i18next";

type Props = {
  applications?: Application[];
  onClick: (applicationId: number) => void;
};

export const ApplicationsList: React.FC<Props> = ({
  applications,
  onClick,
}) => {
  const { t } = useTranslation();
  return (
    <Container flexDirection="column" borderBottom="1px solid #F0F2F5">
      <Container flexDirection="column">
        {applications &&
          applications.map((application, index) => (
            <Container
              key={index}
              width="100%"
              height="76px"
              alignItems="center"
              flexDirection="row"
              justifyContent="center"
              borderTop={index !== 0 ? "1px solid #F0F3F5" : ""}
              onClick={() => onClick(application.id)}
            >
              <Icon size={24} name="notes" mr="12px" color="#C7CAD1" />

              <Container
                flex={1}
                flexDirection="column"
                justifyContent="center"
              >
                <Text
                  fontSize="16px"
                  color="#191A1B"
                  lineHeight="24px"
                  value={t("TeacherDetails.session-name", {
                    value: application.order,
                  })}
                />
                <Text
                  fontSize="14px"
                  color="#494B50"
                  lineHeight="16px"
                  value={format(
                    new Date(application.application_date),
                    "yyyy/MM/dd"
                  )}
                />
              </Container>
              <Icon size={24} name="chevron-right" color="#C7CAD1" />
            </Container>
          ))}
      </Container>
    </Container>
  );
};
