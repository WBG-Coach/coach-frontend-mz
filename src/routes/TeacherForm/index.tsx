import React, { useEffect, useState } from "react";
import {
  Text,
  Icon,
  Image,
  Button,
  Container,
  LoadingDots,
} from "../../components";
import {
  useCreateTeacherMutation,
  useGetTeacherByIdMutation,
  useUpdateUserMutation,
} from "../../service";
import { selectCurrentUser } from "../../store/auth";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { Input } from "../../components/Input";
import { uploadFileToS3 } from "../../util";
import { useSelector } from "react-redux";
import { User } from "../../store/type";
import { Formik } from "formik";
import * as Yup from "yup";

const TeacherForm: React.FC<{}> = () => {
  const { teacherId } = useParams<{ teacherId: string }>();
  const [createTeacher, { isSuccess, isLoading }] = useCreateTeacherMutation();
  const [updateTeacher, updateTeacherRequest] = useUpdateUserMutation();
  const [getTeacherById, teacherRequest] = useGetTeacherByIdMutation();
  const [imageUrl, setImageUrl] = useState<string>();
  const user = useSelector(selectCurrentUser);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const validation = Yup.object().shape({
    name: Yup.string().required(t("Validations.required")),
    last_name: Yup.string().required(t("Validations.required")),
    subject: Yup.string().required(t("Validations.required")),
  });

  useEffect(() => {
    if (teacherId) {
      getTeacherById(parseInt(teacherId, 10));
    }
  }, [getTeacherById, teacherId]);

  useEffect(() => {
    if (isSuccess || updateTeacherRequest.isSuccess) navigate(-1);
  }, [isSuccess, navigate, updateTeacherRequest.isSuccess]);

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
    if (teacherId) {
      updateTeacher({
        ...teacher,
        image_url: imageUrl,
        id: parseInt(teacherId, 10),
      });
    } else {
      createTeacher({
        ...teacher,
        image_url: imageUrl,
        school_id: user?.selectedSchool?.id || 0,
        project_id: user.project?.id || 0,
      });
    }
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
            value={
              teacherId ? t("TeacherForm.title-update") : t("TeacherForm.title")
            }
          />
        </Container>
        <Container onClick={() => navigate(-1)}>
          <Icon name="close" size={24} />
        </Container>
      </Container>

      {(teacherId && teacherRequest.isLoading) ||
      updateTeacherRequest.isLoading ||
      isLoading ? (
        <LoadingDots />
      ) : (
        <Formik
          initialValues={
            teacherId
              ? {
                  name: teacherRequest.data?.name || "",
                  last_name: teacherRequest.data?.last_name || "",
                  subject: teacherRequest.data?.subject || "",
                }
              : {
                  name: "",
                  last_name: "",
                  subject: "",
                }
          }
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
                  {teacherRequest.data?.image_url || imageUrl ? (
                    <Image
                      width="120px"
                      height="120px"
                      borderRadius="60px"
                      src={teacherRequest.data?.image_url || imageUrl || ""}
                    />
                  ) : (
                    <Icon name="user" size={60} />
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
                  value={values.name}
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
                  value={values.last_name}
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
                  value={values.subject}
                  errorMessage={errors.subject}
                  onChangeText={(text) => setFieldValue("subject", text)}
                />
              </Container>
              <Button
                mt="auto"
                width="100%"
                onClick={handleSubmit}
                value={
                  teacherId
                    ? t("TeacherForm.save-update")
                    : t("TeacherForm.save")
                }
              />
            </Container>
          )}
        </Formik>
      )}
    </Container>
  );
};

export default TeacherForm;
