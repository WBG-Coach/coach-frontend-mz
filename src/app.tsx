import { useDispatch } from "react-redux";
import { loadLocalUser } from "./store/auth";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container } from "./components";
import { getLocalLanguage, getLocalUser } from "./storage";
import { useTranslation } from "react-i18next";

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);
  const { i18n } = useTranslation();

  useEffect(() => {
    if (!loaded) {
      const localUser = getLocalUser();
      const language = getLocalLanguage();
      i18n.changeLanguage(language);

      if (localUser?.id) {
        dispatch(loadLocalUser(localUser));
        if (localUser.selectedSchool) {
          navigate("/teachers");
        } else {
          navigate("/select-school");
        }
      }
      setLoaded(true);
    }
  }, [loaded, i18n, dispatch, navigate]);

  return (
    <Container
      m="auto"
      p="16px"
      maxWidth="600px"
      flexDirection="column"
      width="cacl(100% - 32px)"
    >
      {loaded && <Outlet />}
    </Container>
  );
};

export default App;
