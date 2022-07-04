import React, { useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useCreateSchoolsMutation } from "../../service";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { School } from "../../store/type";
import { Button, Container, Icon, Image, Text } from "../../components";
import { Input } from "../../components/Input";

const SchoolForm: React.FC<{}> = () => {
  const [createSchool, { isSuccess }] = useCreateSchoolsMutation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const validation = Yup.object().shape({
    name: Yup.string().required("Required"),
  });

  useEffect(() => {
    if (isSuccess) navigate(-1);
  }, [isSuccess, navigate]);

  const submitForm = (newSchool: School) => {
    createSchool(newSchool);
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
            value={t("SchoolForm.title")}
          />
        </Container>
        <Container onClick={() => navigate(-1)}>
          <Icon name="close" size={24} />
        </Container>
      </Container>
      <Formik
        initialValues={{
          name: "",
          image_url: "",
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
            <Container height={180}>
              <Container
                overflow="hidden"
                width="120px"
                height="120px"
                borderRadius="60px"
                background="#E3E5E8"
              >
                <Image
                  src=""
                  width="120px"
                  height="120px"
                  borderRadius="60px"
                />
              </Container>
            </Container>
            <Container width="100%" flexDirection="column">
              <Text
                mb="4px"
                fontSize="14px"
                lineHeight="18px"
                fontWeight={600}
                value={t("SchoolForm.name")}
              />
              <Input
                mb="16px"
                errorMessage={errors.name}
                onChangeText={(text) => setFieldValue("name", text)}
              />
            </Container>
            <Button
              mt="auto"
              value={t("SchoolForm.save")}
              onClick={handleSubmit}
            />
          </Container>
        )}
      </Formik>
    </Container>
  );
};

export default SchoolForm;
