import { ThemeProvider } from "styled-components";
import { Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import { theme } from "./theme";
import { store } from "./store";
import { Header } from "./components/Header";
import { Container } from "./components";

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Header />
        <Container p="24px" pt="124px">
          <Outlet />
        </Container>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
