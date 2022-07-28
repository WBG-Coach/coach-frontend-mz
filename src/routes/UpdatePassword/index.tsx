import React, { useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useUpdatePasswordMutation } from "../../service";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Button, Container, Icon, Text } from "../../components";
import { Input } from "../../components/Input";

const UpdatePassword: React.FC<{}> = () => {
  const [updatePassword, { isSuccess, error }] = useUpdatePasswordMutation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const validation = Yup.object().shape({
    old_password: Yup.string().required(t("Validations.required")),
    new_password: Yup.string().min(8).required(t("Validations.required")),
    passwordConfirmation: Yup.string()
      .required(t("Validations.required"))
      .oneOf([Yup.ref("new_password"), null], "Passwords must match"),
  });

  useEffect(() => {
    if (isSuccess) navigate(-1);
  }, [isSuccess, navigate]);

  const submitForm = (values: any) => {
    updatePassword(values);
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
            value={t("UpdatePassword.title")}
          />
        </Container>
        <Container onClick={() => navigate(-1)}>
          <Icon name="close" size={24} />
        </Container>
      </Container>

      {error && (
        <Text
          mb="16px"
          color="#e53935"
          fontSize="14px"
          value={t(`UpdateProfile.${error}`)}
        />
      )}

      <Formik
        initialValues={{
          old_password: "",
          new_password: "",
          passwordConfirmation: "",
        }}
        validationSchema={validation}
        onSubmit={submitForm}
      >
        {({ handleSubmit, setFieldValue, errors }) => (
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
                value={t("UpdatePassword.old_password")}
              />
              <Input
                mb="16px"
                type="password"
                errorMessage={errors.old_password}
                onChangeText={(text) => setFieldValue("old_password", text)}
              />

              <Text
                mb="4px"
                fontSize="14px"
                lineHeight="18px"
                fontWeight={600}
                value={t("UpdatePassword.new_password")}
              />
              <Input
                mb="16px"
                type="password"
                errorMessage={errors.new_password}
                onChangeText={(text) => setFieldValue("new_password", text)}
              />

              <Text
                mb="4px"
                fontSize="14px"
                lineHeight="18px"
                fontWeight={600}
                value={t("UpdatePassword.passwordConfirmation")}
              />
              <Input
                mb="16px"
                type="password"
                errorMessage={errors.passwordConfirmation}
                onChangeText={(text) =>
                  setFieldValue("passwordConfirmation", text)
                }
              />
            </Container>
            <Button
              mt="auto"
              width="100%"
              onClick={handleSubmit}
              value={t("UpdatePassword.save")}
            />
          </Container>
        )}
      </Formik>
    </Container>
  );
};

export default UpdatePassword;
