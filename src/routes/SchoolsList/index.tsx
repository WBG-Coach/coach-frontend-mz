import React, { useEffect } from "react";
import { Container, Image, Text } from "../../components";
import LogoSmall from "../../assets/images/logo-small.svg";
import useDeviceDetection from "../../hooks/IsMobile";
import { useGetSchoolsMutation } from "../../service";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser, selectSchool } from "../../store/auth";
import { LoadingDots } from "../../components/LoadingDots";
import { School } from "../../store/type";
import { useNavigate } from "react-router-dom";

const SchoolsList: React.FC<{}> = () => {
  const [getSchools, { data, isLoading }] = useGetSchoolsMutation();
  const user = useSelector(selectCurrentUser);
  const { isMobile } = useDeviceDetection();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.id) getSchools(user.id);
  }, [user, getSchools]);

  const chooseSchool = (school: School) => {
    dispatch(selectSchool(school));
    navigate("/teachers");
  };

  return (
    <Container width="100%" height="100%" mb="100px" flexDirection="column">
      <Text fontSize={32} fontWeight={600} textAlign="center" mb="32px">
        Choose a school
      </Text>
      {isLoading ? (
        <LoadingDots />
      ) : (
        <Container flexWrap="wrap" justifyContent="center">
          {data && data?.length > 0 ? (
            data?.map((school, index) => (
              <Container
                m="8px"
                mt="16px"
                key={index}
                alignItems="center"
                alignContent="center"
                flexDirection="column"
                onClick={() => chooseSchool(school)}
                width={isMobile ? "calc(50% - 16px)" : 200}
              >
                <Image
                  src={school.image_url}
                  width={80}
                  height={80}
                  border="1px solid #F0F3F5"
                  borderRadius="50%"
                />
                <Text mt="16px" mb="24px" fontSize={14} value={school.name} />
              </Container>
            ))
          ) : (
            <Text value="Without schools" />
          )}
        </Container>
      )}
    </Container>
  );
};

export default SchoolsList;
