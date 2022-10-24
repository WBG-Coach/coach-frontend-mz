import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useCreateSchoolsMutation } from "../../service";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { School } from "../../store/type";
import { Button, Container, Icon, Image, Text } from "../../components";
import { Input } from "../../components/Input";
import { uploadFileToS3 } from "../../util";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/auth";
import { Select } from "../../components/Select";

const SchoolForm: React.FC<{}> = () => {
  const [createSchool, { isSuccess }] = useCreateSchoolsMutation();
  const [imageUrl, setImageUrl] = useState<string>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const user = useSelector(selectCurrentUser);

  const validation = Yup.object().shape({
    name: Yup.string().required(t("Validations.required")),
  });

  useEffect(() => {
    if (isSuccess) navigate(-1);
  }, [isSuccess, navigate]);

  const addImage = async (file?: File | null) => {
    try {
      if (file) {
        const fileUrl = await uploadFileToS3(file);

        setImageUrl(fileUrl.url);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const submitForm = (newSchool: School) => {
    createSchool({
      ...newSchool,
      image_url: imageUrl,
      project_id: user.project?.id || 0,
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
          address: "",
          city: "",
          country: "",
          image_url: "",
        }}
        validationSchema={validation}
        onSubmit={submitForm}
      >
        {({ handleSubmit, setFieldValue, values, errors }) => (
          <Container
            height="calc(100vh - 80px)"
            width="100%"
            flexDirection="column"
            alignItems="center"
          >
            <Container mb="40px" flexDirection="column" alignItems="center">
              <Container
                width="120px"
                height="120px"
                overflow="hidden"
                borderRadius="60px"
                alignItems="center"
                background="#E3E5E8"
                justifyContent="center"
              >
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    width="120px"
                    height="120px"
                    borderRadius="60px"
                  />
                ) : (
                  <Icon name="university" size={60} />
                )}
              </Container>
              <Container mt="16px">
                <label htmlFor="file" style={{ cursor: "pointer" }}>
                  <Text
                    fontSize="14px"
                    color="primary"
                    value={t("SchoolForm.change-photo")}
                  />
                </label>
              </Container>

              <input
                id="file"
                type="file"
                style={{ display: "none" }}
                onChange={(e) => {
                  addImage(e.target.files?.item(0));
                }}
              />
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
              <Text
                mb="4px"
                fontSize="14px"
                lineHeight="18px"
                fontWeight={600}
                value={t("SchoolForm.address")}
              />
              <Input
                mb="16px"
                onChangeText={(text) => setFieldValue("address", text)}
              />
              <Text
                mb="4px"
                fontSize="14px"
                lineHeight="18px"
                fontWeight={600}
                value={t("SchoolForm.city")}
              />
              <Input
                mb="16px"
                onChangeText={(text) => setFieldValue("city", text)}
              />
              <Text
                mb="4px"
                fontSize="14px"
                lineHeight="18px"
                fontWeight={600}
                value={t("SchoolForm.country")}
              />
              <Select
                mb="16px"
                data={[{ value: "Moçambique" }]}
                value={values.country || ""}
                modalTitle={t("SchoolForm.country")}
                onSelectItem={(text) => setFieldValue("country", text.value)}
              />
            </Container>
            <Button
              mt="auto"
              width="100%"
              onClick={handleSubmit}
              value={t("SchoolForm.save")}
            />
          </Container>
        )}
      </Formik>
    </Container>
  );
};

export default SchoolForm;
