import React, { useEffect } from "react";
import { selectCurrentUser } from "../../store/auth";
import { LoadingDots } from "../../components/LoadingDots";
import { useSelector } from "react-redux";
import { useGetSchoolsMutation } from "../../service";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import EmptyStateImage from "../../assets/images/empty-state.svg";
import { Text, Image, Container, Button } from "../../components";
import { PROJECT } from "../../mock";
import { SchoolListComponent } from "../../components/SchoolListComponent";

const SchoolsList: React.FC<{}> = () => {
  const [getSchools, { data, isLoading }] = useGetSchoolsMutation();
  const user = useSelector(selectCurrentUser);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    if (user.id) getSchools(user.id);
  }, [user, getSchools]);

  const onSelect = () => {
    navigate("/teachers");
  };

  return (
    <Container width="100%" height="calc(100vh - 32px)" flexDirection="column">
      <Container mb="32px" justifyContent="center">
        <Image height={32} src={PROJECT.image_url} p="16px" />
      </Container>

      {isLoading ? (
        <LoadingDots />
      ) : data && data?.length > 0 ? (
        <SchoolListComponent afterSelectSchool={onSelect} />
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
              variant="primary"
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
