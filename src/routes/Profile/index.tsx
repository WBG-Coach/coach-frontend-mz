import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Button, Container, Footer, Image, Text } from "../../components";
import { LanguageButton } from "../../components/LanguageButton";
import { logout, selectCurrentUser } from "../../store/auth";
import { User } from "../../store/type";

const Profile: React.FC<{}> = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const user: User = useSelector(selectCurrentUser);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <Container flex={1} flexDirection="column">
        <Container flexDirection="row">
          <Container
            mb="40px"
            width="100%"
            flexDirection="row"
            alignContent="center"
            justifyContent="center"
          >
            {user?.image_url ? (
              <Image
                mr="12px"
                width={40}
                height={40}
                borderRadius="50%"
                src={user?.image_url || ""}
              />
            ) : (
              <Container
                mr="12px"
                width="48px"
                height="48px"
                alignItems="center"
                borderRadius="24px"
                background="#F0F2F5"
                justifyContent="center"
              >
                <Text
                  fontSize={12}
                  value={user?.name
                    ?.substring(0, 1)
                    .concat(user?.last_name?.substring(0, 1) || "")}
                />
              </Container>
            )}
            <Container flex={1} flexDirection="column" justifyContent="center">
              <Text
                fontWeight={600}
                fontSize="18px"
                color="#00121A"
                value={user?.name}
              />
              <Text color="#2B363B" fontSize="14px" value={user.email} />
            </Container>
            <LanguageButton />
          </Container>
        </Container>
        <Button
          value={t("Profile.logout")}
          width="100%"
          onClick={handleLogout}
        />
      </Container>
      <Footer />
    </>
  );
};

export default Profile;
