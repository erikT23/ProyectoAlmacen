import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createContext, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import { MenuHambur, Sidebar } from "./components/organisms/index";
import { AuthContextProvider, MyRoutes } from "./index";
import { Login } from "./pages/index";
import { Dark, Device, Light } from "./styles/index";

export const ThemeContext = createContext(null);

function App() {
  const value = useMemo(() => ({ theme, setTheme }), [theme, setTheme]);
  const [themeUse, setTheme] = useState("light");
  const theme = themeUse === "light" ? "light" : "dark";
  const themeStyle = theme === "light" ? Light : Dark;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { pathname } = useLocation();
  return (
    <ThemeContext.Provider value={value}>
      <ThemeProvider theme={themeStyle}>
        <AuthContextProvider>
          {pathname == "/login" ? (
            <Login />
          ) : (
            <Container className={sidebarOpen ? "active" : ""}>
              <section className="ContentSidebar">
                <Sidebar
                  state={sidebarOpen}
                  setState={setSidebarOpen}
                />
              </section>
              <section className="ContentMenuambur">
                <MenuHambur />
              </section>
              <section className="ContentRoutes">
                <MyRoutes />
              </section>
            </Container>
          )}
          <ReactQueryDevtools initialIsOpen={false} />
        </AuthContextProvider>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

const Container = styled.main`
  display: grid;
  grid-template-columns: 1fr;
  background-color: ${(props) => props.theme.bgtotal};
  .ContentSidebar {
    display: none;
  }
  .ContentMenuambur {
    display: block;
    position: absolute;
    left: 20px;
  }

  @media ${Device.tablet} {
    grid-template-columns: 65px 1fr;
    &.active {
      grid-template-columns: 220px 1fr;
    }
    .ContentSidebar {
      display: initial;
    }
    .ContentMenuambur {
      display: none;
    }
    .ContentRoutes {
      grid-column: 1;
      width: 100%;
      @media ${Device.tablet} {
        grid-column: 2;
        width: 100%;
      }
    }
  }
`;

export default App;
