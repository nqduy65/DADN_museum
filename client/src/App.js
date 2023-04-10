import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { Fragment } from "react";
import { publicRoutes, privateRoutes } from "./routes";
import { SnackbarProvider } from "notistack";
import { styled } from "@mui/material";
import { Provider } from "react-redux";
import store from "../src/redux/store";
// import { UserState } from "./Context/UserProvider";
const StyledSnackbarProvider = styled(SnackbarProvider)`
  &.SnackbarItem-contentRoot {
    font-size: 16px;
    padding: 10px;
    font-family: "Roboto", sans-serif;
  }
`;
function App() {
  return (
    <Provider store={store}>
      <StyledSnackbarProvider
        maxSnack={3}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Router>
          <Routes>
            {publicRoutes.map((route, idx) => {
              let Layout = route.layout;
              const Page = route.component;
              if (!Layout) Layout = Fragment;
              return (
                <Route
                  key={idx}
                  exact
                  path={route.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              );
            })}

            {privateRoutes.map((route, idx) => {
              let Layout = route.layout;
              const Page = route.component;
              if (!Layout) Layout = Fragment;
              if (JSON.parse(localStorage.getItem("userInfo")) != null) {
                return (
                  <Route
                    exact
                    key={idx}
                    path={route.path}
                    element={
                      <Layout>
                        <Page />
                      </Layout>
                    }
                  />
                );
              } else
                return (
                  <Route
                    exact
                    key={idx + publicRoutes.length}
                    path={route.path}
                    element={<Navigate replace to="/login" />}
                  />
                );
            })}
          </Routes>
        </Router>
      </StyledSnackbarProvider>
    </Provider>
  );
}

export default App;
