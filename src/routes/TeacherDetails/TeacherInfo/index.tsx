import React from "react";
import { useTranslation } from "react-i18next";
import { Container, Image, Text } from "../../../components";
import { User } from "../../../store/type";

type Props = {
  teacher?: User;
};

export const TeacherInfo: React.FC<Props> = ({ teacher }) => {
  const { t } = useTranslation();

  return (
    <Container
      mt="24px"
      mb="34px"
      width="100%"
      flexDirection="row"
      alignContent="center"
      justifyContent="center"
    >
      <Image
        mr="12px"
        width={40}
        height={40}
        borderRadius="50%"
        src={teacher?.image_url || ""}
      />
      <Container flex={1} flexDirection="column" justifyContent="space-between">
        <Text
          fontWeight={600}
          fontSize="18px"
          color="#00121A"
          value={teacher?.name}
        />
        <Text color="#2B363B" fontSize="14px">
          {t("TeacherDetails.subject", { subject: teacher?.subject })}
        </Text>
      </Container>
    </Container>
  );
};
