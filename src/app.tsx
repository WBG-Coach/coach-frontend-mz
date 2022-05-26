import { ThemeProvider } from "styled-components";
import { Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import { theme } from "./theme";
import { store } from "./store";
import { Container } from "./components";

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Container p="24px">
          <Outlet />
        </Container>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
