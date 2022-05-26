import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Image } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { login, selectCurrentUser } from "../../store/auth";
import Logo from "../../assets/images/logo.svg";

const Login: React.FC<{}> = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);

  useEffect(() => {
    if (!!user) navigate("applications");
  }, [user, navigate]);

  return (
    <Container
      m="auto"
      width="350px"
      height="calc(100vh - 150px)"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Image src={Logo} mb="48px" height={"80px"} />
      <Button
        width="100%"
        icon="world"
        value="Login with SSO"
        onClick={() => dispatch(login())}
      />
    </Container>
  );
};

export default Login;
