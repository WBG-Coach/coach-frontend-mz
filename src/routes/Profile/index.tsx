import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Container, Footer, Icon, Image, Text } from "../../components";
import { ConfirmModal } from "../../components/ConfirmModal";
import { LanguageButton } from "../../components/LanguageButton";
import { PROJECT } from "../../mock";
import { logout, selectCurrentUser } from "../../store/auth";
import { User } from "../../store/type";

const emailTo = "example@example.com";
const emailCC = "cc@example.com";
const emailSub = "Help - Coachdigital";
const emailBody = "body";

const Profile: React.FC<{}> = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const user: User = useSelector(selectCurrentUser);
  const navigate = useNavigate();
  const [showExitModal, setShowExitModal] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
  };

  const renderOption = (
    icon: string,
    title: string,
    onClick: () => void,
    border = true
  ) => (
    <Container
      p="16px"
      onClick={onClick}
      alignItems="center"
      flexDirection="row"
      borderBottom={border ? "1px solid #F4F5F5" : ""}
    >
      <Icon name={icon} mr="16px" size={24} color="#7D827F" />
      <Text value={title} fontSize={16} />
      <Icon ml="auto" name="chevron-right" size={24} color="#CCCCCC" />
    </Container>
  );

  const openHelpEmail = () => {
    window.open(
      `mailto:${emailTo}?cc=${emailCC}&subject=${emailSub}&body=${emailBody}`,
      "_self"
    );
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
            justifyContent="space-between"
          >
            <Image src={PROJECT.image_url} height="24px" />
            <LanguageButton />
          </Container>
        </Container>

        {user?.image_url ? (
          <Image
            mb="12px"
            width={64}
            height={64}
            borderRadius="50%"
            src={user?.image_url || ""}
          />
        ) : (
          <Container
            mb="12px"
            width="64px"
            height="64px"
            alignItems="center"
            borderRadius="50%"
            background="#F0F2F5"
            justifyContent="center"
          >
            <Text
              fontSize={20}
              value={user?.name
                ?.substring(0, 1)
                .concat(user?.last_name?.substring(0, 1) || "")}
            />
          </Container>
        )}
        <Text
          mb="4px"
          fontWeight={600}
          fontSize="24px"
          color="#00121A"
          value={user?.name}
        />
        <Text mb="32px" color="#7D827F" fontSize="14px" value={user.email} />

        {renderOption("user-circle", t("Profile.edit-profile"), () =>
          navigate("/profile-form")
        )}
        {renderOption("lock", t("Profile.update-password"), () =>
          navigate("/update-password")
        )}
        {renderOption("question-circle", t("Profile.help"), openHelpEmail)}
        {renderOption(
          "signout",
          t("Profile.logout"),
          () => setShowExitModal(true),
          false
        )}

        <Text
          mt="16px"
          fontSize="12px"
          color="#7D827F"
          value={t("Profile.version", { value: "1.0" })}
        />
      </Container>
      <Footer />
      <ConfirmModal isOpen={showExitModal} title={t("Profile.confirm-exit")}>
        <Button mb="12px" value={t("Profile.logout")} onClick={handleLogout} />
        <Button
          variant="secondary"
          value={t("Profile.cancel-exit")}
          onClick={() => setShowExitModal(false)}
        />
      </ConfirmModal>
    </>
  );
};

export default Profile;
