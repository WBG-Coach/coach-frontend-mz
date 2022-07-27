import React, { useEffect } from "react";
import { Formik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Container, Icon, Image, Text } from "../../components";
import { useCreateCoachMutation } from "../../service";
import * as Yup from "yup";
import { Input } from "../../components/Input";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { selectLoginErrorMessage } from "../../store/auth";
import { User } from "../../store/type";
import { PROJECT } from "../../mock";

const SignUp: React.FC = () => {
  const [signUp, { isSuccess }] = useCreateCoachMutation();
  const loginErrorMessage = useSelector(selectLoginErrorMessage);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { projectId } = useParams<{
    projectId: string;
  }>();

  useEffect(() => {
    if (isSuccess) navigate("/");
  }, [isSuccess, navigate]);

  const signInSchema = Yup.object().shape({
    name: Yup.string().required(t("Validations.required")),
    last_name: Yup.string().required(t("Validations.required")),
    email: Yup.string().email().required(t("Validations.required")),
    password: Yup.string().required(t("Validations.required")),
  });

  const handlerLogin = (values: User) => {
    signUp({ ...values, project_id: parseInt(projectId || "", 10) });
  };

  return (
    <Container m="auto" width="100%" alignItems="center" flexDirection="column">
      <Container
        mb="32px"
        alignItems="center"
        width="100%"
        justifyContent="space-between"
      >
        <Container onClick={() => navigate(-1)}>
          <Icon name="arrow-left" size={24} />
        </Container>

        <Image src={PROJECT.image} height="24px" />

        <Container width="24px"></Container>
      </Container>

      <Container width="100%">
        <Text
          value={t("SignUp.description")}
          fontSize="24px"
          lineHeight="32px"
          fontWeight="600"
          mb="36px"
        />
      </Container>

      {loginErrorMessage && (
        <Text
          mb="16px"
          color="#e53935"
          fontSize="14px"
          value={t(`SignUp.${loginErrorMessage}`)}
        />
      )}
      <Formik
        initialValues={{
          name: "",
          email: "",
          last_name: "",
          password: "",
        }}
        validationSchema={signInSchema}
        onSubmit={handlerLogin}
      >
        {({ handleSubmit, setFieldValue, errors, submitCount }) => (
          <Container
            width="100%"
            height="calc(100vh - 160px)"
            flexDirection="column"
          >
            <Text
              mb="4px"
              fontSize="14px"
              lineHeight="18px"
              fontWeight={600}
              value={t("SignUp.name")}
            />
            <Input
              mb="16px"
              errorMessage={(!!submitCount && errors.name) || ""}
              onChangeText={(text) => setFieldValue("name", text)}
            />

            <Text
              mb="4px"
              fontSize="14px"
              lineHeight="18px"
              fontWeight={600}
              value={t("SignUp.last_name")}
            />
            <Input
              mb="16px"
              errorMessage={(!!submitCount && errors.last_name) || ""}
              onChangeText={(text) => setFieldValue("last_name", text)}
            />

            <Text
              mb="4px"
              fontSize="14px"
              lineHeight="18px"
              fontWeight={600}
              value={t("SignUp.email")}
            />
            <Input
              mb="16px"
              type="email"
              errorMessage={(!!submitCount && errors.email) || ""}
              onChangeText={(text) => setFieldValue("email", text)}
            />

            <Text
              mb="4px"
              fontSize="14px"
              lineHeight="18px"
              fontWeight={600}
              value={t("SignUp.password")}
            />
            <Input
              type="password"
              errorMessage={(!!submitCount && errors.password) || ""}
              onChangeText={(text) => setFieldValue("password", text)}
            />

            <Button
              mt="auto"
              width="100%"
              onClick={handleSubmit}
              value={t("SignUp.create-account")}
            />
          </Container>
        )}
      </Formik>
    </Container>
  );
};

export default SignUp;
