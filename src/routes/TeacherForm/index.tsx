import React, { useEffect, useState } from "react";
import {
  Text,
  Icon,
  Image,
  Button,
  Container,
  LoadingDots,
} from "../../components";
import { useCreateTeacherMutation } from "../../service";
import { selectCurrentUser } from "../../store/auth";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Input } from "../../components/Input";
import { uploadFileToS3 } from "../../util";
import { useSelector } from "react-redux";
import { User } from "../../store/type";
import { Formik } from "formik";
import * as Yup from "yup";

const TeacherForm: React.FC<{}> = () => {
  const [createTeacher, { isSuccess, isLoading }] = useCreateTeacherMutation();
  const [imageUrl, setImageUrl] = useState<string>();
  const user = useSelector(selectCurrentUser);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const validation = Yup.object().shape({
    name: Yup.string().required(),
    last_name: Yup.string().required(),
    subject: Yup.string().required(),
  });

  useEffect(() => {
    if (isSuccess) navigate(-1);
  }, [isSuccess, navigate]);

  const addImage = async (file?: File | null) => {
    try {
      if (file) {
        const uploadedFile = await uploadFileToS3(file);
        setImageUrl(uploadedFile.url);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const submitForm = (teacher: User) => {
    if (user?.selectedSchool?.id)
      createTeacher({
        ...teacher,
        image_url: imageUrl,
        school_id: user?.selectedSchool?.id,
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
            value={t("TeacherForm.title")}
          />
        </Container>
        <Container onClick={() => navigate(-1)}>
          <Icon name="close" size={24} />
        </Container>
      </Container>

      {isLoading ? (
        <LoadingDots />
      ) : (
        <Formik
          initialValues={{
            name: "",
            image_url: "",
            last_name: "",
            subject: "",
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
                      value={t("TeacherForm.change-photo")}
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
                  value={t("TeacherForm.name")}
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
                  value={t("TeacherForm.last_name")}
                />
                <Input
                  mb="16px"
                  errorMessage={errors.last_name}
                  onChangeText={(text) => setFieldValue("last_name", text)}
                />

                <Text
                  mb="4px"
                  fontSize="14px"
                  lineHeight="18px"
                  fontWeight={600}
                  value={t("TeacherForm.subject")}
                />
                <Input
                  mb="16px"
                  errorMessage={errors.subject}
                  onChangeText={(text) => setFieldValue("subject", text)}
                />
              </Container>
              <Button
                mt="auto"
                width="100%"
                onClick={handleSubmit}
                value={t("TeacherForm.save")}
              />
            </Container>
          )}
        </Formik>
      )}
    </Container>
  );
};

export default TeacherForm;