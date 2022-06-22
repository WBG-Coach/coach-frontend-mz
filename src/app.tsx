import { useDispatch } from "react-redux";
import { loadLocalUser } from "./store/auth";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container } from "./components";
import { getLocalUser } from "./storage";

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) {
      const localUser = getLocalUser();
      if (localUser?.id) {
        dispatch(loadLocalUser(localUser));
        if (localUser.selectedSchool) {
          navigate("/teachers");
        } else {
          navigate("/choose-school");
        }
      }
      setLoaded(true);
    }
  }, [loaded, dispatch, navigate]);

  return (
    <Container p="16px" flexDirection="column">
      {loaded && <Outlet />}
    </Container>
  );
};

export default App;
