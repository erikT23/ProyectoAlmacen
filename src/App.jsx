import { createContext } from "react";
import styled, { ThemeProvider } from "styled-components";
import { AuthContextProvider, Dark, Light, MyRoutes } from "./index";
export const ThemeContext = createContext(null);
function App() {
  const [themeUse, setTheme] = useState("light");
  const theme = themeUse === "light" ? "light" : "dark";
  const themeStyle = theme === "light" ? Light : Dark;
  return (
    <>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <ThemeProvider theme={themeStyle}></ThemeProvider>
      </ThemeContext.Provider>
      <AuthContextProvider>
        <MyRoutes />
      </AuthContextProvider>
    </>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  background-color: ${(props) => props.theme.bgtotal};
`;

export default App;
