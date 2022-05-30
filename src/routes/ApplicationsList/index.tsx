import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Icon, Image, Text } from "../../components";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/auth";
import {
  useGetApplicationsMutation,
  useGetTeacherByIdMutation,
} from "../../service";
import { LoadingDots } from "../../components/LoadingDots";

const ApplicationList: React.FC<{}> = () => {
  const user = useSelector(selectCurrentUser);
  const [getTeacherById, teacherRequest] = useGetTeacherByIdMutation();
  const [getApplications, { data, isLoading }] = useGetApplicationsMutation();
  const { teacherId } = useParams<{ teacherId: string }>();
  const navigate = useNavigate();

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
      {teacherRequest.isLoading ? (
        <LoadingDots />
      ) : (
        teacherRequest.data && (
          <Container
            mb="40px"
            width="100%"
            height="56px"
            alignContent="center"
            justifyContent="center"
            flexDirection="row"
          >
            <Image
              mr="12px"
              width={56}
              height={56}
              borderRadius="50%"
              src={teacherRequest.data?.image_url || ""}
            />
            <Container flex={1} flexDirection="column" justifyContent="center">
              <Text
                mb="8px"
                lineHeight="24px"
                fontWeight={600}
                color="#00121A"
                fontSize="20px"
              >
                {teacherRequest.data.name}
              </Text>
              <Text lineHeight="20px" color="#2B363B" fontSize="14px">
                Professor de Português
              </Text>
            </Container>
          </Container>
        )
      )}

      <Text mt={24} mb="8px" fontSize="20px" lineHeight="24px" fontWeight={600}>
        Sessions
      </Text>

      {isLoading ? (
        <LoadingDots />
      ) : (
        <Container flexWrap="wrap">
          {data && data?.length > 0 ? (
            data.map((application, index) => (
              <Container
                key={index}
                width="100%"
                height="88px"
                alignItems="center"
                justifyContent="center"
                flexDirection="row"
                borderTop={index !== 0 ? "1px solid #F0F3F5" : ""}
                onClick={() =>
                  navigate(
                    `/questionnaire/${application.id}/${application.questionnaire_id}`
                  )
                }
              >
                <Icon size={24} name="notes" mr="12px" />

                <Container
                  flex={1}
                  flexDirection="column"
                  justifyContent="center"
                >
                  <Text
                    lineHeight="24px"
                    fontWeight={600}
                    color="#00121A"
                    fontSize={16}
                  >
                    {application.questionnaire.title}
                  </Text>
                  <Text lineHeight="16px" color="#455054" fontSize={12}>
                    {format(new Date(application.created_at), "yyyy/MM/dd")}
                  </Text>
                </Container>
                <Icon size={24} name="chevron-right" />
              </Container>
            ))
          ) : (
            <Text value="Without applications" />
          )}
        </Container>
      )}
    </Container>
  );
};

export default ApplicationList;
