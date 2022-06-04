import React from "react";
import { HeaderProps } from "./types";
import LogoSmall from "../../assets/images/logo-small.svg";
import { Image } from "../Image";
import { Container } from "../Container";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/auth";
import { useNavigate } from "react-router-dom";

export const Header: React.FC<HeaderProps> = (props) => {
  const user: any = useSelector(selectCurrentUser);
  const navigate = useNavigate();

  return (
    user && (
      <Container
        mb="24px"
        mt="-24px"
        height="94px"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Image height={32} src={LogoSmall} />
        <Container onClick={() => navigate("/choose-school")}>
          {user.selectedSchool?.image_url && (
            <Image
              height={40}
              width={40}
              src={user.selectedSchool?.image_url}
              border="1px solid #F0F3F5"
              borderRadius="50%"
            />
          )}
        </Container>
      </Container>
    )
  );
};
