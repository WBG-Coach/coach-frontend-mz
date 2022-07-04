import React, { useEffect } from "react";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { Button, Container, Image, Text } from "../../components";
import { useLoginMutation } from "../../service";
import Logo from "../../assets/images/logo.svg";
import * as Yup from "yup";
import { Input } from "../../components/Input";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { selectLoginErrorMessage } from "../../store/auth";
import { LanguageButton } from "../../components/LanguageButton";

const Login: React.FC = () => {
  const [login, { isSuccess }] = useLoginMutation();
  const loginErrorMessage = useSelector(selectLoginErrorMessage);
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) navigate("/select-school");
  }, [isSuccess, navigate]);

  const signInSchema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().required(),
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

      <Container flexDirection="column" width="100%">
        <Image src={Logo} mb="48px" height={"80px"} />
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
                errorMessage={(!!submitCount && errors.password) || ""}
                onChangeText={(text) => setFieldValue("password", text)}
              />

              <Button
                mt="40px"
                value={t("Login.enter")}
                onClick={handleSubmit}
              />
            </Container>
          )}
        </Formik>
      </Container>
      <Container>
        <Text>
          {t("Login.dont-you-have-account")}{" "}
          <Container ml="2px" onClick={() => navigate("/sign-up")}>
            <Text color="primary">{t("Login.register")}</Text>
          </Container>
        </Text>
      </Container>
    </Container>
  );
};

export default Login;
