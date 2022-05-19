import React from "react";
import { StyledHeader } from "./styles";
import { HeaderProps } from "./types";
import Logo from "../../assets/images/world-bank.png";
import { Image } from "../Image";
import { Container } from "../Container";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/auth";
import { Text } from "../Text";

export const Header: React.FC<HeaderProps> = (props) => {
  const user: any = useSelector(selectCurrentUser);

  return (
    user && (
      <StyledHeader {...props}>
        <Container justifyContent="space-between" alignItems="center" flex={1}>
          <Image src={Logo} height={"100px"} />
          {user?.name && <Text fontSize={18} value={"🤖 " + user.name} />}
        </Container>
      </StyledHeader>
    )
  );
};
