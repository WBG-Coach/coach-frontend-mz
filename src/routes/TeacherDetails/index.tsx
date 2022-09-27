import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { TeacherInfo } from "./TeacherInfo";
import { useTranslation } from "react-i18next";
import { CompetenceList } from "./CompetenceList";
import { selectCurrentUser } from "../../store/auth";
import { ApplicationsList } from "./ApplicationsList";
import { useNavigate, useParams } from "react-router-dom";
import {
  LoadingDots,
  Container,
  Footer,
  Icon,
  Text,
  AddButton,
} from "../../components";
import {
  useGetApplicationsMutation,
  useGetLastAnswersMutation,
  useGetTeacherByIdMutation,
} from "../../service";
import { Tabs } from "../../components/Tabs";

const TeacherDetails: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const user = useSelector(selectCurrentUser);
  const { teacherId } = useParams<{ teacherId: string }>();
  const [getTeacherById, teacherRequest] = useGetTeacherByIdMutation();
  const [getApplications, { data, isLoading }] = useGetApplicationsMutation();
  const [getLastAnswers, answersRequest] = useGetLastAnswersMutation();
  const [currentTab, setCurrentTab] = useState(0);

  useEffect(() => {
    getLastAnswers(parseInt(teacherId || "", 10));
  }, [getLastAnswers, teacherId]);

  useEffect(() => {
    if (user.id && user.selectedSchool?.id && teacherId) {
      getTeacherById(parseInt(teacherId, 10));
      getApplications({
        coach_id: user.id,
        school_id: user.selectedSchool?.id,
        teacher_id: parseInt(teacherId, 10),
      });
    }
  }, [user, teacherId, getTeacherById, getApplications]);

  return (
    <Container width="100%" height="100%" mb="100px" flexDirection="column">
      <Container mb="8px" flexDirection="row" p="16px 0" mt="-16px">
        <Container onClick={() => navigate("/teachers")}>
          <Icon name="arrow-left" size={24} />
        </Container>
        <Container flex={1} justifyContent="center">
          <Text
            fontSize="16px"
            color="#191A1B"
            fontWeight={600}
            lineHeight="24px"
            value={t("TeacherDetails.title")}
          />
        </Container>
        <Container width="24px" />
      </Container>

      {isLoading || teacherRequest.isLoading ? (
        <LoadingDots />
      ) : (
        <>
          <TeacherInfo teacher={teacherRequest.data} />

          <Tabs
            onChange={setCurrentTab}
            currentTab={currentTab}
            data={[
              t("TeacherDetails.sessions"),
              t("TeacherDetails.competencies"),
            ]}
          />

          {currentTab === 0 && (
            <>
              <ApplicationsList
                applications={data}
                onClick={(applicationId) =>
                  navigate(`/application-details/${applicationId}`)
                }
              />

              <AddButton
                label={t("TeacherDetails.add-session")}
                onClick={() => navigate(`/questionnaire/${teacherId}`)}
              />
            </>
          )}
          {currentTab === 1 && <CompetenceList data={answersRequest.data} />}
        </>
      )}

      <Footer />
    </Container>
  );
};

export default TeacherDetails;
