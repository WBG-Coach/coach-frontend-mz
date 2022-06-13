import React, { useEffect } from "react";
import { Container, Footer, Icon, Image, Text } from "../../components";
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
          fontSize={14}
          fontWeight={400}
          color="#2B363B"
          lineHeight="20px"
          value={t("Teachers.description")}
        />

        {isLoading ? (
          <LoadingDots />
        ) : (
          <Container flexWrap="wrap" my="16px">
            {data && data.length > 0 ? (
              data.map((teacher, index) => (
                <Container
                  key={index}
                  width="100%"
                  height="88px"
                  flexDirection="row"
                  alignItems="center"
                  justifyContent="center"
                  borderTop={index !== 0 ? "1px solid #F0F3F5" : ""}
                  onClick={() => navigate(`/applications/${teacher.id}`)}
                >
                  <Container flexDirection="column" justifyContent="center">
                    <Image
                      mr="12px"
                      width={56}
                      height={56}
                      borderRadius="50%"
                      src={teacher?.image_url || ""}
                    />
                  </Container>
                  <Container
                    flex={1}
                    flexDirection="column"
                    justifyContent="center"
                  >
                    <Text
                      fontSize={16}
                      fontWeight={600}
                      color="#00121A"
                      lineHeight="24px"
                      value={teacher.name}
                    />
                    <Text lineHeight="16px" color="#455054" fontSize={12}>
                      {t("Teachers.teacher_description", {
                        subject: teacher.subject,
                      })}
                    </Text>
                  </Container>
                  <Icon size={24} name="chevron-right" />
                </Container>
              ))
            ) : (
              <Text value={t("Teachers.empty")} />
            )}
          </Container>
        )}
      </Container>
      <Footer />
    </>
  );
};

export default TeachersList;
