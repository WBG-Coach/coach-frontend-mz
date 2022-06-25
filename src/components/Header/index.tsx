import "react-spring-bottom-sheet/dist/style.css";
import React, { useEffect, useState } from "react";
import { selectCurrentUser, selectSchool } from "../../store/auth";
import LogoSmall from "../../assets/images/logo-small.svg";
import { BottomSheet } from "react-spring-bottom-sheet";
import { useDispatch, useSelector } from "react-redux";
import { useGetSchoolsMutation } from "../../service";
import { School, User } from "../../store/type";
import { useTranslation } from "react-i18next";
import { LoadingDots } from "../LoadingDots";
import { Container } from "../Container";
import { ListItem } from "../ListItem";
import { HeaderProps } from "./types";
import { Image } from "../Image";
import { Icon } from "../Icon";
import { Text } from "../Text";
import { AddButton } from "../AddButton";

export const Header: React.FC<HeaderProps> = (props) => {
  const [open, setOpen] = useState(false);
  const user: User = useSelector(selectCurrentUser);
  const [getSchools, { data, isLoading }] = useGetSchoolsMutation();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (open && user?.id) {
      getSchools(user.id);
    }
  }, [user, open, getSchools]);

  const chooseSchool = (school: School) => {
    dispatch(selectSchool(school));
    setOpen(false);
  };

  return (
    user && (
      <>
        <Container
          mt="-24px"
          height="94px"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Container onClick={() => setOpen(true)} alignItems="center">
            {user.selectedSchool?.image_url && (
              <Image
                height={32}
                width={32}
                src={user.selectedSchool?.image_url}
                border="1px solid #F0F3F5"
                borderRadius="50%"
              />
            )}
            <Text
              ml="8px"
              fontSize="16px"
              fontWeight={600}
              color="#191A1B"
              lineHeight="24px"
              value={user.selectedSchool?.name}
            />
            <Icon ml="4px" name="chevron-bottom" size={24} />
          </Container>
          <Image height={24} src={LogoSmall} />
        </Container>
        <BottomSheet open={open} onDismiss={() => setOpen(false)}>
          <Container flexDirection="column" p="16px">
            <Text
              mb="8px"
              fontSize="20px"
              color="#191A1B"
              fontWeight={600}
              lineHeight="32px"
              value={t("Schools.schools")}
            />

            {isLoading ? (
              <LoadingDots />
            ) : (
              data?.map((school, index) => (
                <ListItem
                  key={index}
                  title={school.name}
                  imageUrl={school.image_url}
                  onClick={() => chooseSchool(school)}
                  description={t("Schools.school_description", { value: 1 })}
                  rigthContent={
                    <>
                      {user.selectedSchool?.id === school.id && (
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
                      )}
                    </>
                  }
                />
              ))
            )}
            <AddButton onClick={() => {}} label={t("Schools.new-school")} />
          </Container>
        </BottomSheet>
      </>
    )
  );
};
