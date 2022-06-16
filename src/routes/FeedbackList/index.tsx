import React, { useEffect, useState } from "react";
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
import { useGetApplicationMutation } from "../../service";
import { getLocalFeedbacks } from "../../storage";
import EmptyStateImage from "../../assets/images/empty-state.svg";

const FeedbackList: React.FC<{}> = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [feedbacks, setFeedbacks] = useState<any[]>([]);
  const [getApplication, { data, isLoading }] = useGetApplicationMutation();
  const { applicationId } = useParams<{
    applicationId: string;
  }>();

  useEffect(() => {
    setFeedbacks(getLocalFeedbacks());
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
          {feedbacks.length === 0 ? (
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
              {feedbacks.map((feedback, index) => (
                <Container
                  key={index}
                  width="100%"
                  height="88px"
                  alignItems="center"
                  flexDirection="row"
                  justifyContent="center"
                  borderTop={index !== 0 ? "1px solid #F0F3F5" : ""}
                  onClick={() => navigate(`/feedback-details/${index}`)}
                >
                  <Icon size={24} name="notes" mr="12px" />

                  <Container
                    flex={1}
                    flexDirection="column"
                    justifyContent="center"
                  >
                    <Text
                      fontSize={16}
                      color="#00121A"
                      fontWeight={600}
                      lineHeight="24px"
                      value={feedback[0]}
                    />
                  </Container>
                  <Icon size={24} name="chevron-right" />
                </Container>
              ))}
            </>
          )}
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
                  `/questionnaire-feedback/${applicationId}/${data?.questionnaire_id}`
                )
              }
            />
          </Container>
        </>
      )}
    </Container>
  );
};

export default FeedbackList;
