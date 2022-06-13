import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Footer, Icon, LoadingDots, Text } from "../../components";
import { useGetApplicationMutation } from "../../service";
import { StatusItem } from "./StatusItem";

const ApplicationStatus: React.FC<{}> = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [getApplication, { data, isLoading }] = useGetApplicationMutation();
  const { applicationId } = useParams<{
    applicationId: string;
  }>();

  useEffect(() => {
    if (applicationId) {
      getApplication({ id: parseInt(applicationId, 10) });
    }
  }, [applicationId, getApplication]);

  return (
    <Container width="100%" height="100%" mb="100px" flexDirection="column">
      {isLoading ? (
        <LoadingDots />
      ) : (
        <>
          <Container mb="24px" flexDirection="row" p="16px 0" mt="-16px">
            <Container onClick={() => navigate(-1)}>
              <Icon name="arrow-left" size={24} />
            </Container>
            <Container flex={1} justifyContent="center">
              <Text
                fontSize="16px"
                color="#191A1B"
                fontWeight={600}
                lineHeight="24px"
                value={t("ApplicationStatus.title", { value: data?.id })}
              />
            </Container>
            <Container width="24px" />
          </Container>

          <Container mt="32px" flexDirection="column">
            <Text
              mb="24px"
              fontSize="20px"
              color="#191A1B"
              fontWeight={600}
              lineHeight="24px"
              value={t("ApplicationStatus.steps")}
            />

            <StatusItem
              label={t("ApplicationStatus.label-observation")}
              description={t("ApplicationStatus.description-observation")}
              onClick={() =>
                navigate(
                  `/questionnaire/${applicationId}/${data?.questionnaire_id}`
                )
              }
            />

            <StatusItem
              label={t("ApplicationStatus.label-feedback")}
              description={t("ApplicationStatus.description-feedback")}
              onClick={() =>
                navigate(
                  `/questionnaire-feedback/${applicationId}/${data?.questionnaire_id}`
                )
              }
            />

            <StatusItem
              label={t("ApplicationStatus.label-review")}
              description={t("ApplicationStatus.description-review")}
              onClick={() =>
                navigate(
                  `/questionnaire-review/${applicationId}/${data?.questionnaire_id}`
                )
              }
            />
          </Container>
        </>
      )}

      <Footer />
    </Container>
  );
};

export default ApplicationStatus;
