import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetSchoolsMutation } from "../../service";
import { selectCurrentUser, selectSchool } from "../../store/auth";
import { School, User } from "../../store/type";
import { AddButton } from "../AddButton";
import { Container } from "../Container";
import { Icon } from "../Icon";
import { ListItem } from "../ListItem";
import { LoadingDots } from "../LoadingDots";
import { Text } from "../Text";

export const SchoolListComponent: React.FC<{
  afterSelectSchool?: () => void;
}> = ({ afterSelectSchool }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isToUpdate, setIsToUpdate] = useState(false);
  const [getSchools, { data, isLoading }] = useGetSchoolsMutation();
  const user: User = useSelector(selectCurrentUser);

  useEffect(() => {
    if (user?.id) {
      getSchools(user.id);
    }
  }, [user, getSchools]);

  const chooseSchool = (school: School) => {
    if (isToUpdate) {
      navigate(`/school-form/${school.id}`);
    } else {
      dispatch(selectSchool(school));
      if (afterSelectSchool) afterSelectSchool();
    }
  };

  return (
    <Container flexDirection="column" p="16px">
      <Container justifyContent="space-between">
        <Text
          mb="8px"
          fontSize="20px"
          color="#191A1B"
          fontWeight={600}
          lineHeight="32px"
          value={t("Schools.schools")}
        />
        {isToUpdate && (
          <Container onClick={() => setIsToUpdate(false)}>
            <Text
              value={t("Schools.complete")}
              fontSize="16px"
              color="#0F8A43"
            />
          </Container>
        )}
        {!isToUpdate && (
          <Container onClick={() => setIsToUpdate(true)}>
            <Text value={t("Schools.update")} fontSize="16px" color="#0F8A43" />
          </Container>
        )}
      </Container>

      {isLoading ? (
        <LoadingDots />
      ) : (
        data?.map((school, index) => (
          <ListItem
            key={index}
            title={school.name}
            imageUrl={school.image_url}
            onClick={() => chooseSchool(school)}
            description={
              !school.users_count || school.users_count === 1
                ? t("Schools.schoolDescription_zero")
                : school.users_count > 2
                ? t("Schools.schoolDescription_other", {
                    count: school.users_count,
                  })
                : t("Schools.schoolDescription_one", {
                    count: 1,
                  })
            }
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
            rightContent={
              <>
                {isToUpdate ? (
                  <Icon name="pen-solid" size={24} color="#999999" />
                ) : (
                  user.selectedSchool?.id === school.id && (
                    <Container
                      width="24px"
                      height="24px"
                      alignItems="center"
                      borderRadius="12px"
                      background="#3373CC"
                      justifyContent="center"
                    >
                      <Icon name="check" size={18} color="#fff" />
                    </Container>
                  )
                )}
              </>
            }
          />
        ))
      )}
      <AddButton
        onClick={() => navigate("/school-form")}
        label={t("Schools.new-school")}
      />
    </Container>
  );
};
