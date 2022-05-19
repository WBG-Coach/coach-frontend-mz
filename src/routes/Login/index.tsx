import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Container, Image } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { login, selectCurrentUser } from "../../store/auth";
import Logo from "../../assets/images/world-bank.png";

const Login: React.FC<{}> = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);

  useEffect(() => {
    if (!!user) navigate("home");
  }, [user, navigate]);

  return (
    <Container
      width="100%"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Card
        width="100%"
        height={400}
        maxWidth="400px"
        flexDirection="column"
        justifyContent="space-between"
        alignItems="center"
      >
        <Image src={Logo} height={"100px"} />
        <Button width="100%" value="Login" onClick={() => dispatch(login())} />
      </Card>
    </Container>
  );
};

export default Login;
