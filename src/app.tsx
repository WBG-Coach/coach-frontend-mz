import { useDispatch, useSelector } from "react-redux";
import { loadLocalUser } from "./store/auth";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container } from "./components";
import { getLocalLanguage, getLocalUser } from "./storage";
import { useTranslation } from "react-i18next";
import { selectGuide } from "./store/guide";
import GuideContent from "./components/GuideContent";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme";

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const guide = useSelector(selectGuide);
  const [loaded, setLoaded] = useState(false);
  const { i18n } = useTranslation();
  const [currentTheme] = useState(theme);

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
    <ThemeProvider theme={currentTheme}>
      <Container
        m="auto"
        p="16px"
        maxWidth="600px"
        flexDirection="column"
        width="cacl(100% - 32px)"
      >
        {loaded && <Outlet />}
        {guide.id && (
          <Container
            px="16px"
            position="fixed"
            top={0}
            left={0}
            bottom={0}
            right={0}
            background="#fff"
            overflowY="scroll"
          >
            <GuideContent id={guide.id} />
          </Container>
        )}
      </Container>
    </ThemeProvider>
  );
};

export default App;
