import React, { useEffect } from "react";
import { Text, Icon, Button, Container, LoadingDots } from "../../components";
import {
  useCreateApplicationMutation,
  useGetQuestionnairesMutation,
} from "../../service";
import { selectCurrentUser } from "../../store/auth";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { Input } from "../../components/Input";
import { useSelector } from "react-redux";
import { Application, Questionnaire } from "../../store/type";
import { Formik } from "formik";
import * as Yup from "yup";
import DatePicker from "react-date-picker";
import { Select } from "../../components/Select";

const ApplicationForm: React.FC<{}> = () => {
  const [createApplication, { isSuccess, isLoading }] =
    useCreateApplicationMutation();
  const [getQuestionnaires, questionnairesRequest] =
    useGetQuestionnairesMutation();
  const user = useSelector(selectCurrentUser);
  const { teacherId } = useParams<{ teacherId: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const validation = Yup.object().shape({
    application_date: Yup.date().required(),
    questionnaire_id: Yup.number().required(),
    feedback_questionnaire_id: Yup.number().required(),
  });

  useEffect(() => {
    getQuestionnaires();
  }, [getQuestionnaires]);

  useEffect(() => {
    if (isSuccess) navigate(-1);
  }, [isSuccess, navigate]);

  const submitForm = (application: Partial<Application>) => {
    if (teacherId)
      createApplication({
        ...application,
        school_id: user.selectedSchool.id,
        coach_id: user.id,
        teacher_id: parseInt(teacherId, 10),
      });
  };

  return (
    <Container width="100%" height="100%" mb="100px" flexDirection="column">
      <Container mb="16px" flexDirection="row" p="16px 0" mt="-16px">
        <Container flex={1} justifyContent="center">
          <Container width="24px" />
          <Text
            fontSize="16px"
            color="#191A1B"
            fontWeight={600}
            lineHeight="24px"
            value={t("ApplicationForm.title")}
          />
        </Container>
        <Container onClick={() => navigate(-1)}>
          <Icon name="close" size={24} />
        </Container>
      </Container>

      {isLoading || questionnairesRequest.isLoading ? (
        <LoadingDots />
      ) : (
        <Formik
          initialValues={{
            application_date: new Date(),
            questionnaire_id: undefined,
            feedback_questionnaire_id: undefined,
          }}
          validationSchema={validation}
          onSubmit={submitForm}
        >
          {({ handleSubmit, setFieldValue, values, errors, submitCount }) => (
            <Container
              height="calc(100vh - 80px)"
              width="100%"
              flexDirection="column"
              alignItems="center"
            >
              <Container width="100%" flexDirection="column">
                <Text
                  mb="4px"
                  fontSize="14px"
                  lineHeight="18px"
                  fontWeight={600}
                  value={t("ApplicationForm.application-date")}
                />

                <DatePicker
                  onChange={(value: Date) =>
                    setFieldValue("application_date", value)
                  }
                  value={values.application_date}
                />
                {submitCount > 0 && errors.application_date && (
                  <Text
                    mt="4px"
                    value="Required"
                    fontSize="12px"
                    color="#e53935"
                  />
                )}

                <Text
                  mt="16px"
                  mb="4px"
                  fontSize="14px"
                  lineHeight="18px"
                  fontWeight={600}
                  value={t("ApplicationForm.observation-questionnaire")}
                />
                <Select
                  modalTitle="Select a questionnaire"
                  errorMessage={errors.questionnaire_id}
                  value={
                    questionnairesRequest.data?.find(
                      (item) => item.id === values.questionnaire_id
                    )?.title || t("ApplicationForm.select-questionnaire")
                  }
                  data={
                    questionnairesRequest.data?.filter(
                      (item) => item.type === "OBSERVATION"
                    ) || []
                  }
                  onSelectItem={(item: Questionnaire) =>
                    setFieldValue("questionnaire_id", item.id)
                  }
                />

                <Text
                  mt="16px"
                  mb="4px"
                  fontSize="14px"
                  lineHeight="18px"
                  fontWeight={600}
                  value={t("ApplicationForm.feedback-questionnaire")}
                />
                <Select
                  modalTitle="Select a questionnaire"
                  errorMessage={errors.feedback_questionnaire_id}
                  value={
                    questionnairesRequest.data?.find(
                      (item) => item.id === values.feedback_questionnaire_id
                    )?.title || t("ApplicationForm.select-questionnaire")
                  }
                  data={
                    questionnairesRequest.data?.filter(
                      (item) => item.type === "FEEDBACK"
                    ) || []
                  }
                  onSelectItem={(item: Questionnaire) =>
                    setFieldValue("feedback_questionnaire_id", item.id)
                  }
                />
              </Container>

              <Button
                mt="auto"
                width="100%"
                onClick={handleSubmit}
                value={t("ApplicationForm.save")}
              />
            </Container>
          )}
        </Formik>
      )}
    </Container>
  );
};

export default ApplicationForm;
