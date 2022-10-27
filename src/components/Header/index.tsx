import "react-spring-bottom-sheet/dist/style.css";
import React, { useState } from "react";
import { selectCurrentUser } from "../../store/auth";
import { BottomSheet } from "react-spring-bottom-sheet";
import { useSelector } from "react-redux";
import { User } from "../../store/type";
import { Container } from "../Container";
import { HeaderProps } from "./types";
import { Image } from "../Image";
import { Icon } from "../Icon";
import { Text } from "../Text";
import { SchoolListComponent } from "../SchoolListComponent";

export const Header: React.FC<HeaderProps> = (props) => {
  const [open, setOpen] = useState(false);
  const user: User = useSelector(selectCurrentUser);

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
            {user.selectedSchool?.image_url ? (
              <Image
                height={32}
                width={32}
                src={user.selectedSchool?.image_url}
                border="1px solid #F0F3F5"
                borderRadius="50%"
              />
            ) : (
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
        </Container>
        <BottomSheet open={open} onDismiss={() => setOpen(false)}>
          <SchoolListComponent afterSelectSchool={() => setOpen(false)} />
        </BottomSheet>
      </>
    )
  );
};
