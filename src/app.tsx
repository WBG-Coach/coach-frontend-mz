import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { Container, Footer, Image } from "./components";
import { selectCurrentUser } from "./store/auth";
import LogoSmall from "./assets/images/logo-small.svg";

const App = () => {
  const user = useSelector(selectCurrentUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.id && !user.selectedSchool) navigate("/choose-school");
  }, [user, navigate]);

  return (
    <Container p="24px" flexDirection="column">
      {user.selectedSchool ? (
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
      ) : (
        <Image height={32} src={LogoSmall} mb="40px" />
      )}
      <Outlet />
      {user.selectedSchool && <Footer />}
    </Container>
  );
};

export default App;
