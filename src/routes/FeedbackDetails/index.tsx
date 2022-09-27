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
  useGetAnswersMutation,
  useGetFeedbackMutation,
  useGetFeedbacksMutation,
  useUpdateApplicationMutation,
} from "../../service";
import { QuestionnaireHeader } from "../ObservationQuestionnaire/QuestionnaireHeader";
import { useDispatch } from "react-redux";
import { openGuide } from "../../store/guide";
import { format } from "date-fns";

const FeedbackDetails: React.FC<{}> = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [getAnswers, answersRequest] = useGetAnswersMutation();
  const [getFeedbacks, feedbacksRequest] = useGetFeedbacksMutation();
  const [getFeedback, { data, isLoading }] = useGetFeedbackMutation();
  const [updateApplication, deliveryRequest] = useUpdateApplicationMutation();
  const { applicationId } = useParams<{
    applicationId: string;
  }>();

  useEffect(() => {
    if (applicationId) {
      getFeedbacks(parseInt(applicationId, 10));
      getAnswers(parseInt(applicationId, 10));
    }
  }, [applicationId, getFeedbacks, getAnswers]);

  useEffect(() => {
    if (feedbacksRequest.data) {
      getFeedback(feedbacksRequest.data[0].id || 0);
    }
  }, [feedbacksRequest, getFeedback]);

  const deliveryFeedback = () => {
    if (applicationId)
      updateApplication({
        id: parseInt(applicationId, 10),
        status: "PENDING_DOCUMENTATION",
      }).then(() => {
        navigate(`/application-details/${applicationId}`);
      });
  };

  return isLoading || deliveryRequest.isLoading || !data ? (
    <LoadingDots />
  ) : (
    <Container flex={1} minHeight="calc(100vh - 32px);%" flexDirection="column">
      <QuestionnaireHeader
        title={""}
        onClose={() => navigate(`/application-details/${applicationId}`)}
      />

      <Text
        mt="8px"
        mb="24px"
        fontSize="24px"
        fontWeight={600}
        lineHeight="28px"
        value={"Feedback"}
      />

      <Container mb="16px" py="16px" flexDirection="row">
        <Container flex={1} flexDirection="row" alignItems="center">
          <Icon mr="8px" size={16} name="notes" color="#7D827F" />
          <Container flexDirection="column">
            <Text
              color="#49504C"
              fontSize={"14px"}
              lineHeight={"20px"}
              value={t("Questionnaire.session-name", {
                value: data?.questionnaire_application?.order,
              })}
            />
            <Text
              fontSize={"14px"}
              lineHeight={"20px"}
              value={format(
                new Date(
                  data?.questionnaire_application?.application_date || ""
                ),
                "yyyy/MM/dd"
              )}
            />
          </Container>
        </Container>
        <Container flex={1} flexDirection="row" alignItems="center">
          <Container mr="8px" alignItems="center">
            {data?.questionnaire_application?.teacher?.image_url ? (
              <Image
                mr="4px"
                width={20}
                height={20}
                borderRadius="50%"
                src={data?.questionnaire_application?.teacher.image_url}
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
                  value={data?.questionnaire_application?.teacher?.name
                    ?.substring(0, 1)
                    .concat(
                      data?.questionnaire_application?.teacher?.last_name?.substring(
                        0,
                        1
                      ) || ""
                    )}
                />
              </Container>
            )}
          </Container>
          <Container flexDirection="column">
            <Text
              color="#49504C"
              fontSize={"14px"}
              lineHeight={"20px"}
              value={t("Questionnaire.teacher")}
            />
            <Text
              fontSize={"14px"}
              lineHeight={"20px"}
              value={data?.questionnaire_application?.teacher.name}
            />
          </Container>
        </Container>
      </Container>

      <Container
        mb="40px"
        alignItems="flex-start"
        borderRadius="12px"
        flexDirection="column"
      >
        <Container py="16px" alignItems="center">
          <Icon name="notes" size={16} mr="8px" />
          <Container flexDirection="column">
            <Text
              fontSize="14px"
              color="#49504C"
              lineHeight="18px"
              value={t("Questionnaire.class-plan")}
            />

            {answersRequest?.data && (
              <Text mt="12px" value={answersRequest.data[0].option?.text} />
            )}
          </Container>
        </Container>

        <Container
          p="10px 16px"
          borderRadius="12px"
          background="#F4F5F5"
          onClick={() =>
            answersRequest?.data &&
            dispatch(openGuide(answersRequest.data[0].option?.content_guide_id))
          }
        >
          <Text value={t("Questionnaire.see-class-plan")} />
        </Container>
      </Container>

      <Container
        mb="40px"
        alignItems="flex-start"
        borderRadius="12px"
        flexDirection="column"
      >
        <Container py="16px" alignItems="center">
          <Icon name="puzzle-piece-solid" size={16} mr="8px" />
          <Container flexDirection="column">
            <Text
              fontSize="14px"
              color="#49504C"
              lineHeight="18px"
              value={t("Questionnaire.selected-competency")}
            />
            <Text mt="12px" value={data?.competence?.subtitle} />
          </Container>
        </Container>

        <Container
          p="10px 16px"
          borderRadius="12px"
          background="#F4F5F5"
          onClick={() =>
            answersRequest?.data &&
            dispatch(openGuide(answersRequest.data[0].option?.content_guide_id))
          }
        >
          <Text value={t("Questionnaire.see-competence")} />
        </Container>
      </Container>

      <Container my="12px" height="1px" background="#E3E5E8" width="100%" />

      {data?.feedback_answers.map((question, index) => (
        <Container key={index} mb="24px" flexDirection="column">
          <Text
            mb="8px"
            color="#494B50"
            fontSize="14px"
            lineHeight="18px"
            value={question?.questionnaire_question?.question.text}
          />
          <Text mb="20px" value={question.notes} />
        </Container>
      ))}

      <Button
        mt="auto"
        value={t("Questionnaire.delivery-feedback")}
        onClick={deliveryFeedback}
      />
    </Container>
  );
};

export default FeedbackDetails;
