import React, { useEffect } from "react";
import { Button, Container, Image, Text } from "../../components";
import { LanguageButton } from "../../components/LanguageButton";
import { selectLoginErrorMessage } from "../../store/auth";
import { useLoginMutation } from "../../service";
import { useNavigate } from "react-router-dom";
import { Input } from "../../components/Input";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import { PROJECT } from "../../mock";

const Login: React.FC = () => {
  const [login, { isLoading, isSuccess, error }] = useLoginMutation();
  const loginErrorMessage = useSelector(selectLoginErrorMessage);
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) navigate("/select-school");
  }, [isSuccess, navigate]);

  const signInSchema = Yup.object().shape({
    email: Yup.string().email().required(t("Validations.required")),
    password: Yup.string().required(t("Validations.required")),
  });

  const handlerLogin = (values: { email: string; password: string }) => {
    login(values);
  };

  return (
    <Container
      m="auto"
      width="100%"
      alignItems="center"
      flexDirection="column"
      height="calc(100vh - 32px)"
      justifyContent="space-between"
    >
      <Container width="100%" flexDirection="row" justifyContent="flex-end">
        <LanguageButton />
      </Container>

      <Container flexDirection="column" alignItems="center" width="100%">
        <Image src={PROJECT.image} mx="auto" mb="48px" width={"220px"} />

        {error && (
          <Text color="#e53935" value={(error as any)?.data?.message} />
        )}

        {loginErrorMessage && (
          <Text
            mb="16px"
            color="#e53935"
            fontSize="14px"
            value={t(`Login.${loginErrorMessage}`)}
          />
        )}
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={signInSchema}
          onSubmit={handlerLogin}
        >
          {({ handleSubmit, setFieldValue, errors, submitCount }) => (
            <Container width="100%" flexDirection="column">
              <Text
                mb="4px"
                fontSize="14px"
                lineHeight="18px"
                fontWeight={600}
                value={t("Login.email")}
              />

              <Input
                mb="16px"
                handlePressEnter={handleSubmit}
                errorMessage={(!!submitCount && errors.email) || ""}
                onChangeText={(text) => setFieldValue("email", text)}
              />

              <Text
                mb="4px"
                fontSize="14px"
                lineHeight="18px"
                fontWeight={600}
                value={t("Login.password")}
              />

              <Input
                type="password"
                handlePressEnter={handleSubmit}
                errorMessage={(!!submitCount && errors.password) || ""}
                onChangeText={(text) => setFieldValue("password", text)}
              />

              <Button
                mt="40px"
                isDisabled={isLoading}
                value={isLoading ? "Loading..." : t("Login.enter")}
                onClick={handleSubmit}
              />
            </Container>
          )}
        </Formik>
        <Text mt="24px">
          {t("Login.dont-you-have-account")}
          <Container ml="2px" onClick={() => navigate("/sign-up")}>
            <Text color="primary">{t("Login.register")}</Text>
          </Container>
        </Text>
      </Container>

      <Container ml="2px" onClick={() => navigate(-1)}>
        <Text color="primary">{t("Login.choose-another-project")}</Text>
      </Container>
    </Container>
  );
};

export default Login;
