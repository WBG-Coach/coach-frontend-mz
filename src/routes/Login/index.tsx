import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Container, Text } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { login, selectCurrentUser } from "../../store/auth";

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
        height={400}
        flexDirection="column"
        justifyContent="space-between"
        alignItems="center"
      >
        <Text fontSize={32} mt={24}>
          Login
        </Text>
        <Button width="100%" value="Login" onClick={() => dispatch(login())} />
      </Card>
    </Container>
  );
};

export default Login;
