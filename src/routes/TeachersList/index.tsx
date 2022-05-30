import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Footer, Icon, Image, Text } from "../../components";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/auth";
import { useGetTeachersMutation } from "../../service";
import { LoadingDots } from "../../components/LoadingDots";

const TeachersList: React.FC<{}> = () => {
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);
  const [getTeachers, { data, isLoading }] = useGetTeachersMutation();

  useEffect(() => {
    if (user.id && user.selectedSchool?.id)
      getTeachers({ coach_id: user.id, school_id: user.selectedSchool?.id });
  }, [user, getTeachers]);

  return (
    <Container width="100%" height="100%" mb="100px" flexDirection="column">
      {user.selectedSchool && (
        <Text fontSize={24} fontWeight={600} color="#00121A">
          {user.selectedSchool.name}
        </Text>
      )}

      <Text
        mb="4px"
        mt="32px"
        fontSize={20}
        lineHeight="24px"
        fontWeight={600}
        value="Teachers"
        color="#00121A"
      />
      <Text
        fontSize={14}
        fontWeight={400}
        color="#2B363B"
        lineHeight="20px"
        value="These are the teachers allocated to you."
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
                alignContent="center"
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
                    lineHeight="24px"
                    fontWeight={600}
                    color="#00121A"
                    fontSize={16}
                  >
                    {teacher.name}
                  </Text>
                  <Text lineHeight="16px" color="#455054" fontSize={12}>
                    {teacher.subject} teacher
                  </Text>
                </Container>
                <Icon size={24} name="chevron-right" />
              </Container>
            ))
          ) : (
            <Text value="Without Teachers" />
          )}
        </Container>
      )}
    </Container>
  );
};

export default TeachersList;
