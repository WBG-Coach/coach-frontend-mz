import React, { useEffect } from "react";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { Button, Container, Icon, Text } from "../../components";
import { useCreateCoachMutation } from "../../service";
import * as Yup from "yup";
import { Input } from "../../components/Input";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { selectLoginErrorMessage } from "../../store/auth";
import { User } from "../../store/type";

const SignUp: React.FC = () => {
  const [signUp, { isSuccess }] = useCreateCoachMutation();
  const loginErrorMessage = useSelector(selectLoginErrorMessage);
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) navigate("/");
  }, [isSuccess, navigate]);

  const signInSchema = Yup.object().shape({
    name: Yup.string().required(),
    lastname: Yup.string().required(),
    email: Yup.string().email().required(),
    password: Yup.string().required(),
  });

  const handlerLogin = (values: User) => {
    signUp(values);
  };

  return (
    <Container
      m="auto"
      width="100%"
      maxWidth="350px"
      alignItems="center"
      flexDirection="column"
    >
      <Container
        mb="32px"
        alignItems="center"
        width="100%"
        justifyContent="space-between"
      >
        <Container onClick={() => navigate(-1)}>
          <Icon name="arrow-left" size={24} />
        </Container>
        <Text fontWeight={600} value={t("SignUp.title")} />
        <Container width="24px"></Container>
      </Container>

      <Text
        value={t("SignUp.description")}
        fontSize="24px"
        lineHeight="32px"
        fontWeight="600"
        mb="32px"
      />

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
          lastname: "",
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
              value={t("SignUp.lastname")}
            />
            <Input
              mb="16px"
              errorMessage={(!!submitCount && errors.lastname) || ""}
              onChangeText={(text) => setFieldValue("lastname", text)}
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
