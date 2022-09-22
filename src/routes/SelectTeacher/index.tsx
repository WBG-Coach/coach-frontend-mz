import React, { useEffect } from "react";
import { selectCurrentUser } from "../../store/auth";
import { LoadingDots } from "../../components/LoadingDots";
import { useSelector } from "react-redux";
import { useGetTeachersMutation } from "../../service";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Text, Icon, ListItem, AddButton, Container } from "../../components";

const SelectTeacher: React.FC<{}> = () => {
  const [getTeachers, { data, isLoading }] = useGetTeachersMutation();
  const user = useSelector(selectCurrentUser);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    if (user.id && user.selectedSchool?.id) {
      getTeachers(user.selectedSchool?.id);
    }
  }, [user, getTeachers]);

  return (
    <Container width="100%" height="calc(100vh - 32px)" flexDirection="column">
      <Container mb="16px" flexDirection="row" p="16px 0" mt="-16px">
        <Container flex={1} justifyContent="center">
          <Container width="24px" />
          <Text
            fontSize="16px"
            color="#191A1B"
            fontWeight={600}
            lineHeight="24px"
            value={t("ApplicationForm.title")}
          />
        </Container>
        <Container onClick={() => navigate(-1)}>
          <Icon name="close" size={24} />
        </Container>
      </Container>

      <Container flexDirection="column">
        <Text
          mb="8px"
          fontSize="24px"
          fontWeight="600"
          lineHeight="28px"
          value={t("ApplicationForm.choose-teacher")}
        />
        {isLoading && <LoadingDots />}

        {data?.users && data.users.length > 0 ? (
          data.users.map((teacher, index) => (
            <ListItem
              key={index}
              title={teacher.user.name || ""}
              imageUrl={teacher?.user.image_url || ""}
              onClick={() => navigate(`/questionnaire/${teacher.user.id}`)}
              description={t("Teachers.teacher_description", {
                subject: teacher.user.subject,
              })}
              leftContent={
                !teacher?.user.image_url && (
                  <Container
                    mb="8px"
                    width="48px"
                    height="48px"
                    alignItems="center"
                    borderRadius="24px"
                    background="#F0F2F5"
                    justifyContent="center"
                  >
                    <Text
                      fontSize={16}
                      value={teacher?.user?.name
                        ?.substring(0, 1)
                        .concat(
                          teacher?.user?.last_name?.substring(0, 1) || ""
                        )}
                    />
                  </Container>
                )
              }
            />
          ))
        ) : (
          <Text value={t("Teachers.empty")} />
        )}

        <AddButton
          label={t("Teachers.add-teacher")}
          onClick={() => navigate("/teacher-form")}
        />
      </Container>
    </Container>
  );
};

export default SelectTeacher;
