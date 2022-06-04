import React, { useEffect } from "react";
import { selectCurrentUser, selectSchool } from "../../store/auth";
import { LoadingDots } from "../../components/LoadingDots";
import LogoSmall from "../../assets/images/logo-small.svg";
import { Container, Image, Text } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { useGetSchoolsMutation } from "../../service";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { School } from "../../store/type";

const SchoolsList: React.FC<{}> = () => {
  const [getSchools, { data, isLoading }] = useGetSchoolsMutation();
  const user = useSelector(selectCurrentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    if (user.id) getSchools(user.id);
  }, [user, getSchools]);

  const chooseSchool = (school: School) => {
    dispatch(selectSchool(school));
    navigate("/teachers");
  };

  return (
    <Container width="100%" height="100%" mb="100px" flexDirection="column">
      <Container mb="32px" mt="-16px" justifyContent="center">
        <Image height={32} src={LogoSmall} p="16px" />
      </Container>

      <Text
        mb="8px"
        fontSize="24px"
        color="#191A1B"
        fontWeight={600}
        lineHeight="32px"
      >
        {t("Schools.title")}
      </Text>

      {isLoading ? (
        <LoadingDots />
      ) : (
        <Container flexWrap="wrap" justifyContent="center">
          {data && data?.length > 0 ? (
            data?.map((school, index) => (
              <Container
                p="16px 0"
                key={index}
                width="100%"
                onClick={() => chooseSchool(school)}
                borderTop={index === 0 ? "none" : "1px solid #F0F2F5"}
              >
                <Image
                  width={48}
                  height={48}
                  borderRadius="50%"
                  src={school.image_url}
                  border="1px solid #E3E5E8"
                />
                <Container
                  ml="8px"
                  flex={1}
                  flexDirection="column"
                  justifyContent="space-between"
                >
                  <Text
                    fontSize="16px"
                    fontWeight={600}
                    lineHeight="24px"
                    color="#000000"
                    value={school.name}
                  />
                  <Text
                    fontSize="14px"
                    fontWeight={400}
                    lineHeight="18px"
                    color="#494B50"
                    value={t("Schools.school_description", { value: 1 })}
                  />
                </Container>
              </Container>
            ))
          ) : (
            <Text value={t("Schools.empty")} />
          )}
        </Container>
      )}
    </Container>
  );
};

export default SchoolsList;
