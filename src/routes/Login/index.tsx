import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Image } from "../../components";
import { useGetCoachesMutation, useLoginMutation } from "../../service";
import Logo from "../../assets/images/logo.svg";
import { LoadingDots } from "../../components/LoadingDots";

const Login: React.FC<{}> = () => {
  const [getCoaches, { data }] = useGetCoachesMutation();
  const [login, { isSuccess }] = useLoginMutation();
  const navigate = useNavigate();

  useEffect(() => {
    getCoaches();
  }, [getCoaches]);

  useEffect(() => {
    if (isSuccess) navigate("/choose-school");
  }, [isSuccess, navigate]);

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
      {data?.map((coach) => (
        <Button
          mb={2}
          width="100%"
          icon="world"
          key={coach.id}
          value={`Login ${coach.name}`}
          onClick={() => login(coach?.id || 0)}
        />
      )) || <LoadingDots />}
    </Container>
  );
};

export default Login;
