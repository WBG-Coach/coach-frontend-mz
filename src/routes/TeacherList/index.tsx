import React, { useEffect } from "react";
import {
  AddButton,
  Container,
  Footer,
  Icon,
  Image,
  ListItem,
  Text,
} from "../../components";
import { LoadingDots } from "../../components/LoadingDots";
import {
  useGetLastApplicationsMutation,
  useGetTeachersMutation,
} from "../../service";
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
  const [getLastApplications, lastApplicationsRequest] =
    useGetLastApplicationsMutation();

  useEffect(() => {
    if (user.id && user.selectedSchool?.id) {
      getTeachers(user.selectedSchool?.id);
      getLastApplications({
        coach_id: user.id,
        school_id: user.selectedSchool?.id,
      });
    }
  }, [user, getTeachers, getLastApplications]);

  return (
    <>
      <Header />
      <Container width="100%" height="100%" mb="100px" flexDirection="column">
        <Text
          mb="16px"
          mt="32px"
          fontSize={20}
          lineHeight="24px"
          fontWeight={600}
          color="#00121A"
          value={t("Teachers.previous-sessions")}
        />

        <Container flexDirection="row">
          {lastApplicationsRequest?.data?.data &&
            lastApplicationsRequest.data.data.length > 0 &&
            lastApplicationsRequest.data.data.map((application, index) => (
              <Container
                key={index}
                p="12px"
                mr="16px"
                width="120px"
                height="120px"
                borderRadius="12px"
                flexDirection="column"
                border="1px solid #E3E5E8"
                justifyContent="space-between"
                onClick={() =>
                  navigate(
                    `/application-details/${application.id}/${application.questionnaire_id}`
                  )
                }
              >
                {application.teacher.image_url ? (
                  <Image
                    src={application.teacher.image_url || ""}
                    width="24px"
                    height="24px"
                    borderRadius="12px"
                  />
                ) : (
                  <Container
                    width="28px"
                    height="28px"
                    alignItems="center"
                    borderRadius="24px"
                    background="#F0F2F5"
                    justifyContent="center"
                  >
                    <Text
                      fontSize={12}
                      value={application.teacher?.name
                        ?.substring(0, 1)
                        .concat(
                          application.teacher?.last_name?.substring(0, 1) || ""
                        )}
                    />
                  </Container>
                )}
                <Container flexDirection="column">
                  <Text
                    color="#494B50"
                    fontSize="12px"
                    lineHeight="16px"
                    value={application.teacher.name?.split(" ")[0]}
                  />
                  <Text
                    fontSize="16px"
                    fontWeight={600}
                    lineHeight="24px"
                    value={t("TeacherDetails.item-description", {
                      value: application.id,
                    })}
                  />
                </Container>
              </Container>
            ))}
        </Container>

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
            {data?.users && data.users.length > 0 ? (
              data.users.map((teacher, index) => (
                <ListItem
                  key={index}
                  title={teacher.user.name || ""}
                  imageUrl={teacher?.user.image_url || ""}
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
                  onClick={() => navigate(`/teacher/${teacher.user.id}`)}
                  description={t("Teachers.teacher_description", {
                    subject: teacher.user.subject,
                  })}
                  children={
                    teacher.user.answers && (
                      <Container mt="8px" flexDirection="row">
                        <Container
                          mr="8px"
                          px="8px"
                          height="24px"
                          alignItems="center"
                          borderRadius="24px"
                          justifyContent="center"
                          background="#33CC5A"
                        >
                          <Icon size={16} color="#fff" name="thumbs-up" />
                          <Text
                            ml="4px"
                            value={teacher.user.answers
                              .filter(
                                (answer) =>
                                  answer.option?.selected_icon === "thumbs-up"
                              )
                              .length.toString()}
                            fontSize="12px"
                            color="#ffffff"
                          />
                        </Container>

                        <Container
                          mr="8px"
                          px="8px"
                          height="24px"
                          alignItems="center"
                          borderRadius="24px"
                          justifyContent="center"
                          background="#FF3333"
                        >
                          <Icon size={16} color="#fff" name="thumbs-down" />
                          <Text
                            ml="4px"
                            value={teacher.user.answers
                              .filter(
                                (answer) =>
                                  answer.option?.selected_icon === "thumbs-down"
                              )
                              .length.toString()}
                            fontSize="12px"
                            color="#ffffff"
                          />
                        </Container>
                      </Container>
                    )
                  }
                />
              ))
            ) : (
              <Text value={t("Teachers.empty")} />
            )}
          </Container>
        )}

        <AddButton
          label={t("Teachers.add-teacher")}
          onClick={() => navigate("/teacher-form")}
        />
      </Container>
      <Footer />
    </>
  );
};

export default TeachersList;
