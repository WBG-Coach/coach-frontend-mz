import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Container, Icon, Image, Text } from "../../../components";
import { User } from "../../../store/type";

type Props = {
  teacher?: User;
};

export const TeacherInfo: React.FC<Props> = ({ teacher }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Container
      pb="16px"
      mb="16px"
      width="100%"
      flexDirection="column"
      borderBottom="1px solid #F4F5F5"
    >
      {teacher?.image_url ? (
        <Image
          width={48}
          height={48}
          borderRadius="50%"
          src={teacher.image_url}
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
      <Container alignItems="center">
        <Container flexDirection="column" flex={1}>
          <Text
            mt="12px"
            fontSize="20px"
            color="#00121A"
            fontWeight={600}
            lineHeight="24px"
            value={teacher?.name}
          />
          <Text mt="4px" color="#2B363B" fontSize="14px" lineHeight="20px">
            {t("TeacherDetails.subject", { subject: teacher?.subject })}
          </Text>
        </Container>
        <Container
          p="8px"
          borderRadius="8px"
          border="1px solid #E6E6E6"
          onClick={() => navigate(`/teacher-form/${teacher?.id}`)}
        >
          <Icon name="pen-solid" size={24} color="#4D4D4D" />
        </Container>
      </Container>
    </Container>
  );
};
