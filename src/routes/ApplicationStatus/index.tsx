import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Footer, Icon, LoadingDots, Text } from "../../components";
import { useGetApplicationMutation } from "../../service";
import { getLocalNotes } from "../../storage";

const ApplicationStatus: React.FC<{}> = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [notes, setNotes] = useState<string[]>([]);
  const [getApplication, { data, isLoading }] = useGetApplicationMutation();
  const { applicationId } = useParams<{
    applicationId: string;
  }>();

  useEffect(() => {
    setNotes(getLocalNotes());
  }, []);

  useEffect(() => {
    if (applicationId) {
      getApplication({ id: parseInt(applicationId, 10) });
    }
  }, [applicationId, getApplication]);

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
          </Container>

          <Container mt="16px" flexDirection="column">
            <Text
              mb="32px"
              fontSize="24px"
              color="#191A1B"
              fontWeight={600}
              lineHeight="32px"
              value={t("ApplicationStatus.title", { value: data?.id })}
            />

            <Container mb="40px" flexDirection="row">
              <Container
                p="12px"
                mr="6px"
                flex={1}
                borderRadius="12px"
                alignItems="center"
                flexDirection="column"
                background={
                  data?.status === "PENDING_RESPONSE" ? "#F0F2F5" : "#f5f5f5"
                }
                justifyContent="center"
                onClick={() =>
                  data?.status === "PENDING_RESPONSE" &&
                  navigate(
                    `/questionnaire/${applicationId}/${data?.questionnaire_id}`
                  )
                }
              >
                <Icon mb="12px" name="clipboard-notes" size={24} />
                <Text
                  fontSize="12px"
                  fontWeight={500}
                  color="#191A1B"
                  value={t("ApplicationStatus.label-observation")}
                />
              </Container>

              <Container
                flex={1}
                p="12px"
                ml="6px"
                alignItems="center"
                borderRadius="12px"
                flexDirection="column"
                background={
                  data?.status === "PENDING_FEEDBACK" ? "#F0F2F5" : "#f5f5f5"
                }
                onClick={() =>
                  data?.status === "PENDING_FEEDBACK" &&
                  navigate(`/feedback-list/${applicationId}`)
                }
              >
                <Icon mb="12px" name="comments" size={24} />
                <Text
                  fontSize="12px"
                  fontWeight={500}
                  color="#191A1B"
                  value={t("ApplicationStatus.label-feedback")}
                />
              </Container>
            </Container>

            <Text
              mb="24px"
              fontSize="20px"
              color="#191A1B"
              fontWeight={600}
              lineHeight="24px"
              value={t("ApplicationStatus.label-review")}
            />

            <Container
              flexDirection="row"
              flexWrap="wrap"
              justifyContent="space-between"
            >
              {notes.map((note, index) => (
                <Container
                  key={index}
                  p="12px"
                  mb="24px"
                  minHeight="80px"
                  borderRadius="12px"
                  width="calc(50% - 32px)"
                  border="1px solid #E3E5E8"
                  onClick={() => navigate(`/questionnaire-review/${index}`)}
                >
                  <Text
                    fontSize="12px"
                    color="#191A1B"
                    lineHeight="16px"
                    value={note}
                  />
                </Container>
              ))}
              <Container
                p="12px"
                mb="24px"
                minHeight="80px"
                borderRadius="12px"
                alignItems="center"
                flexDirection="column"
                justifyContent="center"
                width="calc(50% - 32px)"
                border="1px solid #E3E5E8"
                onClick={() =>
                  navigate(
                    `/questionnaire-review/${applicationId}/${data?.questionnaire_id}`
                  )
                }
              >
                <Icon mb="8px" name="plus" size={24} />
                <Text
                  fontSize="14px"
                  color="#191A1B"
                  value={t("ApplicationStatus.new-review")}
                />
              </Container>
            </Container>
          </Container>
        </>
      )}

      <Footer />
    </Container>
  );
};

export default ApplicationStatus;
