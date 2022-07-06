import React, { useEffect } from "react";
import { selectCurrentUser, selectSchool } from "../../store/auth";
import { LoadingDots } from "../../components/LoadingDots";
import LogoSmall from "../../assets/images/logo-small.svg";
import { useDispatch, useSelector } from "react-redux";
import { useGetSchoolsMutation } from "../../service";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { School } from "../../store/type";
import EmptyStateImage from "../../assets/images/empty-state.svg";
import {
  Text,
  Icon,
  Image,
  ListItem,
  AddButton,
  Container,
  Button,
} from "../../components";

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
    <Container width="100%" height="calc(100vh - 32px)" flexDirection="column">
      <Container mb="32px" justifyContent="center">
        <Image height={32} src={LogoSmall} p="16px" />
      </Container>

      {isLoading ? (
        <LoadingDots />
      ) : data && data?.length > 0 ? (
        <Container flexDirection="column">
          <Text
            mb="8px"
            fontSize="24px"
            color="#191A1B"
            fontWeight={600}
            lineHeight="32px"
            value={t("Schools.title")}
          />

          {data?.map((school, index) => (
            <ListItem
              key={index}
              leftContent={
                !school.image_url && (
                  <Container
                    width={48}
                    height={48}
                    borderRadius={24}
                    alignItems="center"
                    background="#F0F2F5"
                    justifyContent="center"
                  >
                    <Icon name="university" size={24} />
                  </Container>
                )
              }
              title={school.name}
              imageUrl={school.image_url}
              onClick={() => chooseSchool(school)}
              description={t("Schools.school_description", { value: 1 })}
            />
          ))}
          <AddButton
            onClick={() => {
              navigate("/school-form");
            }}
            label={t("Schools.new-school")}
          />
        </Container>
      ) : (
        <Container
          width="100%"
          height="100%"
          position="relative"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          m="auto"
        >
          <Image mb="32px" src={EmptyStateImage} width="240px" />
          <Text
            mb="8px"
            fontWeight={600}
            fontSize={20}
            value={t("Schools.empty-title")}
          />
          <Text
            fontSize={14}
            color="#494B50"
            value={t("Schools.empty-description")}
          />
          <Container position="absolute" bottom={0} left={0} right={0}>
            <Button
              width="100%"
              value={t("Schools.new-school")}
              onClick={() => navigate("/school-form")}
            />
          </Container>
        </Container>
      )}
    </Container>
  );
};

export default SchoolsList;
