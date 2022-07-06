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
      {teacher?.image_url ? (
        <Image
          width={40}
          height={40}
          borderRadius="50%"
          src={teacher?.image_url || ""}
        />
      ) : (
        <Container
          width="48px"
          height="48px"
          alignItems="center"
          borderRadius="24px"
          background="#F0F2F5"
          justifyContent="center"
        >
          <Text
            fontSize={16}
            value={teacher?.name
              ?.substring(0, 1)
              .concat(teacher?.last_name?.substring(0, 1) || "")}
          />
        </Container>
      )}
      <Container
        ml="12px"
        flex={1}
        flexDirection="column"
        justifyContent="center"
      >
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
