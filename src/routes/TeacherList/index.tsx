import React, { useEffect } from "react";
import { AddButton, Container, Footer, ListItem, Text } from "../../components";
import { LoadingDots } from "../../components/LoadingDots";
import { useGetTeachersMutation } from "../../service";
import { selectCurrentUser } from "../../store/auth";
import { Header } from "../../components/Header";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const TeachersList: React.FC<{}> = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);
  const [getTeachers, { data, isLoading }] = useGetTeachersMutation();

  useEffect(() => {
    if (user.id && user.selectedSchool?.id)
      getTeachers({ coach_id: user.id, school_id: user.selectedSchool?.id });
  }, [user, getTeachers]);

  return (
    <>
      <Header />
      <Container width="100%" height="100%" mb="100px" flexDirection="column">
        <Text
          mb="4px"
          mt="32px"
          fontSize={20}
          lineHeight="24px"
          fontWeight={600}
          color="#00121A"
          value={t("Teachers.title")}
        />
        <Text
          mb="24px"
          fontSize={14}
          fontWeight={400}
          color="#2B363B"
          lineHeight="20px"
          value={t("Teachers.description")}
        />

        {isLoading ? (
          <LoadingDots />
        ) : (
          <Container flexDirection="column">
            {data && data.length > 0 ? (
              data.map((teacher, index) => (
                <ListItem
                  key={index}
                  title={teacher.name || ""}
                  imageUrl={teacher?.image_url || ""}
                  onClick={() => navigate(`/teacher/${teacher.id}`)}
                  description={t("Teachers.teacher_description", {
                    subject: teacher.subject,
                  })}
                />
              ))
            ) : (
              <Text value={t("Teachers.empty")} />
            )}
          </Container>
        )}
        <AddButton label={t("Teachers.add-teacher")} onClick={() => {}} />
      </Container>
      <Footer />
    </>
  );
};

export default TeachersList;
