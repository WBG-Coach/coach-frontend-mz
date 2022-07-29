import { useDispatch, useSelector } from "react-redux";
import { loadLocalUser, selectCurrentUser } from "./store/auth";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
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
  const user = useSelector(selectCurrentUser);
  const [loaded, setLoaded] = useState(false);
  const { i18n } = useTranslation();
  const [currentTheme, setCurrentTheme] = useState(theme);
  const location = useLocation();

  useEffect(() => {
    if (!loaded) {
      const localUser = getLocalUser();
      const language = getLocalLanguage();
      i18n.changeLanguage(language);

      if (localUser?.id) {
        dispatch(loadLocalUser(localUser));
        if (!localUser.selectedSchool) {
          navigate("/select-school");
        } else if (
          location.pathname === "/" ||
          location.pathname.startsWith("/login")
        ) {
          navigate("/teachers");
        }
      }
      setLoaded(true);
    }
  }, [loaded, location, i18n, dispatch, navigate]);

  useEffect(() => {
    if (user.project?.id) {
      if (currentTheme.colors.primary !== user.project.primaryColor) {
        setCurrentTheme({
          ...currentTheme,
          colors: {
            ...currentTheme.colors,
            primary: user.project.primaryColor,
          },
        });
      }
    }
  }, [navigate, currentTheme, user]);

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
