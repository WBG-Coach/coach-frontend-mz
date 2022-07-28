import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { Button, Container, Icon, Image, Text } from "../../components";
import { useUpdateUserMutation } from "../../service";
import * as Yup from "yup";
import { Input } from "../../components/Input";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { loadLocalUser, selectCurrentUser } from "../../store/auth";
import { User } from "../../store/type";
import { setLocalUser } from "../../storage";
import { uploadFileToS3 } from "../../util";

const ProfileForm: React.FC = () => {
  const [updateUser, { isSuccess, error }] = useUpdateUserMutation();
  const user = useSelector(selectCurrentUser);
  const [imageUrl, setImageUrl] = useState(user?.image_url);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess) navigate("/profile");
  }, [isSuccess, navigate]);

  const signInSchema = Yup.object().shape({
    name: Yup.string().required(t("Validations.required")),
    last_name: Yup.string().required(t("Validations.required")),
    email: Yup.string().email().required(t("Validations.required")),
  });

  const handlerUpdateUser = (values: User) => {
    updateUser({
      id: user.id,
      ...(imageUrl && { image_url: imageUrl }),
      ...(values.name !== user.name && { name: user.name }),
      ...(values.email !== user.email && { email: user.email }),
      ...(values.last_name !== user.last_name && { last_name: user.last_name }),
    }).then(() => {
      setLocalUser({ ...user, ...values, image_url: imageUrl });
      dispatch(loadLocalUser({ ...user, ...values, image_url: imageUrl }));
    });
  };

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

  return (
    <Container m="auto" width="100%" alignItems="center" flexDirection="column">
      <Container
        mb="32px"
        width="100%"
        alignItems="center"
        justifyContent="space-between"
      >
        <Container onClick={() => navigate(-1)}>
          <Icon name="arrow-left" size={24} />
        </Container>

        <Text
          fontSize="16px"
          fontWeight="600"
          lineHeight="24px"
          value={t("UpdateProfile.title")}
        />

        <Container width="24px"></Container>
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
          name: user.name,
          email: user.email,
          last_name: user.last_name,
        }}
        validationSchema={signInSchema}
        onSubmit={handlerUpdateUser}
      >
        {({ handleSubmit, setFieldValue, values, errors, submitCount }) => (
          <Container
            width="100%"
            height="calc(100vh - 160px)"
            flexDirection="column"
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
                    value={t("UpdateProfile.change-photo")}
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

            <Text
              mb="4px"
              fontSize="14px"
              lineHeight="18px"
              fontWeight={600}
              value={t("UpdateProfile.name")}
            />
            <Input
              mb="16px"
              value={values.name}
              errorMessage={(!!submitCount && errors.name) || ""}
              onChangeText={(text) => setFieldValue("name", text)}
            />

            <Text
              mb="4px"
              fontSize="14px"
              lineHeight="18px"
              fontWeight={600}
              value={t("UpdateProfile.last_name")}
            />
            <Input
              mb="16px"
              value={values.last_name}
              errorMessage={(!!submitCount && errors.last_name) || ""}
              onChangeText={(text) => setFieldValue("last_name", text)}
            />

            <Text
              mb="4px"
              fontSize="14px"
              lineHeight="18px"
              fontWeight={600}
              value={t("UpdateProfile.email")}
            />
            <Input
              mb="16px"
              type="email"
              value={values.email}
              errorMessage={(!!submitCount && errors.email) || ""}
              onChangeText={(text) => setFieldValue("email", text)}
            />

            <Button
              mt="auto"
              width="100%"
              onClick={handleSubmit}
              value={t("UpdateProfile.save")}
            />
          </Container>
        )}
      </Formik>
    </Container>
  );
};

export default ProfileForm;
