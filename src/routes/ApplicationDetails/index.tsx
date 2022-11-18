import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Icon, Image, LoadingDots, Text } from "../../components";
import { useGetApplicationMutation } from "../../service";
import { TimelineItem } from "../../components/TimelineItem";
import { format } from "date-fns";

const ApplicationDetails: React.FC = () => {
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

  useEffect(() => {
    if (applicationId) {
      getApplication({ id: parseInt(applicationId, 10) });
    }
  }, [applicationId, getApplication]);

  const getPrepareFeedbackStatus = () => {
    if (data?.status === "PENDING_FEEDBACK") return "current";
    return "complete";
  };

  const getFeedbackStatus = () => {
    if (data?.status === "PENDING_MEET") return "current";
    if (data?.status === "PENDING_DOCUMENTATION") return "complete";
    if (data?.status === "DONE") return "complete";
    return "pending";
  };

  const getDocumentationStatus = () => {
    if (data?.status === "PENDING_DOCUMENTATION") return "current";
    if (data?.status === "DONE") return "complete";
    return "pending";
  };

  return (
    <Container width="100%" height="100%" mb="100px" flexDirection="column">
      {isLoading ? (
        <LoadingDots />
      ) : (
        <>
          <Container
            p="16px 0"
            mt="-16px"
            flexDirection="row"
            justifyContent="flex-end"
          >
            <Container onClick={() => navigate(`/teacher/${data?.teacher.id}`)}>
              <Icon name="close" size={24} />
            </Container>
          </Container>

          <Container mt="8px" flexDirection="column">
            <Text
              mb="8px"
              fontSize="24px"
              color="#191A1B"
              fontWeight={600}
              lineHeight="32px"
              value={t("ApplicationStatus.title")}
            />

            <Container mb="8px">
              <Icon name="calender" size={20} color="#49504C" mr="4px" />
              <Text
                fontSize="14px"
                color="#49504C"
                lineHeight="20px"
                value={t("ApplicationStatus.started-at", {
                  value: format(
                    data?.application_date
                      ? new Date(data?.application_date)
                      : new Date(),
                    "dd/MM/yyyy"
                  ),
                })}
              />
            </Container>

            <Container width="100%" alignItems="center" mb="24px">
              {data?.teacher?.image_url ? (
                <Image
                  mr="4px"
                  width={20}
                  height={20}
                  borderRadius="50%"
                  src={data.teacher.image_url}
                />
              ) : (
                <Container
                  mr="4px"
                  width="20px"
                  height="20px"
                  alignItems="center"
                  borderRadius="24px"
                  background="#F0F2F5"
                  justifyContent="center"
                >
                  <Text
                    fontSize={14}
                    lineHeight="20px"
                    value={data?.teacher?.name
                      ?.substring(0, 1)
                      .concat(data?.teacher?.last_name?.substring(0, 1) || "")}
                  />
                </Container>
              )}

              <Text
                fontSize="14px"
                fontWeight={400}
                lineHeight="18px"
                color="#49504C"
                value={data?.teacher?.name}
              />
            </Container>
          </Container>

          <TimelineItem
            isFirst
            title={t("ApplicationStatus.observation-title")}
            buttonValue=""
            description=""
            status="complete"
            onClick={() =>
              navigate(`/questionnaire-observation-review/${applicationId}`)
            }
          />
          <TimelineItem
            title={t("ApplicationStatus.prepare-feedback-title")}
            buttonValue={t("ApplicationStatus.prepare-feedback-button")}
            description={t("ApplicationStatus.prepare-feedback-description")}
            onClick={() => {
              if (data?.status === "PENDING_FEEDBACK")
                navigate(
                  `/questionnaire-feedback/${applicationId}/${data?.teacher.id}`
                );
              else navigate(`/feedback-details/${applicationId}`);
            }}
            status={getPrepareFeedbackStatus()}
          />

          <TimelineItem
            title={t("ApplicationStatus.feedback-title")}
            buttonValue={t("ApplicationStatus.feedback-button")}
            description={t("ApplicationStatus.feedback-description")}
            onClick={() => {
              navigate(`/feedback-details/${applicationId}`);
            }}
            status={getFeedbackStatus()}
          />

          <TimelineItem
            isLast
            title={t("ApplicationStatus.documentation-title")}
            buttonValue={t("ApplicationStatus.documentation-button")}
            description={t("ApplicationStatus.documentation-description")}
            onClick={() => {
              if (data?.status === "DONE") {
                navigate(
                  `/documentation-details/${applicationId}/${data?.teacher.id}`
                );
              } else {
                navigate(
                  `/documentation-questionnaire/${applicationId}/${data?.teacher.id}`
                );
              }
            }}
            status={getDocumentationStatus()}
          />
        </>
      )}
    </Container>
  );
};

export default ApplicationDetails;
