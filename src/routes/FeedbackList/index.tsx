import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Container,
  Icon,
  Image,
  LoadingDots,
  Text,
} from "../../components";
import {
  useGetApplicationMutation,
  useGetFeedbacksMutation,
} from "../../service";
import EmptyStateImage from "../../assets/images/empty-state.svg";
import { FeedbackOnboardingModal } from "./FeedbackOnboardingModal";

const FeedbackList: React.FC<{}> = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [getApplication, { data, isLoading }] = useGetApplicationMutation();
  const [getFeedbacks, feedbacksRequest] = useGetFeedbacksMutation();
  const { applicationId } = useParams<{
    applicationId: string;
  }>();

  useEffect(() => {
    if (applicationId) {
      getApplication({ id: parseInt(applicationId, 10) });
      getFeedbacks(parseInt(applicationId, 10));
    }
  }, [applicationId, getApplication, getFeedbacks]);

  useEffect(() => {
    if (applicationId) {
      getApplication({ id: parseInt(applicationId, 10) });
    }
  }, [applicationId, getApplication]);

  return (
    <Container width="100%" height="100%" mb="100px" flexDirection="column">
      {isLoading || feedbacksRequest.isLoading ? (
        <LoadingDots />
      ) : (
        <>
          <Container mb="24px" flexDirection="row" p="16px 0" mt="-16px">
            <Container onClick={() => navigate(-1)}>
              <Icon name="arrow-left" size={24} />
            </Container>
          </Container>
          {feedbacksRequest?.data?.length === 0 ? (
            <Container
              flex={1}
              alignItems="center"
              mt="calc(50% - 50px)"
              flexDirection="column"
              justifyContent="center"
            >
              <Image mb="32px" src={EmptyStateImage} width="220px" />
              <Text
                color="#000"
                fontSize="16px"
                fontWeight={600}
                lineHeight="24px"
                value={t("FeedbackList.empty-text")}
              />
            </Container>
          ) : (
            <>
              <Text
                mb="16px"
                fontWeight={600}
                fontSize="24px"
                color="#191A1B"
                lineHeight="32px"
                value={t("FeedbackList.title")}
              />
              {feedbacksRequest?.data?.map((feedback, index) => (
                <Container
                  key={index}
                  width="100%"
                  height="88px"
                  alignItems="center"
                  flexDirection="row"
                  justifyContent="center"
                  borderTop={index !== 0 ? "1px solid #F0F3F5" : ""}
                  onClick={() => navigate(`/feedback-details/${feedback.id}`)}
                >
                  <Icon size={24} name="comments" mr="12px" color="#C7CAD1" />

                  <Container
                    flex={1}
                    flexDirection="column"
                    justifyContent="center"
                  >
                    <Text
                      fontSize={14}
                      fontWeight={400}
                      lineHeight="24px"
                      value={feedback?.competence?.subtitle}
                    />
                    <Text
                      fontSize={12}
                      color="#494B50"
                      lineHeight="18px"
                      value={feedback?.competence?.title}
                    />
                  </Container>
                  <Icon size={24} name="chevron-right" color="#C7CAD1" />
                </Container>
              ))}
            </>
          )}
          {data?.status !== "DONE" && (
            <Container
              left="0"
              right="0"
              bottom="0"
              p="24px 16px"
              position="absolute"
            >
              <Button
                mt={3}
                width="100%"
                value={t("FeedbackList.new")}
                onClick={() =>
                  navigate(
                    `/questionnaire-feedback/${applicationId}/${data?.feedback_questionnaire_id}`
                  )
                }
              />
            </Container>
          )}
        </>
      )}
      <FeedbackOnboardingModal />
    </Container>
  );
};

export default FeedbackList;
